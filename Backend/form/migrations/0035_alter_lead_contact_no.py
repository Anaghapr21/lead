# Generated by Django 4.1.7 on 2024-02-29 07:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0034_alter_lead_city_alter_lead_street'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='contact_no',
            field=models.CharField(max_length=30),
        ),
    ]
