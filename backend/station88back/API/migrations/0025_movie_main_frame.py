# Generated by Django 4.2.3 on 2024-04-11 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0024_alter_book_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='main_frame',
            field=models.ImageField(null=True, upload_to='movie/main_frames/', verbose_name='Главный кадр'),
        ),
    ]