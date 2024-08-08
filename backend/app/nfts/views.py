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
        name = request.POST['name']
        description = request.POST['description'].strip()
        price = request.POST['price']
        img = request.FILES['image']
        # collection = request.POST['collection']

        NFTs.objects.create(
            name = name,
            description = description,
            price = price,
            image = img,
            owner = request.user
        )
        messages.success(request, 'NFT created successfully')
        return redirect('explore')
    
    context = {
        'length_of_nfts': NFTs.objects.all().count()+1
    }
    return render(request, 'create_nft.html', context)



def update_nft(request, pk:int):
    nft = NFTs.objects.get(id=pk)

    if request.method == "POST":
        name = request.POST['name']
        description = request.POST['description'].strip()
        price = request.POST['price']
        img = request.FILES['image']
        
        nft.name = name
        nft.description = description
        nft.price = price
        nft.image = img
        nft.save()
        messages.success(request, 'NFT updated successfully')

        # Go to details page
        return redirect('nft_page', pk=pk) 

    context = {'nft_obj':nft}
    return render(request, 'update_nft.html', context)

    


def explore(request):
    context = {
        'nfts':NFTs.objects.all()
    }
    return render(request,'explore.html', context)

def nft_page(request, pk:int):
    nft = NFTs.objects.get(id=pk)
    return render(request, 'nft_page.html', {'nft':nft})