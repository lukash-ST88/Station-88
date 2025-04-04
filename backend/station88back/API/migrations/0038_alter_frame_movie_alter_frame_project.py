# Generated by Django 4.2.3 on 2025-01-22 08:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0037_frame_project_alter_frame_movie_alter_sliders_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='frame',
            name='movie',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='frames', to='API.movie', verbose_name='Фильм'),
        ),
        migrations.AlterField(
            model_name='frame',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='frames', to='API.st88project', verbose_name='Проект'),
        ),
    ]
