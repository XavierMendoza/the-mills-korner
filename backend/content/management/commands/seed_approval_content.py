from django.core.management.base import BaseCommand
from django.db import transaction

from content.models import OpportunityArea
from impact.models import ImpactMetric


OPPORTUNITY_AREAS = (
    {
        "title": "Academic Success",
        "slug": "academic-success",
        "short_description": "Helping students graduate prepared.",
        "description": (
            "Academic success begins with helping students see a clear path toward "
            "graduation. TMK supports young people as they prepare for what comes next "
            "with confidence and purpose."
        ),
        "display_order": 1,
        "is_published": True,
    },
    {
        "title": "Financial Capability",
        "slug": "financial-capability",
        "short_description": "Preparing young people before money arrives.",
        "description": (
            "Financial capability starts with practical understanding before greater "
            "financial responsibility arrives. Young people can build the judgment and "
            "confidence to make informed decisions as their responsibilities grow."
        ),
        "display_order": 2,
        "is_published": True,
    },
    {
        "title": "Leadership Development",
        "slug": "leadership-development",
        "short_description": "Building confidence, responsibility, and character.",
        "description": (
            "Leadership development strengthens confidence, responsibility, character, "
            "and teamwork. Athletics can be one setting where young people practice "
            "those qualities, serving as a pathway for leadership growth rather than "
            "the destination itself."
        ),
        "display_order": 3,
        "is_published": True,
    },
    {
        "title": "Wellness",
        "slug": "wellness",
        "short_description": "Supporting emotional resilience.",
        "description": (
            "Wellness includes building emotional resilience and supporting young "
            "people's well-being. Having encouragement while navigating challenges can "
            "help them keep moving forward."
        ),
        "display_order": 4,
        "is_published": True,
    },
    {
        "title": "Mentorship",
        "slug": "mentorship",
        "short_description": "Connecting every young person with trusted adults.",
        "description": (
            "Mentorship is grounded in consistent relationships with trusted adults. "
            "Guidance and encouragement can help young people recognize possibilities "
            "and navigate the choices ahead."
        ),
        "display_order": 5,
        "is_published": True,
    },
)


IMPACT_METRICS = (
    {
        "name": "Youth Served",
        "value": 15_000,
        "prefix": "",
        "suffix": "+",
        "description": "Since 2017",
        "display_order": 1,
        "is_featured": True,
        "is_published": True,
    },
    {
        "name": "Families Supported",
        "value": 1_020,
        "prefix": "",
        "suffix": "+",
        "description": "Since 2017",
        "display_order": 2,
        "is_featured": True,
        "is_published": True,
    },
    {
        "name": "Volunteer Engagements",
        "value": 4_200,
        "prefix": "",
        "suffix": "+",
        "description": "Since 2017",
        "display_order": 3,
        "is_featured": True,
        "is_published": True,
    },
    {
        "name": "Staff & Program Leaders Supervised",
        "value": 275,
        "prefix": "",
        "suffix": "+",
        "description": "Since 2017",
        "display_order": 4,
        "is_featured": True,
        "is_published": True,
    },
    {
        "name": "Community Partnerships",
        "value": 20,
        "prefix": "",
        "suffix": "+",
        "description": "Since 2017",
        "display_order": 5,
        "is_featured": True,
        "is_published": True,
    },
    {
        "name": "Participants Improved Academically",
        "value": 86,
        "prefix": "",
        "suffix": "%",
        "description": "Client-supplied impact figure",
        "display_order": 6,
        "is_featured": True,
        "is_published": True,
    },
)


class Command(BaseCommand):
    help = "Seed the client approval-build opportunity areas and impact metrics."

    @transaction.atomic
    def handle(self, *args, **options):
        opportunity_created = 0
        opportunity_updated = 0
        metric_created = 0
        metric_updated = 0

        for item in OPPORTUNITY_AREAS:
            defaults = {key: value for key, value in item.items() if key != "slug"}
            _, created = OpportunityArea.objects.update_or_create(
                slug=item["slug"],
                defaults=defaults,
            )
            opportunity_created += created
            opportunity_updated += not created

        for item in IMPACT_METRICS:
            defaults = {key: value for key, value in item.items() if key != "name"}
            _, created = ImpactMetric.objects.update_or_create(
                name=item["name"],
                defaults=defaults,
            )
            metric_created += created
            metric_updated += not created

        self.stdout.write(
            self.style.SUCCESS(
                "Approval content seeded: "
                f"OpportunityArea created={opportunity_created}, updated={opportunity_updated}; "
                f"ImpactMetric created={metric_created}, updated={metric_updated}."
            )
        )
