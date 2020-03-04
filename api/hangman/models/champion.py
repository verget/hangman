""" Champion module. """
from django.db import models
from hangman.models import HangmanAbstractModel


class Champion(HangmanAbstractModel):
    """ Champion. """

    name = models.CharField(max_length=255)
    score = models.CharField(max_length=3)

    def __str__(self):
        return self.name
