import json
from io import UnsupportedOperation
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from web.models import Formulario

# Create your views here.
def index(request):
    return render(request, "web/index.html")

def listar_datos(request):
    datos = Formulario.objects.all()
    lista_contacto = []
    for dato in datos:
        dato_contacto = {}
        dato_contacto['id'] = dato.id
        dato_contacto['email'] = dato.email
        dato_contacto['password'] = dato.password
        lista_contacto.append(dato_contacto)
    data = json.dumps(lista_contacto)
    return HttpResponse(data, 'application/json')

def actualizar_datos(request):
    datos = Formulario.objects.all()
    lista_contacto = []
    for dato in datos:
        dato_contacto = {}
        dato_contacto['id'] = dato.id
        dato_contacto['email'] = dato.email
        dato_contacto['password'] = dato.password
        lista_contacto.append(dato_contacto)
    data = json.dumps(lista_contacto)
    return HttpResponse(data, 'application/json')

def cargar_datos(request):
    email = request.POST['email']
    password = request.POST['password']
    print('     CREATE >', email, password)
    guardar_db = Formulario(
        email = email,
        password = password
    )
    guardar_db.save()
    return render(request, "web/index.html")

def borrar_datos(request):
    id_borrar = request.POST['id']
    print('     DELETE ID >', id_borrar)
    borrar_dato = Formulario.objects.get(
        id = id_borrar
    )
    borrar_dato.delete()
    # actualizar
    datos = Formulario.objects.all()
    lista_contacto = []
    for dato in datos:
        dato_contacto = {}
        dato_contacto['id'] = dato.id
        dato_contacto['email'] = dato.email
        dato_contacto['password'] = dato.password
        lista_contacto.append(dato_contacto)
    data = json.dumps(lista_contacto)
    return HttpResponse(data, 'application/json')

def editar_datos(request):
    id_editar = request.POST['id']
    email     = request.POST['email']
    password  = request.POST['password']
    print('     UPDATE >', id_editar, email, password)
    editar_dato = Formulario.objects.get(
        id = id_editar,
    )
    editar_dato.email = email
    editar_dato.password = password
    editar_dato.save()
    # actualizar
    datos = Formulario.objects.all()
    lista_contacto = []
    for dato in datos:
        dato_contacto = {}
        dato_contacto['id'] = dato.id
        dato_contacto['email'] = dato.email
        dato_contacto['password'] = dato.password
        lista_contacto.append(dato_contacto)
    data = json.dumps(lista_contacto, default=str)
    return HttpResponse(data, 'application/json')
