# Generated by Django 4.1.7 on 2024-02-28 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0024_lead_lead_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='lead_no',
            field=models.CharField(max_length=8),
        ),
    ]
