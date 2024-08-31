import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BlogJSON from '../../db/blog.json'
import './blogDetails.scss'

import BlogImg1 from "../../assets/images/blog-1.png"
import BlogImg2 from "../../assets/images/blog-2.png"
import BlogImg3 from "../../assets/images/blog-3.png"
import BlogImg4 from "../../assets/images/img3.png"
import BlogImg5 from "../../assets/images/img5.png"


export default function BlogDetails(props) {
  const { id } = useParams();
  const images = [BlogImg1, BlogImg2, BlogImg3, BlogImg4, BlogImg5]
  const blogObject = BlogJSON.find(blog => blog.id === parseInt(id))

  function goToTopSmoothly() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  let intro = blogObject.title.split(" ").slice(0, 3).join(" ")
  let image = images[parseInt(id) % images.length]

  useEffect(() => {
    goToTopSmoothly()
    document.title = intro + "..."
  }, [])


  return (
    <div className="blog-details-wrapper">
      <p className='intro'>Блог/{intro}</p>

      <h1 className='title'>{blogObject.title}</h1>

      <p className='author-info'>
        <span className='author'>{blogObject.author}</span>,
        <span className='date'>{blogObject.date}</span>
      </p>

      <img src={image} width={"100%"} height={400} />

      <p className='subtitle-1'>{blogObject.subtitle1}</p>
      <p className='subtitle-2'>{blogObject.subtitle2}</p>


      <div className="other">
        <h2>Интересное по теме</h2>
        <div className="row">
          <div className="col">
            <h2>Рэй Далио перестал считать наличные «мусором»</h2>
            <a href="#">Подробнее &rArr; </a>
          </div>
          <div className="col">
            <h2>Инвестиции в 5G – необходимое условие экономического развития</h2>
            <a href="#">Подробнее &rArr; </a>
          </div>
        </div>
      </div>
    </div>
  )
}
