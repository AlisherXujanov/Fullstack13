# Generated by Django 5.0.7 on 2024-08-20 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_rename_read_messages_seen'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='last_activity',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
