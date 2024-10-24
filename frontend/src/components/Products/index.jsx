import "./style.scss"
import Heading from "../common/Heading"
import ProductsInfo from "./ProductsInfo"
import { Link } from "react-router-dom"
import { useEffect, useContext } from 'react'
import { globalContext, BASE_URL_APIS } from "../../store"
import { getTokenFromLS, fetchProducts } from "../../store/helpers"
import ModalComponent from "../common/ModalComponent"
import ProductForm from "../common/ProductForm"
import { toast } from "react-toastify"
import {useTranslation} from 'react-i18next'

function Products() {
  const state = useContext(globalContext);
  const {t} = useTranslation()

  useEffect(() => {
      document.title = "Products";
  }, [])

  function openModal(e) {
    state.dispatch({ type: "SET_SHOW_MODAL", payload: true });
  }

  function toggleLike(e, p_id) {
    try {
      const URL = BASE_URL_APIS + `products/toggle-like/${p_id}/`;
      fetch(URL, {
        method: "POST",
        headers: {
          Authorization: "Token " + getTokenFromLS(),
        },
      }).then(async (response) => {
        if (response.status === 200) {
          const data = await fetchProducts();
          state.dispatch({ type: "SET_PRODUCTS", payload: data });
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Ooops! Something went wrong");
    }
  }

  return (
    <main className="products-page-wrapper">
      <div className="one-block">
        <Heading size={1.2}>Products</Heading>
        <button className="warning-btn create-btn" onClick={openModal}>
          Create new product
        </button>
      </div>

      {state.showModal && (
        <div className="create-form-modal-wrapper">
          <ModalComponent title="Create new product">
            <ProductForm />
          </ModalComponent>
        </div>
      )}

      <div className="component-wrapper">
        {state.products && state.products.length > 0 ? (
          state.products.map((product, index) => {
            return (
              <div key={index}>
                <ProductsInfo image={product.image}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>

                  <Link
                    to={"#"}
                    className="fire-like-product-link"
                    onClick={(e) => toggleLike(e, product.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={
                        product.liked_by.includes(state.profile?.user?.id)
                          ? "#FF6600"
                          : "#333"
                      }
                      className={
                        (product.liked_by.includes(state.profile?.user?.id)
                          ? "liked "
                          : "not-liked ") + "bi bi-star-fill"
                      }
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <span className="likes_count">
                      {product.liked_by.length}
                    </span>
                  </Link>

                  <Link
                    to={"/products/" + product.id}
                    className="products-info"
                  >
                    <button className="warning-btn">Подробнее</button>
                  </Link>

                  <Link
                    to={"/comments/" + product.id}
                    className="product-comments"
                  >
                    <span>{product.related_comments.length}</span> Комментарии{" "}
                    <span className="arrow-right">&gt;</span>
                  </Link>
                </ProductsInfo>
              </div>
            );
          })
        ) : (
          <h2>Нет продуктов</h2>
        )}
      </div>
      <h2>
        <span>*</span> в процессе регистрации
      </h2>
    </main>
  );
}

export default Products;
