import valuesData from '../../db/values.json'
import Bag from "../../assets/icons/bag.png"
import Diamond from "../../assets/icons/diamond.png"
import Graph from "../../assets/icons/graph.png"
import HandShake from "../../assets/icons/handShake.png"
import ValueItem from "./ValueItem.jsx"

function Values(props) {
    const images = [Diamond, Graph, Bag, HandShake]

    return (
        <div className="values-wrapper">
            {
                valuesData && valuesData.map((item, index) => {
                    return (
                        <ValueItem 
                            key={index}
                            image={images[index]}
                            title={item.title}
                            subtitle={item.subtitle}
                        />
                    )
                })
            }
        </div>
    );
}

export default Values;