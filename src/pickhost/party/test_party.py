from django.test import TestCase, Client

from .models import Party, Member
from .views import create_party
from django.core.urlresolvers import reverse

import pytest

now = pytest.mark.now

# Create your tests here.

@pytest.mark.django_db
def test_create_party():
    """
    Check that we can create objects at all.
    """
    party = Party.objects.create()
    member_data = [
       {'party': party, 'name': 'MIT',
       'address': '70 Massachusetts Avenue, Cambridge MA 02139',
    }, {'party': party, 'name': 'Taza Chocolate',
        'address': '561 Windsor St, Somerville, MA 02143',
    }, {'party': party, 'name': 'Cambridgeside Gallaria',
        'address': '100 Cambridgeside Pl, Cambridge, MA 02141',
    }, {'party': party, 'name': 'Redbones BBQ',
        'address': '55 Chester St, Somerville, MA 02144',
    }, {'party': party, 'name': 'Cambridge Friends School',
        'address': '5 Cadbury Rd, Cambridge, MA 02140',
    }, {'party': party, 'name': 'Market Basket',
        'address': '400 Somerville Ave, Somerville, MA 02143',
    }]
    #bulk_create does not create primary keys
    members = []
    for member_args in member_data:
        members.append(Member.objects.create(**member_args))
    party.best_host = members[3]
    party.save()
    assert Party.objects.all()[0].best_host.address == \
        member_data[3]['address']

@pytest.mark.django_db
def test_create_party_with_only_three_members():
    """
    Check that submitting a form with only 3 addresses filled in but
    with more blank fields results in a party and only 3 members being created.
    """
    form_submitted_data = {
        'csrfmiddlewaretoken': 'uYfPMpXM6rknE812cZxQfxqckfUzIv0E',
        'member_set-INITIAL_FORMS': '0',
        'member_set-MIN_NUM_FORMS': '0',
        'member_set-TOTAL_FORMS': '3',
        'member_set-MAX_NUM_FORMS': '1000',
        'member_set-0-id': '',
        'member_set-0-party': '',
        'member_set-0-address': '70 Massachusetts Avenue\nCambridge MA, 02139',
        'member_set-0-name': 'MIT',
        'member_set-1-id': '',
        'member_set-1-party': '',
        'member_set-1-name': 'Taza Chocolate',
        'member_set-1-address': '561 Windsor St, \nSomerville, MA 02143',
        'member_set-2-id': '',
        'member_set-2-party': '',
        'member_set-2-name': 'Cambridgeside Gallaria',
        'member_set-2-address': '100 Cambridgeside Pl,\nCambridge, MA 02141',
    }
    response = Client().post(
        reverse('create_party'),
        form_submitted_data
    )

    assert 302 == response.status_code

    members = tuple(Member.objects.select_related('party').all())

    assert len(members) == 3
    assert members[0].name == form_submitted_data['member_set-0-name']
    assert members[2].name == form_submitted_data['member_set-2-name']
    assert members[2].party == members[1].party

def test_create_party_handle_empty_form_rows():
    """
    Check that submitting a form with only 3 addresses filled in but
    with more blank fields results in a party and only 3 members being created.
    """
    form_submitted_data = {
        'csrfmiddlewaretoken': 'uYfPMpXM6rknE812cZxQfxqckfUzIv0E',
        'member_set-INITIAL_FORMS': '0',
        'member_set-MIN_NUM_FORMS': '0',
        'member_set-TOTAL_FORMS': '5',
        'member_set-MAX_NUM_FORMS': '1000',
        'member_set-0-id': '',
        'member_set-0-party': '',
        'member_set-0-address': '70 Massachusetts Avenue\nCambridge MA, 02139',
        'member_set-0-name': 'MIT',
        'member_set-1-id': '',
        'member_set-1-party': '',
        'member_set-1-name': 'Taza Chocolate',
        'member_set-1-address': '561 Windsor St, \nSomerville, MA 02143',
        'member_set-2-id': '',
        'member_set-2-party': '',
        'member_set-2-name': 'Cambridgeside Gallaria',
        'member_set-2-address': '100 Cambridgeside Pl,\nCambridge, MA 02141',
        'member_set-3-id': '',
        'member_set-3-party': '',
        'member_set-3-name': '',
        'member_set-3-address': '',
        'member_set-4-id': '',
        'member_set-4-party': '',
        'member_set-4-name': '',
        'member_set-4-address': '',
    }
    response = Client().post(
        reverse('create_party'),
        form_submitted_data
    )

    import pdb;pdb.set_trace()
    assert 200 == response.status_code
    assert 'name' in response.context['formset'].errors[3]
    assert 'address' in response.context['formset'].errors[3]
    assert 'name' in response.context['formset'].errors[4]
    assert 'address' in response.context['formset'].errors[4]
