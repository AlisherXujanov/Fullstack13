import "./style.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// <CarouselComponent  images={[..., ..., ...]}  blurred={true} />

function CarouselComponent(props) {

    const imgStyle = {
        filter: props.blurred ? "grayscale(100%) brightness(0.4)" : "none"
    }

    return (
        <div className="carousel-c-wrapper">
            <div className="carousel-c-children">
                {props.children}
            </div>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
                {
                    props.images && props.images.map((img, index) => {
                        return (            
                            <div key={index}>
                                <img 
                                    src={img} 
                                    alt={"Carousel-img-" + index} 
                                    width={"100%"}
                                    height={600}
                                    style={imgStyle}
                                />
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    );
}

export default CarouselComponent;