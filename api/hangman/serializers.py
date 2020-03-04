from hangman.models import Champion, Answer
from rest_framework import serializers

class ChampionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Champion
        fields = ['name', 'score']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text']
