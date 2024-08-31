import "./style.scss"
import CarouselComponent from "../common/CarouselComponent"

import CImage1 from "../../assets/images/img1.png"
import CImage2 from "../../assets/images/img2.png"
import CImage3 from "../../assets/images/img3.png"
import CImage4 from "../../assets/images/img4.png"
import CImage5 from "../../assets/images/img5.png"

import About from "../About"
import OurValues from "./OurValues"
import Marquee from "../common/Marquee"
import Team from '../Team'
import Consultation from "../Navigation/Footer/Consultation"
import CompanyBlog from "./CompanyBlog"
import { useEffect } from 'react'


function LandingPage() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  let images = [CImage1, CImage2, CImage3, CImage4, CImage5]

  return (
    <main className="landing-page-wrapper">
      <div className="landing-carousel-wrapper">
        <CarouselComponent images={images} blurred={true}>
          <h1>Хедж-фонд</h1>
          <p>Классический выбор профессиональных инвесторов с заданными умеренными параметрами риска. Основан на инвестировании в бумаги индекса S&P 500 с диверсификацией по 11 секторам экономики.</p>
          <button className="warning-btn">
            Подробнее
          </button>
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
  )
}

export default LandingPage;
