# Generated by Django 4.1.7 on 2024-02-29 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0033_lead_city_lead_street'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='city',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='lead',
            name='street',
            field=models.CharField(max_length=255),
        ),
    ]
