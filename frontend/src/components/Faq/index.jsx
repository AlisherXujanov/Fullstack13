import "./style.scss";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/icons/search.png";
import DetailsCustom from "./DetailsCustom";
import { useTranslation } from 'react-i18next'
function Faq() {
  const {t} = useTranslation()

  const data = [
    {
      id: 1,
      title: t("faq.content.item-1.title"),
      description: t("faq.content.item-1.desc"),
    },
    {
      id: 2,
      title: t("faq.content.item-2.title"),
      description: t("faq.content.item-2.desc"),
    },
    {
      id: 3,
      title: t("faq.content.item-3.title"),
      description: t("faq.content.item-3.desc"),
    },
    {
      id: 4,
      title: t("faq.content.item-4.title"),
      description: t("faq.content.item-4.desc"),
    },
  ];
  return (
    <div className="content_h1_faq">
      <span className="name_faq">FAQ</span>
      <h1 className="h1_faq">{t('faq.title')}</h1>
      <p className="faq_about">
        {t('faq.desc')}
      </p>
      <div className="searchbar">
        <div className="left">
          <img src={SearchIcon} alt="Search" />
        </div>
        <div className="right">
          <input type="search" placeholder={t('faq.input')} />
        </div>
      </div>
      <div className="content_navigate">
        <div className="content_navigate_container_for_link1 content_navigate_container_for_link">
          <NavLink to="/" className="content_navigate_link">
            {t('faq.general')}
          </NavLink>
        </div>
        <div className="content_navigate_container_for_link2 content_navigate_container_for_link">
          <NavLink to="/products" className="content_navigate_link">
          {t('faq.nft-product')}
          </NavLink>
        </div>
        <div className="content_navigate_container_for_link3 content_navigate_container_for_link">
          <NavLink to="/contacts" className="content_navigate_link">
          {t('faq.payment')}
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

