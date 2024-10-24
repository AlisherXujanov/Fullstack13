import "./style.scss"
import Heading from "../common/Heading"
import ImageAbout from "../../assets/images/programmer.jpg"
import ImageAbout2 from "../../assets/images/programming2.jpg"
import { TbLicense } from "react-icons/tb"
import { useEffect } from 'react'
import Lycence from "../../assets/images/certificates/second.png"
import { useContext } from "react"
import { globalContext } from "../../store/index.js"
import { useTranslation } from "react-i18next";



function About() {
  const state = useContext(globalContext)
  const {t} = useTranslation()
  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <main className="about-page-wrapper">
      <Heading size={1.4}>{t('navigation.about-us')}</Heading>

      <div className="content-wrapper">
        <img src={ImageAbout} alt="ImageAbout" width={"100%"} height={450} />

        <div className="info">
          <p>{t('about-us.info.0')}</p>
          <p>{t('about-us.info.1')}</p>
          <p>{t('about-us.info.2')}</p>
          <a className="warning-btn" href={Lycence} download={"Lycence"} style={{ display: "inline-block" }}>
            <TbLicense /> {t('about-us.licenses')}
          </a>

        </div>
      </div>

      <div className="second-about-page-wrapper">
        <div className="second-about">
          <h2>{t('about-us.mission-values.title')}</h2>
          <p><strong>{t('about-us.mission-values.mission.title')}</strong> — {t('about-us.mission-values.mission.desc')}</p>
          <p><strong>{t('about-us.mission-values.values.title')}</strong> — {t('about-us.mission-values.values.desc')}</p>
        </div>
        <div className="about-image-second">
          <img src={ImageAbout2} alt="ImageAbout2" />
        </div>
      </div>

      <div className="languages-section">
        <h2>{t('about-us.stack')}:</h2>
        <div className="languages-grid">
          <div className="language-card python"></div>
          <div className="language-card javascript"></div>
          <div className="language-card django"></div>
          <div className="language-card rest"></div>
          <div className="language-card react"></div>
        </div>
      </div>
    </main>
  );
}

export default About;