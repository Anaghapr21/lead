from django.db import models

# Create your models here.
class Lead(models.Model):
    # lead_no = models.CharField(max_length=100)
    # date = models.DateField()
    lead_no = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True) 
    company_name = models.CharField(max_length=100)
    company_address = models.CharField(max_length=255)
    street=models.CharField(max_length=255)
    city=models.CharField(max_length=255)
    contact_person = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=30)
    email = models.EmailField()
    designation = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    company_headquarters=models.CharField(max_length=255)
    business_verticals = models.CharField(max_length=255, blank=True)
    running_promotions=models.CharField(max_length=255)
    divisional_operations = models.CharField(max_length=255, blank=True)
    running_promotions=models.CharField(max_length=255)
    # divisional_operations=models.CharField(max_length=255)
    additional_notes=models.CharField(max_length=255)