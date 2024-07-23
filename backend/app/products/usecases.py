

def add_to_favorites_fn(request, product_id: int) -> bool:
    favorites: list = request.session.get("favorites", [])

    if product_id in favorites:
        return False

    favorites.append(product_id)
    request.session["favorites"] = favorites
    return True


def remove_from_favorites_fn(request, product_id: int) -> bool:
    favorites: list = request.session.get("favorites", [])

    if product_id not in favorites:
        return False

    favorites.remove(product_id)
    request.session["favorites"] = favorites
    return True
