# Generated by Django 3.1.4 on 2021-03-04 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0003_auto_20210304_1831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='queue',
            name='code',
            field=models.CharField(max_length=8),
        ),
    ]
