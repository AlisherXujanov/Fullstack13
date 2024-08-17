from .models import Messages
from django.contrib.auth.models import User


def get_ordered_messages(user: User, companion: User) -> list:
    owner_messages = list(Messages.objects.filter(
        owner=user, sender=companion).order_by('created_at'))
    sender_messages = list(Messages.objects.filter(
        owner=companion, sender=user).order_by('created_at'))
    target_chat_messages = list(owner_messages + sender_messages)

    filtered_by_day_month_year = [
        {
            "day": message.created_at.day,
            "month": message.created_at.month,
            "year": message.created_at.year,
            "message": {
                "time": message.created_at.strftime("%H:%M"),
                "content": message.content,
                "sender": "companion" if message.sender == companion else "myself"
            }
        }
        for message in target_chat_messages
    ]
    return filtered_by_day_month_year


def get_chat_messages(user: User, companion: User) -> list:
    return get_ordered_messages(user, companion)
