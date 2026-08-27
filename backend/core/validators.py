import warnings

from django.core.exceptions import ValidationError
from PIL import Image, UnidentifiedImageError


MAX_IMAGE_UPLOAD_SIZE = 5 * 1024 * 1024
MAX_IMAGE_PIXELS = 25_000_000
ALLOWED_IMAGE_FORMATS = {"JPEG", "PNG", "WEBP"}


def validate_image_upload(value):
    try:
        if value.size > MAX_IMAGE_UPLOAD_SIZE:
            raise ValidationError("Image file must be 5 MB or smaller.")

        try:
            with warnings.catch_warnings():
                warnings.simplefilter("error", Image.DecompressionBombWarning)
                with Image.open(value) as image:
                    if image.width * image.height > MAX_IMAGE_PIXELS:
                        raise ValidationError("Image dimensions are too large.")

                    image_format = image.format
                    if image_format not in ALLOWED_IMAGE_FORMATS:
                        raise ValidationError(
                            "Unsupported image format. Use JPEG, PNG, or WEBP."
                        )
                    image.verify()
        except (Image.DecompressionBombWarning, Image.DecompressionBombError):
            raise ValidationError("Image dimensions are too large.") from None
        except (UnidentifiedImageError, OSError, SyntaxError, ValueError):
            raise ValidationError("Uploaded file is not a valid image.") from None
    finally:
        try:
            value.seek(0)
        except (AttributeError, OSError):
            pass
