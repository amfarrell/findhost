from django.test import TestCase

from .models import Party, Member

import pytest

# Create your tests here.

@pytest.mark.django_db
def test_create_party():
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
    Member.objects.bulk_create(member_data)
