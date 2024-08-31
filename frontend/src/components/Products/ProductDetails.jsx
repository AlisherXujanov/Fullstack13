import "./productDetails.scss"
import { useParams } from "react-router-dom"
import { useEffect } from 'react'
import ProductsJSON from "../../db/products.json"

import img1 from "../../assets/images/img1.png"
import img2 from "../../assets/images/img2.png"
import img3 from "../../assets/images/img3.png"
import img4 from "../../assets/images/img4.png"
import img5 from "../../assets/images/img5.png"
import Heading from "../common/Heading"

import { IoDocumentTextOutline } from "react-icons/io5"
import { MdDownloadForOffline } from "react-icons/md"
import Certificate from "../../assets/images/certificates/first.png"
import Lycence from "../../assets/images/certificates/second.png"
import Consultation from "../Navigation/Footer/Consultation"

function ProductDetails(props) {
    const { id } = useParams()
    const product = ProductsJSON.find(product => product.id === parseInt(id))
    const images = [img1, img2, img3, img4, img5]


    function goToTopSmoothly() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        goToTopSmoothly()
        document.title = "Product: " + product.title
    }, [])

    return (
        <>
            <div className="product-details-wrapper">
                <p className="intro">
                    Продукты / {product.title.split(" ").slice(0, 3).join(" ")}
                </p>
                <Heading size={1}>{product.title}</Heading>

                <div className="image-wrapper">
                    <img src={images[product.id % images.length]} alt="Product image" />
                    <p className="content">
                        {product.content}
                    </p>
                </div>
                <p className="content-content2">
                    {product.content2}
                </p>
                <p className="content-content3">
                    {product.content3}
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