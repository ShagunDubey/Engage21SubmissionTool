# Generated by Django 3.2.9 on 2021-11-23 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('submission_tool', '0016_alter_classroom_teacher'),
    ]

    operations = [
        migrations.AddField(
            model_name='submission',
            name='comments',
            field=models.TextField(blank=True, null=True),
        ),
    ]
