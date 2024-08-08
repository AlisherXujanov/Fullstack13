from django.shortcuts import render,redirect
from django.contrib.auth import logout
from .models import NFTs
from django.contrib import messages

def custom_logout(request):
    logout(request)
    return redirect('landing_page')


def custom_404(request, exception):
    return render(request, '404.html', status=404)


def landing_page(request):
    return render(request, 'landing_page.html')


def create_nft(request):
    
    if request.method == "POST":
        print("-----------------------------------------")
        print(request.POST)
        print(request.FILES)
        print("-----------------------------------------")
        
        name = request.POST['name']
        description = request.POST['description']
        price = request.POST['price']
        img = request.FILES['image']
        # collection = request.POST['collection']

        nft_obj = NFTs.objects.create(
            name = name,
            description = description,
            price = price,
            image = img,
            owner = request.user
        )
        nft_obj.save()
        messages.success(request, 'NFT created successfully')
        return redirect('landing_page')
    
    return render(request, 'create_nft.html')



def explore(request):
    context = {
        'nfts':NFTs.objects.all()
    }
    return render(request,'explore.html', context)

def nft_page(request, pk:int):
    nft = NFTs.objects.get(id=pk)
    return render(request, 'nft_page.html', {'nft':nft})