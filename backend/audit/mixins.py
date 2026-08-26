from django.core.exceptions import FieldDoesNotExist
from django.db import transaction

from .models import AuditLog
from .services import log_audit_event, model_to_audit_dict


class AuditModelViewSetMixin:
    audit_fields = ()

    def get_audit_fields(self):
        return tuple(self.audit_fields or ())

    @staticmethod
    def _model_has_field(model, field_name):
        try:
            model._meta.get_field(field_name)
        except FieldDoesNotExist:
            return False
        return True

    def perform_create(self, serializer):
        model = serializer.Meta.model
        save_kwargs = {}

        if self._model_has_field(model, "created_by"):
            save_kwargs["created_by"] = self.request.user
        if self._model_has_field(model, "updated_by"):
            save_kwargs["updated_by"] = self.request.user

        with transaction.atomic():
            instance = serializer.save(**save_kwargs)
            new_values = model_to_audit_dict(instance, self.get_audit_fields())
            log_audit_event(
                user=self.request.user,
                action=AuditLog.Action.CREATE,
                resource=instance,
                old_values=None,
                new_values=new_values,
                request=self.request,
            )

    def perform_update(self, serializer):
        audit_fields = self.get_audit_fields()

        with transaction.atomic():
            old_values = model_to_audit_dict(serializer.instance, audit_fields)
            save_kwargs = {}
            if self._model_has_field(serializer.instance.__class__, "updated_by"):
                save_kwargs["updated_by"] = self.request.user

            instance = serializer.save(**save_kwargs)
            new_values = model_to_audit_dict(instance, audit_fields)
            log_audit_event(
                user=self.request.user,
                action=AuditLog.Action.UPDATE,
                resource=instance,
                old_values=old_values,
                new_values=new_values,
                request=self.request,
            )

    def perform_destroy(self, instance):
        with transaction.atomic():
            old_values = model_to_audit_dict(instance, self.get_audit_fields())
            log_audit_event(
                user=self.request.user,
                action=AuditLog.Action.DELETE,
                resource=instance,
                old_values=old_values,
                new_values=None,
                request=self.request,
            )
            instance.delete()
