from .models import NFTs


def add_to_favorites_fn(request, pk:int) -> bool:
    """ This function is used to add an NFT object into favorites
    Args:
        request (_type_): request object for using session storage
        pk (int): primary key of the NFT object that is going to be added into favorites
    """
    session = request.session
    favorites = session.get('favorites', [])
    if pk in favorites:
        return False
    
    favorites.append(pk)
    session['favorites'] = favorites
    return True
    

def remove_from_favorites_fn(request, pk:int) -> bool:
    """ This function is used to remove an NFT object from favorites

    Args:
        request (_type_): request object for using session storage
        pk (int): primary key of the NFT object that is going to be removed from favorites

    Returns:
        bool: _description_
    """
    session = request.session
    favorites = session.get('favorites', [])
    if pk not in favorites:
        return False

    favorites.remove(pk)
    session['favorites'] = favorites
    return True