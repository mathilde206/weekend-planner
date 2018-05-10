from rest_framework import serializers
from .models import City

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            'pk',
            'name',
            'country',
            'currency',
            'language',
        ]
        read_only_fields = [
            'pk',
        ]

    def validate_name(self, value):
        qs = City.objects.filter(name__iexact = value)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("The City already exists")
        return value
