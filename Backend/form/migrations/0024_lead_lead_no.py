# Generated by Django 4.1.7 on 2024-02-28 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0023_remove_lead_lead_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='lead_no',
            field=models.CharField(default='1235456789', max_length=8),
        ),
    ]