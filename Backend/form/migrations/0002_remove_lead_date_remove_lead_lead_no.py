# Generated by Django 4.1.7 on 2024-02-26 10:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lead',
            name='date',
        ),
        migrations.RemoveField(
            model_name='lead',
            name='lead_no',
        ),
    ]
