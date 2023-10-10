# Generated by Django 4.2.5 on 2023-10-10 07:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('crm', '0002_jigyosyo_action_type_jigyosyo_related_jigyosyos_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jigyosyo',
            name='action_type',
        ),
        migrations.RemoveField(
            model_name='jigyosyo',
            name='related_jigyosyos',
        ),
        migrations.RemoveField(
            model_name='jigyosyo',
            name='rule_description',
        ),
        migrations.AddField(
            model_name='jigyosyo',
            name='customized_description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='jigyosyo',
            name='free_description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='jigyosyo',
            name='merged_from',
            field=models.ManyToManyField(blank=True, related_name='merged_origins', to='crm.jigyosyo'),
        ),
        migrations.AddField(
            model_name='jigyosyo',
            name='merged_into',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='merged_targets', to='crm.jigyosyo'),
        ),
        migrations.AddField(
            model_name='jigyosyo',
            name='split_from',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='split_origins', to='crm.jigyosyo'),
        ),
        migrations.AddField(
            model_name='jigyosyo',
            name='split_into',
            field=models.ManyToManyField(blank=True, related_name='split_targets', to='crm.jigyosyo'),
        ),
    ]
