import valuesData from '../../db/values.json'
import Bag from "../../assets/icons/bag.png"
import Diamond from "../../assets/icons/diamond.png"
import Graph from "../../assets/icons/graph.png"
import HandShake from "../../assets/icons/handShake.png"


function Values(props) {
    const images = [Diamond, Graph, Bag, HandShake]

    return (
        <div className="values-wrapper">
            <div className="value-item">
                <span></span>
                <img src={images[0]} alt="Value" />
                <div className='value-info'>
                    <h2>{valuesData[0].title}</h2>
                    <p>{valuesData[0].subtitle}</p>
                </div>
            </div>
        </div>
    );
}

export default Values;