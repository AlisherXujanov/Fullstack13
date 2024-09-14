import "./productDetails.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { BASE_URL } from "../../store"
import Heading from "../common/Heading"

import { IoDocumentTextOutline } from "react-icons/io5"
import { MdDownloadForOffline } from "react-icons/md"
import Certificate from "../../assets/images/certificates/first.png"
import Lycence from "../../assets/images/certificates/second.png"
import Consultation from "../Navigation/Footer/Consultation"

function ProductDetails(props) {
    const { id } = useParams()
    const [product, setProduct] = useState({})

    useEffect(() => {
        goToTopSmoothly()
        getProduct()
        document.title = "Product: " + product?.name
    }, [])

    function goToTopSmoothly() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    async function getProduct() {
        const URL = BASE_URL + "products/" + id
        let response = await fetch(URL)
        let data = await response.json()
        setProduct(data)
    }

    return (
        <>
            <div className="product-details-wrapper">
                <p className="intro">
                    Продукты / {product?.name?.split(" ").slice(0, 3).join(" ")}
                </p>
                <Heading size={1}>{product.name}</Heading>

                <div className="image-wrapper">
                    <img src={product.image} alt="Product image" />
                    <p className="content">
                        {product.description}
                    </p>
                </div>
                <p className="content-content2">
                    {product.description}
                </p>
                <p className="content-content3">
                    {product.description}
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