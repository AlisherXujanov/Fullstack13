import Heading from "../common/Heading"
import BagImage from "../../assets/icons/bag.png"
import DiamondImage from "../../assets/icons/diamond.png"
import HandShakeImage from "../../assets/icons/handShake.png"
import GraphImage from "../../assets/icons/graph.png"
import { useTranslation } from "react-i18next";

function OurValues(props) {

    const { t } = useTranslation()

    return (
        <div className="values-section-wrapper">
            <Heading size={1.2}>{t('values.title')}</Heading>

            <div className="content">
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={DiamondImage} alt="" />
                    <div className="right">
                        <h1>{t('values.content.item-1.title')}</h1>
                        <p>{t('values.content.item-1.desc')}</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={GraphImage} alt="" />
                    <div className="right">
                    <h1>{t('values.content.item-2.title')}</h1>
                    <p>{t('values.content.item-2.desc')}</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={BagImage} alt="" />
                    <div className="right">
                    <h1>{t('values.content.item-3.title')}</h1>
                    <p>{t('values.content.item-3.desc')}</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
                <div className="value">
                    <img src={HandShakeImage} alt="" />
                    <div className="right">
                    <h1>{t('values.content.item-4.title')}</h1>
                    <p>{t('values.content.item-4.desc')}</p>
                    </div>
                </div>
                {/* ----------------------------------------------- */}
            </div>
        </div>
    );
}

export default OurValues;