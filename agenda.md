1. **Show target user**
2. **Show all profiles on the left**
3. **Filter messages**
4. **Show messages**
<!-- --------------------------------- -->
5. **Make friends clickable so that when clicked, the messages are filtered by the friend**
6. **Show last message of each friend**
<!-- --------------------------------- -->
7. *Implement searchbox for friends section*
8. Send messages



<!-- ======================================================================================== -->
<!-- ======================================================================================== -->
<!-- --------------------------------- -->
IDENTIFYING THE TARGET USER is online or not
```python
from django.utils import timezone
from django.conf import settings

class UpdateLastActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_profile = Profile.objects.get(user=request.user)
        response = self.get_response(request)
        if request.user.is_authenticated:
            user_profile.last_activity = timezone.now()
            user_profile.save()
        return response
# ========================================
# ========================================
# SETTINGS
MIDDLEWARE = [
    # other middleware
    'path.to.UpdateLastActivityMiddleware',
]

# ========================================
# ========================================
# USECASEs
from django.utils import timezone
from datetime import timedelta

def is_user_online(user):
    if user_profile.last_activity:
        now = timezone.now()
        timeout = timedelta(minutes=5)  # Define your timeout period
        return now - user_profile.last_activity < timeout
    return False

# ========================================
# ========================================
# USAGE
user_profile = Profile.objects.get(user=user)
if is_user_online(user_profile):
    print("User is online")
else:
    print("User is offline")
```
<!-- --------------------------------- -->
<!-- ======================================================================================== -->
<!-- ======================================================================================== -->
