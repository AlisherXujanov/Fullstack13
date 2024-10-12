import "./style.scss";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.png";
import DetailsCustom from "./DetailsCustom";

function Faq() {
  return (
    <div className="content_h1_faq">
      <span className="name_faq">FAQ</span>
      <h1 className="h1_faq">Frequently asked questions</h1>
      <p className="faq_about">
        Here, you`ll find answers to the most commonly asked questions about our
        <br /> products, services, and policies.
      </p>
      <div className="searchbar">
        <div className="left">
          <img src={SearchIcon} alt="Search" />
        </div>
        <div className="right">
          <input type="search" placeholder="Search your ask" />
        </div>
      </div>
      <div className="content_navigate">
        <div className="content_navigate_container_for_link1 content_navigate_container_for_link">
          <NavLink to="/" className="content_navigate_link">
            General
          </NavLink>
        </div>
        <div className="content_navigate_container_for_link2 content_navigate_container_for_link">
          <NavLink to="/products" className="content_navigate_link">
            NFT Product
          </NavLink>
        </div>
        <div className="content_navigate_container_for_link3 content_navigate_container_for_link">
          <NavLink to="/contacts" className="content_navigate_link">
            Payment
          </NavLink>
        </div>
      </div>
      <div className="toggler-container">
        {data.map((element) => (
          <DetailsCustom
            elementStyle="toggle-button"
            key={element.id}
            description={element.description}
            title={element.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Faq;

const data = [
  {
    id: 1,
    title: "What is an NFT marketplace?",
    description:
      " An NFT marketplace is a platform that allows users to buy, sell, and trade non-fungible tokens (NFTs).NFTs are unique digital assets that can represent anything from artwork and collectibles to in-game items and virtual real estate.",
  },
  {
    id: 2,
    title: "  How does buying an NFT work?",
    description:
      "Buying an NFT involves creating an account on a marketplace, connecting a digital wallet, and then purchasing the NFT using cryptocurrency.",
  },
  {
    id: 3,
    title: "What are the benefits of owning an NFT?",
    description:
      " Owning an NFT can provide benefits such as proof of ownership, the potential for value appreciation, and exclusive access to certain content or experiences.",
  },
  {
    id: 4,
    title: "Are there any risks associated with buying NFTs?",
    description:
      "Yes, buying NFTs carries risks such as market volatility, potential scams, and the lack of regulation in the NFT space.",
  },
];
