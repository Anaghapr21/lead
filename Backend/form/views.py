from django.shortcuts import render

# Create your views here.
# from rest_framework import generics
# from .models import *
# from .serializers import LeadSerializer
# class LeadListCreateView(generics.ListCreateAPIView):
#     queryset=Lead.objects.all()
#     serializer_class=LeadSerializer

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import LeadSerializer

class LeadListCreateView(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Log the validation errors
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



from openpyxl import Workbook
from django.http import HttpResponse
def export_to_excel(request):
    backend_data=Lead.objects.all()
    wb=Workbook()
    ws=wb.active
    headers=['lead_no','Date','Company Name','Company Address','Country','Street','City','Contact Person','Contact No','Email','Designation','Company HeadQuarters','Business Verticals','Running Promotions','Divisional Operations','Additional Notes'] 
    ws.append(headers)

    for row in backend_data:
        ws.append([row.lead_no,row.date,row.company_name,row.company_address,row.country,row.street,row.city,row.contact_person,row.contact_no,row.email,row.designation,row.company_headquarters,row.business_verticals,row.running_promotions,row.divisional_operations,row.additional_notes])

    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=exported_data.xlsx'

    # Save the workbook to the response
    wb.save(response)

    return response