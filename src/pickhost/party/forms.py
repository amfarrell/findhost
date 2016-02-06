from django import forms
from .models import Party, Member

class RequireInlineFormSet(forms.BaseInlineFormSet):
    def __init__(self, *args, **kwargs):
        super(RequireInlineFormSet, self).__init__(*args, **kwargs)
        for form in self.forms:
            form.empty_permitted = False

PartyFormSet = forms.inlineformset_factory(Party, Member,
    fields=('name', 'address', 'latlng'),
    can_delete=False,
    can_order=False,
    extra=2,
    formset=RequireInlineFormSet,
    widgets={
        'address': forms.Textarea(attrs={'rows': 2})
    })
