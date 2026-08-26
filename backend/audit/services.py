import json
from datetime import date, datetime, time
from decimal import Decimal
from uuid import UUID

from django.db.models import Model

from .models import AuditLog


def _get_client_ip(request):
    if request is None:
        return None

    meta = getattr(request, "META", {})
    forwarded_for = meta.get("HTTP_X_FORWARDED_FOR")
    if forwarded_for:
        client_ip = forwarded_for.split(",", 1)[0].strip()
        if client_ip:
            return client_ip

    return meta.get("REMOTE_ADDR") or None


def _get_resource_name(resource):
    for attribute in ("title", "name", "email"):
        value = getattr(resource, attribute, None)
        if value:
            return str(value)

    return str(resource)


def log_audit_event(
    *,
    user=None,
    action,
    resource,
    old_values=None,
    new_values=None,
    request=None,
):
    resource_id = "" if resource.pk is None else str(resource.pk)

    return AuditLog.objects.create(
        user=user,
        action=action,
        resource_type=resource.__class__.__name__,
        resource_id=resource_id,
        resource_name=_get_resource_name(resource),
        old_values=old_values,
        new_values=new_values,
        ip_address=_get_client_ip(request),
    )


def model_to_audit_dict(instance, fields):
    result = {}

    for field_name in fields:
        value = getattr(instance, field_name)

        if isinstance(value, Model):
            value = value.pk

        if isinstance(value, (datetime, date, time)):
            value = value.isoformat()
        elif isinstance(value, (Decimal, UUID)):
            value = str(value)
        else:
            try:
                json.dumps(value)
            except (TypeError, ValueError):
                value = str(value)

        result[field_name] = value

    return result
