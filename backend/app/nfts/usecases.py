# usecases.py
from .models import NFTs

def add_to_favorites_fn(request, pk: int) -> bool:
    """ Adds an NFT object to favorites for the current user """
    try:
        nft = NFTs.objects.get(pk=pk)
    except NFTs.DoesNotExist:
        return False

    user = request.user
    if user in nft.liked_by.all():
        return False
    
    nft.liked_by.add(user)
    return True

def remove_from_favorites_fn(request, pk: int) -> bool:
    """ Removes an NFT object from favorites for the current user """
    try:
        nft = NFTs.objects.get(pk=pk)
    except NFTs.DoesNotExist:
        return False

    user = request.user
    if user not in nft.liked_by.all():
        return False

    nft.liked_by.remove(user)
    return True



def testpermission(user): 
    if user.is_authenticated() and user.has_perm("myapp.change_category"): 
        return True 
    else: 
        return False