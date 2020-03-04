""" Answer module. """
from django.db import models
from hangman.models import HangmanAbstractModel


class Answer(HangmanAbstractModel):
    """ Answer. """

    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text
