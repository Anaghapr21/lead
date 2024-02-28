# Generated by Django 4.1.7 on 2024-02-27 10:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('form', '0008_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='additional_notes',
            field=models.CharField(default='abjks', max_length=255),
        ),
        migrations.AddField(
            model_name='lead',
            name='business_verticals',
            field=models.CharField(default='gjnk', max_length=255),
        ),
        migrations.AddField(
            model_name='lead',
            name='company_headquarters',
            field=models.CharField(default='abbjj', max_length=255),
        ),
        migrations.AddField(
            model_name='lead',
            name='date',
            field=models.DateField(default=datetime.datetime(2024, 2, 27, 10, 19, 7, 244118, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='lead',
            name='divisional_operations',
            field=models.CharField(default='sbs', max_length=255),
        ),
        migrations.AddField(
            model_name='lead',
            name='lead_no',
            field=models.CharField(default='123', max_length=100),
        ),
        migrations.AddField(
            model_name='lead',
            name='running_promotions',
            field=models.CharField(default='hvj', max_length=255),
        ),
    ]
