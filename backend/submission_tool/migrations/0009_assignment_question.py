# Generated by Django 3.2.9 on 2021-11-19 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submission_tool', '0008_auto_20211118_1340'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='question',
            field=models.FileField(blank=True, null=True, upload_to='questions'),
        ),
    ]
