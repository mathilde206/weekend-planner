from django.views.generic import View
from django.shortcuts import render

# Create your views here.
class FrontEndRenderView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'frontend.html')
