import "./style.scss";
import CarouselComponent from "../common/CarouselComponent";

import CImage1 from "../../assets/images/img1.png";
import CImage2 from "../../assets/images/img2.png";
import CImage3 from "../../assets/images/img3.png";
import CImage4 from "../../assets/images/img4.png";
import CImage5 from "../../assets/images/img5.png";

import About from "../About";
import OurValues from "./OurValues";
import Marquee from "../common/Marquee";
import Team from "../Team";
import Consultation from "../Navigation/Footer/Consultation";
import CompanyBlog from "./CompanyBlog";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_URL_APIS } from "../../store";

import { useTranslation } from "react-i18next";

function LandingPage() {
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
  });
  const { t } = useTranslation();
  useEffect(() => {
    document.title = "Home";
    const URL = BASE_URL_APIS + "products";
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(URL, {
          headers: {
            Authorization: "Token " + token,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const updateProduct = async () => {
      const products = await fetchProducts();
      if (products.length > 0) {
        const randomProduct =
          products[Math.floor(Math.random() * products.length)];
        setCurrentProduct({
          id: randomProduct.id,
          name: randomProduct.name,
          description: randomProduct.description,
        });
      }
    };
    updateProduct();
    const interval = setInterval(updateProduct, 5000);
    return () => clearInterval(interval);
  }, []);

  let images = [CImage1, CImage2, CImage3, CImage4, CImage5];

  return (
    <main className="landing-page-wrapper">
      <div className="landing-carousel-wrapper">
        <CarouselComponent images={images} blurred={true}>
          <h1>{currentProduct.name || t("landing-page.hedge-fund")}</h1>
          <p>{currentProduct.description || t("landing-page.description")}</p>
          <Link to={`products/${currentProduct.id}`}>
            <button className="warning-btn">
              {t("landing-page.read-more")}
            </button>
          </Link>
        </CarouselComponent>
      </div>

      <div className="lending-page-about-wrapper">
        <About />
      </div>

      <div className="hr-wrapper">
        <Marquee />
      </div>

      <div className="lending-page-values-wrapper">
        <OurValues />
      </div>

      <div className="hr-wrapper">
        <Marquee reversed={true} />
      </div>

      <div className="lending-page-team-wrapper">
        <Team grayscale={true} />
      </div>

      <div className="hr-wrapper">
        <Marquee />
      </div>

      <div className="company-blog-wrapper">
        <CompanyBlog />
      </div>

      <div className="lending-page-consultation-wrapper">
        <Consultation />
      </div>
    </main>
  );
}

export default LandingPage;
