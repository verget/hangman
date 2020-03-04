from hangman.models import Champion, Answer
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from hangman.serializers import ChampionSerializer, AnswerSerializer


class ChampionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows champions to be viewed or edited.
    """
    queryset = Champion.objects.all().order_by('score')
    serializer_class = ChampionSerializer


class AnswerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows answers to be viewed or edited.
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def retrieve(self, request, pk=None):
        if pk == '0':
            answer = Answer.objects.order_by('?').first()
            serializer = AnswerSerializer(answer)
            return Response(serializer.data)
        else:
            return super(AnswerViewSet, self).retrieve(request, pk)
