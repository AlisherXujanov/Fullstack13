from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from django.conf import settings
from django.core.mail import send_mail
import logging
log = logging.getLogger(__name__)  # Get an instance of a logger


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    """
    This function will be called every time a new user is created.
    It will create a new profile for the user.
    """
    if created:
        Profile.objects.create(user=instance)
        send_mail(
            'Hello from FullStack-13',
            'Welcome to our site FullStack-13',
            settings.EMAIL_HOST_USER,
            [instance.email],
            fail_silently=False,
        )


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    """This function will be called every time a user is saved."""
    instance.profile.save()
    log.info(f"UserProfile has been created for {instance.username}")
