# Generated by Django 3.2.9 on 2021-11-12 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submission_tool', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_teacher',
            field=models.BooleanField(null=True),
        ),
    ]
