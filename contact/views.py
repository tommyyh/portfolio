from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.core.mail import EmailMessage
from django.conf import settings
from smtplib import SMTPException

def contact(request):
  return render(request, 'contact/contact.html')

@api_view(['POST'])
def send_message(request):
  name = request.data['name']
  email_address = request.data['email']
  msg = request.data['msg']
  body = f'Name: {name}, Email: {email_address}, Message: {msg}'

  print('Before')

  email = EmailMessage(
    'Portfolio - Contact form (Project)',
    body,
    settings.EMAIL_HOST_USER,
    ['tommyyhoangg@gmail.com'],
  )

  email.fail_silently = False
  
  try:
    print('try')
    email.send()
  except SMTPException as e:
    print('There was an error sending an email: ', e) 

  print('After')
  return Response({ 'status': 200 })