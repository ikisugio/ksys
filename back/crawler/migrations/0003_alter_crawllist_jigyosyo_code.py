# Generated by Django 4.2.5 on 2023-12-04 00:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("crawler", "0002_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="crawllist",
            name="jigyosyo_code",
            field=models.CharField(
                max_length=255, primary_key=True, serialize=False, unique=True
            ),
        ),
    ]
