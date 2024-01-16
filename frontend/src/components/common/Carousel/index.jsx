import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './style.scss'

function CarouselComponent(props) {
    // <CarouselComponent images={...} />

    const imageStyle = {
        filter: props.blurred ? `grayscale(100%) brightness(0.5)` : "none"
    }
    return (
        <Carousel 
            showThumbs={false} 
            autoPlay={true} 
            infiniteLoop={true}
            showStatus={false}
        >
            {
                props.images?.map((image, index) => {
                    return (
                        <div key={index}>
                            <img 
                                style={imageStyle}
                                src={image} alt="Slide" 
                                height={600} 
                                width={"100%"} 
                            />
                        </div>
                    )
                })
            }
        </Carousel>
    );
}

export default CarouselComponent;