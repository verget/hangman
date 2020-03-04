""" Abstract/Base model"""
import uuid

from django.db import models

class HangmanAbstractModel(models.Model):
    """Base model for models. Defining UUID as primary key."""

    uuid = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    class Meta:
        abstract = True
