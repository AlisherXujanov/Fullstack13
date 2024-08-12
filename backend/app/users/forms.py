from allauth.account.forms import LoginForm, SignupForm
from django import forms
from django.core.exceptions import ValidationError
class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['login'].label = ""
        self.fields['password'].label = ""
        if 'remember' in self.fields:
            del self.fields['remember']
    def clean_login(self):
        login = self.cleaned_data.get('login')
        if login:
            if len(login) < 2:
                self.add_error('login', "Логин должен содержать как минимум 2 символа.")
            if len(login) > 20:
                self.add_error('login', "Логин не может быть длиннее 20 символов.")
        return login
            
            
class CustomSignupForm(SignupForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].label = ""
        self.fields['email'].label = ""
        self.fields['password1'].label = ""
        self.fields['password2'].label = ""
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username:
            if len(username) < 2:
                self.add_error('username', "Имя пользователя должно содержать как минимум 2 символа.")
            if len(username) > 20:
                self.add_error('username', "Имя пользователя не может быть длиннее 20 символов.")
        return username
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Пример проверки правильности формата электронной почты
            if not forms.EmailField().clean(email):
                self.add_error('email', "Введите правильный адрес электронной почты.")
        return email
    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')
        if password1:
            if len(password1) < 8:  # Пример проверки минимальной длины пароля
                self.add_error('password1', "Пароль должен содержать как минимум 8 символов.")
        return password1
    def clean_password2(self):
        password2 = self.cleaned_data.get('password2')
        password1 = self.cleaned_data.get('password1')
        if password2 != password1:
            self.add_error('password2', "Пароли не совпадают.")
        return password2

