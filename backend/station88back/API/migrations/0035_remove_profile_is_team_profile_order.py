# Generated by Django 4.2.3 on 2024-12-03 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0034_profile_is_team'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='is_team',
        ),
        migrations.AddField(
            model_name='profile',
            name='order',
            field=models.IntegerField(null=True, verbose_name='Очередность'),
        ),
    ]
