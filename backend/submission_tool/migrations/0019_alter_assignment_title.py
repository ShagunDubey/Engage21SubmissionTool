# Generated by Django 3.2.9 on 2021-11-24 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submission_tool', '0018_alter_assignment_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='title',
            field=models.CharField(max_length=300),
        ),
    ]
