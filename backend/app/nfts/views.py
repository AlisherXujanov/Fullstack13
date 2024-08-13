from django.shortcuts import render, redirect
from django.contrib.auth import logout
from .models import NFTs
from django.db.models import Count
from django.contrib import messages
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from .usecases import *


def custom_logout(request):
    logout(request)
    return redirect('landing_page')


def custom_404(request, exception):
    return render(request, '404.html', status=404)


def landing_page(request):
    context = {
        'most_liked':NFTs.objects.annotate(num_likes=Count('liked_by')).filter(num_likes__gt=0).order_by('-num_likes')
    
    }
    return render(request, 'landing_page.html', context)


def add_to_favorites(request, pk: int):
    if not request.user.is_authenticated:
        messages.warning(request, 'You need to be logged in to add favorites')
        return redirect(request.META.get('HTTP_REFERER'))

    if add_to_favorites_fn(request, pk):
        messages.success(request, 'NFT added to favorites')
    else:
        messages.warning(request, 'Already in favorites')

    return redirect(request.META.get('HTTP_REFERER'))

def remove_from_favorites(request, pk: int):
    if not request.user.is_authenticated:
        messages.warning(request, 'You need to be logged in to remove favorites')
        return redirect(request.META.get('HTTP_REFERER'))

    if remove_from_favorites_fn(request, pk):
        messages.success(request, 'NFT removed from favorites')
    else:
        messages.warning(request, 'This NFT is not in favorites')

    return redirect(request.META.get('HTTP_REFERER'))


def create_nft(request):
    if request.method == "POST":
        name = request.POST['name']
        description = request.POST['description'].strip()
        price = request.POST['price']
        img = request.FILES['image']
        # collection = request.POST['collection']

        NFTs.objects.create(
            name=name,
            description=description,
            price=price,
            image=img,
            owner=request.user
        )
        messages.success(request, 'NFT created successfully')
        return redirect('explore')

    context = {
        'length_of_nfts': NFTs.objects.all().count()+1
    }
    return render(request, 'create_nft.html', context)


def update_nft(request, pk: int):
    nft = NFTs.objects.get(id=pk)

    if request.method == "POST":
        name = request.POST['name']
        description = request.POST['description'].strip()
        price = request.POST['price']
        
        if img := request.FILES.get('image', None):
            nft.image = img
        # img = request.FILES.get('image', None)
        # if img:
        #     nft.image = img

        nft.name = name
        nft.description = description
        nft.price = price
        nft.save()
        messages.success(request, 'NFT updated successfully')

        # Go to details page
        return redirect('nft_details', pk=pk)

    context = {'nft_obj': nft}
    return render(request, 'update_nft.html', context)

    
class ExploreView(ListView):
    model = NFTs
    template_name = 'explore.html'
    context_object_name = 'nfts'
    paginate_by = 4

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['favorites'] = NFTs.objects.filter(liked_by=self.request.user).values_list('id', flat=True)
        return context



def nft_details(request, pk: int):
    nft = NFTs.objects.get(id=pk)
    context = {
        'nft': nft,
        'favorites':  NFTs.objects.filter(liked_by=request.user).values_list('id', flat=True)
    }
    return render(request, 'nft_details.html', context)


def delete_nft(request, pk: int):
    nft = NFTs.objects.get(id=pk)
    nft.delete()
    messages.success(request, 'NFT deleted successfully')
    return redirect('explore')
