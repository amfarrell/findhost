from django.shortcuts import render
from django import forms
from .models import Party, Member

# Create your views here.


def create_party(request):
    PartyFormSet = forms.inlineformset_factory(Party, Member,
        fields=('name', 'address',),
        can_delete=False,
        can_order=False,
        extra=7,
        widgets={
            'address': forms.Textarea(attrs={'rows': 2})
        })
    if 'GET' == request.method:
        return render(request, 'party/create_party.html', {
                'formset': PartyFormSet(instance=Party())
            })
    else:
        import pdb;pdb.set_trace()
        formset = PartyFormSet(request.POST)
        if formset.is_valid():
            party = Party.objects.create()
            for form in formset.forms:
                form.instance.party = party
                form.save()
        return render(request, 'party/create_party.html', {
                'formset': formset
            })




def show_party(request, party_uuid):
    return None
