import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './style.scss'

function CarouselComponent(props) {
    // <CarouselComponent images={...} />
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