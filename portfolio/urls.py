from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('home.urls')),
    path('about/', include('about.urls')),
    path('projects/', include('projects.urls')),
    path('contact/', include('contact.urls')),
]
