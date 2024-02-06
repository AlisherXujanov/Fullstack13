import valuesDB from "../../db/values.json"
import "./style.scss"
import Heading from "../common/Heading"
import Diamond from "../../assets/icons/diamond.png"
import Bag from "../../assets/icons/bag.png"
import Graph from "../../assets/icons/graph.png"
import HandShake from "../../assets/icons/handShake.png"
import ValueItem from "./ValueItem.jsx"

import { useTranslation } from "react-i18next";


function Values() {
    const { t } = useTranslation();
    const imgs = [Diamond, Graph, Bag, HandShake]
    return (
        <div className="values-wrapper">
            <Heading size={2}>
                {t("headings.ourValues")}
            </Heading>

            <div className="values-content">
                {
                    valuesDB.map((item, index) => {
                        return (
                            <ValueItem 
                                key={index}
                                image={imgs[index]}
                                title={item.title}
                                subtitle={item.subtitle}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Values;