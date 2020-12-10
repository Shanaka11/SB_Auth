from django.db import models
from django.contrib.auth.models import AbstractUser

# Make the email unique
class User(AbstractUser):
    email = models.EmailField(unique=True)
    verified = models.BooleanField(default=False, blank=False, null=False)