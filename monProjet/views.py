from django.shortcuts import render


def test(request):
    context = {'test': 'Bonjour'}
    return render(request, 'index.html', context)