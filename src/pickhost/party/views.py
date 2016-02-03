from django.shortcuts import render, redirect
from django import forms
from django.core.urlresolvers import reverse

from .models import Party, Member
from .forms import PartyFormSet

# Create your views here.


def create_party(request):
    if 'GET' == request.method:
        return render(request, 'party/create_party.html', {
                'formset': PartyFormSet()
            })
    else:
        formset = PartyFormSet(request.POST)
        if not formset.is_valid():
            return render(request, 'party/create_party.html', {
                    'formset': formset
                })
        else:
            party = Party.objects.create()
            for form in formset.forms:
                form.instance.party = party
                form.save()
            return redirect(reverse('show_party', kwargs={'party_uuid': party.uuid}))

def show_party(request, party_uuid):
    party = Party.objects.get(uuid = party_uuid)
    return render(request, 'party/show_party.html', {
        'party': party
    })
