import "./productDetails.scss"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import { BASE_URL_APIS, globalContext } from "../../store"
import { getTokenFromLS } from "../../store/helpers"
import Heading from "../common/Heading"
import {useTranslation} from 'react-i18next'

import { IoDocumentTextOutline } from "react-icons/io5"
import { MdDownloadForOffline } from "react-icons/md"
import Certificate from "../../assets/images/certificates/first.png"
import Lycence from "../../assets/images/certificates/second.png"
import Consultation from "../Navigation/Footer/Consultation"
import ModalComponent from "../common/ModalComponent"
import ProductForm from "../common/ProductForm"
import { toast } from "react-toastify"

function ProductDetails(props) {
    const {t} = useTranslation()
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [showDialog, setShowDialog] = useState(false)
    const state = useContext(globalContext)
    const navigate = useNavigate()

    useEffect(() => {
        goToTopSmoothly()
        getProduct()
        document.title = "Product: " + product?.name
    }, [state])

    function goToTopSmoothly() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    async function getProduct() {
        let result = state.products?.find(p => p.id === parseInt(id))
        setProduct(result)
    }

    function updateProduct() {
        state.dispatch({ type: "SET_SHOW_MODAL", payload: true })
    }

    function showDeleteDialog(e = null, close = false) {
        if (close) {
            setShowDialog(false)
        } else {
            setShowDialog(true)
        }
    }

    function fetchDelete() {
        try {
            fetch(BASE_URL_APIS + `products/${id}/`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        toast.success(product?.name + " deleted successfully", { theme: 'dark' })
                        showDeleteDialog(null, true)
                        navigate("/products")
                    }
                })
        }
        catch (e) {
            toast.error("Error creating product")
        }
    }

    function formattedContent() {
        if (product?.description == null) { return "" }
        return product?.description.split(". ").map(item => {
            return item + ".<br>"
        })
    }


    return (
        <>
            <div className="product-details-wrapper">
                <p className="intro">
                    {t('products.title')} / {product?.name?.split(" ").slice(0, 3).join(" ")}
                </p>
                <Heading size={1}>{product?.name}</Heading>


                {product?.owner == state.profile.user?.id &&
                    <div className="edit-buttons">
                        <button className="warning-btn update-btn" onClick={updateProduct}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>
                        <button className="warning-btn delete-btn" onClick={showDeleteDialog}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button>

                        {showDialog &&
                            <div className="deletion-dialog">
                                <div className="content">
                                    <h1>{t('products.delete.0')} {product?.name}</h1>
                                    <p>{t('products.delete.1')} {product?.name} ?</p>
                                    <div className="confirm-dialog-buttons">
                                        <button className="warning-btn delete-btn" onClick={fetchDelete}>{t('products.delete.2')}</button>
                                        <button className="warning-btn update-btn" onClick={(e) => { showDeleteDialog(e, true) }}>{t('products.delete.3')}</button>
                                    </div>
                                </div>
                            </div>
                        }

                        {state.showModal &&
                            <div className="update-form-modal-wrapper">
                                <ModalComponent title={t('products.update-product')}>
                                    <ProductForm updateMode={true} product={product} />
                                </ModalComponent>
                            </div>
                        }
                    </div>
                }


                <div className="image-wrapper">
                    <img src={product?.image} alt="Product image" />
                    <p className="content"><span dangerouslySetInnerHTML={{ __html: formattedContent() }} /></p>
                </div>
                <p className="content-content2">
                    {product?.description}
                </p>
                <p className="content-content3">
                    {product?.description}
                </p>

                <div className="documents">
                    <h2>Документы</h2>

                    <div className="action-buttons">
                        <button className="download">
                            <span className="left">
                                <IoDocumentTextOutline />
                            </span>
                            <span className="middle">
                                <h4>Документ 1</h4>
                                <small>Размер 5мб</small>
                            </span>
                            <span className="right">
                                <a href={Certificate} download={"Certificate"}>
                                    <MdDownloadForOffline />
                                </a>
                            </span>
                        </button>

                        <button className="download">
                            <span className="left">
                                <IoDocumentTextOutline />
                            </span>
                            <span className="middle">
                                <h4>Документ 2</h4>
                                <small>Размер 3.5мб</small>
                            </span>
                            <span className="right">
                                <a href={Lycence} download={"Lycence"}>
                                    <MdDownloadForOffline />
                                </a>
                            </span>
                        </button>
                    </div>

                    <div className="lycences">
                        <h1>Лицензии</h1>

                        <div className="content">
                            <div className="first">
                                <img src={Certificate} onClick={(e) => e.target.requestFullscreen()} />
                                <p>Сертификат</p>
                            </div>
                            <div className="second">
                                <img src={Lycence} onClick={(e) => e.target.requestFullscreen()} />
                                <p>Лицензия</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Consultation />
        </>
    );
}

export default ProductDetails;