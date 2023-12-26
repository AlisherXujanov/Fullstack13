import "./style.scss"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// <CarouselComponent  images={[..., ..., ...]} />

function CarouselComponent(props) {
    return (
        <div className="carousel-c-wrapper">
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                {
                    props.images && props.images.map((img, index) => {
                        return (            
                            <div key={index}>
                                <img 
                                    src={img} 
                                    alt={"Carousel-img-" + index} 
                                    width={"100%"}
                                    height={600}
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