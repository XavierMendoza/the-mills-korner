from django.core.exceptions import ValidationError
from PIL import Image, UnidentifiedImageError


MAX_IMAGE_UPLOAD_SIZE = 5 * 1024 * 1024
ALLOWED_IMAGE_FORMATS = {"JPEG", "PNG", "WEBP"}


def validate_image_upload(value):
    try:
        if value.size > MAX_IMAGE_UPLOAD_SIZE:
            raise ValidationError("Image file must be 5 MB or smaller.")

        try:
            with Image.open(value) as image:
                image_format = image.format
                if image_format not in ALLOWED_IMAGE_FORMATS:
                    raise ValidationError(
                        "Unsupported image format. Use JPEG, PNG, or WEBP."
                    )
                image.verify()
        except (UnidentifiedImageError, OSError, SyntaxError, ValueError):
            raise ValidationError("Uploaded file is not a valid image.") from None
    finally:
        try:
            value.seek(0)
        except (AttributeError, OSError):
            pass
