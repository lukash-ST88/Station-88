# Generated by Django 4.2.3 on 2023-09-04 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_banners'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='banners',
            options={'verbose_name': 'Баннер', 'verbose_name_plural': 'Баннеры'},
        ),
        migrations.AddField(
            model_name='banners',
            name='link',
            field=models.CharField(max_length=255, null=True, verbose_name='Ссылка'),
        ),
    ]