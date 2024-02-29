# from .models import *
# from rest_framework import serializers

# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = '__all__'


from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['lead_no','date','company_name', 'company_address','country','street','city', 'contact_person', 'email', 'designation', 'contact_no', 'business_verticals','company_headquarters','running_promotions','divisional_operations','additional_notes']
        # fields='__all__'
