import uuid

from django.db import models

# Create your models here.
class Party(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    best_host = models.ForeignKey('party.Member',
                                  null=True,
                                  related_name='host_of',
                                  on_delete=models.CASCADE)

class Member(models.Model):
    party = models.ForeignKey('party.Party', on_delete=models.CASCADE)
    name = models.CharField(max_length = 128, null=False, blank=False)
    address = models.TextField(null=False, blank=False)

    def __str__(self):
        return "{} who lives at {}".format(self.name, self.address.split('\n')[0])
