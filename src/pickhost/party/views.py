from django.shortcuts import render, redirect
from django import forms
from django.core.urlresolvers import reverse
from django.http import JsonResponse

from .models import Party, Member
from .forms import PartyFormSet
from .pick import pick_address
import json

# Create your views here.


def party(request):
    if 'GET' == request.method:
        return render(request, 'party/create_party.html', {
                'formset': PartyFormSet()
            })
    else:
        data = json.loads(request.body.decode('utf8'))

        formset = PartyFormSet(data)
        if not formset.is_valid():
            return JsonResponse({'errors': formset.errors()})
        else:
            party = Party.objects.create()
            for form in formset.forms:
                form.instance.party = party
                form.save()
            return JsonResponse({'best_destination': pick_address(party)})
