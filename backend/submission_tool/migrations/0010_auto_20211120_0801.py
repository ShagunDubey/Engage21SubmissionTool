# Generated by Django 3.2.9 on 2021-11-20 08:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submission_tool', '0009_assignment_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='assignment',
            name='title',
            field=models.CharField(default='', unique=True, max_length=100),
            preserve_default=False,
        ),
    ]
