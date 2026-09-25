from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'turismo/home.html')

def galeria(request):
    return render(request, 'turismo/galeria.html')

def historia(request):
    return render(request, 'turismo/historia.html')

def atracoes(request):
    return render(request, 'turismo/atracoes.html')