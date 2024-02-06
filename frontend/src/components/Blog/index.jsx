import "./style.scss"
import Heading from "../common/Heading"
import Blog1 from "../../assets/images/blog-1.png"
import Blog2 from "../../assets/images/blog-2.png"
import Blog3 from "../../assets/images/blog-3.png"
import Blog4 from "../../assets/images/img1.png"
import Blog5 from "../../assets/images/img2.png"
import Blog6 from "../../assets/images/img3.png"
import BlogJSON from '../../db/blog.json'
import { get_blog_img_index } from '../../store/helpers.js'
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";


function Blog(props) {
    const { t } = useTranslation();
    const images = [Blog6, Blog1, Blog2, Blog3, Blog4, Blog5]

    return (
        <div id="blog-wrapper">
            <div style={{ padding: "0 0 20px 20px" }}>
                <Heading size={2} >
                    {t("navbar.blog")}
                </Heading>
            </div>

            {
                BlogJSON.map((blog, index) => {
                    return (
                        <div className="content" key={index}>
                            <div className="left">
                                <img src={images[get_blog_img_index(blog.id, images.length)]}
                                    alt="Blog" width={"100%"} height={300} />
                            </div>
                            <div className="right">
                                <h4>Менеджемент</h4>
                                <h2>{blog.title}</h2>
                                <h4 className="author">
                                    <span className="name">{blog.author}, </span>
                                    <span className="date">{blog.date}</span>
                                </h4>
                                <p>
                                    {blog.subtitle1}
                                </p>
                                <Link to={"/blog/" + blog.id}>
                                    <button className="warning-btn">
                                        Подробнее
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Blog;