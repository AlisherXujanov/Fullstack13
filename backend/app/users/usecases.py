from .models import Messages, Profile
from django.contrib.auth.models import User
from datetime import datetime, timedelta


# TODO: use cache here
def get_ordered_messages(user: User, companion: User) -> list:
    all_messages = Messages.objects.all()
    owner_messages = list(all_messages.filter(
        owner=user, sender=companion).order_by('created_at'))
    sender_messages = list(all_messages.filter(
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


def truncate_msg(msg: str, length: int = 50) -> str:
    if len(msg) > length:
        return msg[:length] + " ..."
    return msg


def get_last_message_between(user: User, companion: User) -> str:
    chat_messages = get_ordered_messages(user, companion)

    time = None
    if last_msg := chat_messages[-1] if len(chat_messages) > 0 else None:
        current_day = datetime.now().date().day
        current_month = datetime.now().date().month
        current_year = datetime.now().date().year

        if current_day == last_msg["day"] and current_month == last_msg["month"] and current_year == last_msg["year"]:
            time = last_msg["message"]["time"]
        elif current_day-1 == last_msg["day"] and current_month == last_msg["month"] and current_year == last_msg["year"]:
            time = 'Yesterday'
        else:
            time = f"{last_msg["day"]}.{str(last_msg["month"]).zfill(2)}.{last_msg["year"]}"

    return {
        "time": time if len(chat_messages) > 0 else False,
        "content": truncate_msg(chat_messages[-1]["message"]["content"], 30) if len(chat_messages) > 0 else "No messages yet",
    }


def get_friends(user: User) -> list:
    # For now, we get all profiles as friends
    # TODO: implement a real friends system
    profiles = Profile.objects.all()
    all_friends = []
    for pr in profiles:
        all_friends.append({
            "fr_profile": pr,
            "last_message": get_last_message_between(user, pr.user)

        })
    return all_friends
