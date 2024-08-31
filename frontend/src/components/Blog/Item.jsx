import blogImg1 from "../../assets/images/blog-1.png";
import blogImg2 from "../../assets/images/blog-2.png";
import blogImg3 from "../../assets/images/blog-3.png";
import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import { Link } from "react-router-dom";

export default function Item(props) {
  let images = [blogImg1, blogImg2, blogImg3, img1, img2];

  return (
    <>
      <img src={images[props.item.id % images.length]} />
      <div className="info">
        <p>Менеджемент</p>
        <h2>{props.item.title}</h2>
        <div className="author">
          <span className="name">{props.item.author},</span>
          <span className="date">{props.item.date}</span>
        </div>
        <p className="subtitle1">{props.item.subtitle1}</p>

        <Link to={"/blog/" + props.item.id} className="link">
          Подробнее &rArr;
        </Link>
      </div>
    </>
  );
}
