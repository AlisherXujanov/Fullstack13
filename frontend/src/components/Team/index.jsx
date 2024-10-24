import { useEffect, useState } from "react";
import Heading from "../common/Heading";
import "./style.scss";
import firstImage from "../../assets/images/1.png";
import secondImage from "../../assets/images/2.png";
import thirdImage from "../../assets/images/3.webp";
import fourthImage from "../../assets/images/4.webp";
import fiveImage from "../../assets/images/5.png";
import sixImage from "../../assets/images/6.webp";
import Member from "./Member";
import { useTranslation } from "react-i18next";

function Team(props) {
  const {t} = useTranslation()
  function goToTopSmoothly() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    document.title = "Team Members";
    goToTopSmoothly();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", description: "", image: "",conection: "" });

  const openModal = (title, description,image,conection) => {
    setModalContent({ title, description,image,conection });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="team-page-wrapper">
      <div className="text-wrapper">
        <div className="team-section">
          <h2>
            <Heading size={1.2}>{t('team.title')}</Heading>
          </h2>
          <p className="team-intro">
          {t('team.desc')}
          </p>

          <ul className="team-list">
            <li>
              <h3>{t('team.content.item-1.title')}</h3>
              <p>{t('team.content.item-1.desc')}</p>
            </li>
            <li>
            <h3>{t('team.content.item-2.title')}</h3>
            <p>{t('team.content.item-2.desc')}</p>
            </li>
            <li>
            <h3>{t('team.content.item-3.title')}</h3>
            <p>{t('team.content.item-3.desc')}</p>
            </li>
            <li>
            <h3>{t('team.content.item-4.title')}</h3>
            <p>{t('team.content.item-4.desc')}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className={props.grayscale ? "all-members-wrapper grayscale" : "all-members-wrapper"}>
          <Member
            image={firstImage}
            alt="Image 1"
            name="Алишер Худжанов"
            title="CFO"
            onClick={() => openModal("Алишер Худжанов", "Алишер — ведущий веб-разработчик с более чем 10-летним опытом работы в разработке и управлении веб-проектами. Он специализируется на создании высоконагруженных веб-приложений и оптимизации производительности. Алишер также обладает экспертными знаниями в области front-end и back-end технологий, что позволяет ему эффективно управлять проектами и координировать команды.",firstImage,"https://github.com/AlisherXujanov")}
          />
          <Member
            image={secondImage}
            alt="Image 2"
            name="Azim0nt"
            title="CEO"
            onClick={() => openModal("Azim0nt", "Azim0nt — веб-разработчик с акцентом на создание интерактивных пользовательских интерфейсов. Он использует современные фреймворки и библиотеки, такие как React и Vue.js, для создания отзывчивых и удобных веб-приложений. Azim0nt постоянно следит за новыми трендами в веб-разработке, чтобы улучшать пользовательский опыт.",secondImage,"https://github.com/azim0nt")}
          />
          <Member
            image={thirdImage}
            alt="Image 3"
            name="Islom"
            title="CFO"
            onClick={() => openModal("Islom", "Islom — разработчик, специализирующийся на серверной части веб-приложений. Он имеет опыт работы с различными языками программирования и фреймворками, такими как Node.js и Django. Islom отлично справляется с задачами интеграции баз данных и обеспечением безопасности веб-приложений, что делает его незаменимым членом команды.",thirdImage,"https://github.com/Islom1214")}
          />
          <Member
            image={fourthImage}
            alt="Image 4"
            name="Max Batmanbek"
            title="CEO"
            onClick={() => openModal("Max Batmanbek", "Max — UI/UX-дизайнер, сосредоточенный на создании привлекательных и интуитивно понятных веб-интерфейсов. Его работа включает проектирование и оптимизацию пользовательского опыта на веб-сайтах и в веб-приложениях. Max стремится к тому, чтобы его дизайны не только хорошо выглядели, но и были функциональными.",fourthImage)}
          />
          <Member
            image={fiveImage}
            alt="Image 5"
            name="Леша"
            title="CFO"
            onClick={() => openModal("Леша", "Леша — специалист по веб-аналитике, который помогает команде принимать обоснованные решения, основываясь на данных о поведении пользователей. Он использует инструменты аналитики для сбора и интерпретации данных, чтобы оптимизировать веб-приложения и улучшить пользовательский опыт. Леша также участвует в тестировании и анализе эффективности веб-продуктов.",fiveImage)}
          />
          <Member
            image={sixImage}
            alt="Image 6"
            name="Шнурок"
            title="CFO"
            onClick={() => openModal("Шнурок", "Шнурок — веб-разработчик с опытом работы в области front-end и back-end разработки. Он отвечает за реализацию новых функций и исправление ошибок на веб-сайтах и в веб-приложениях. Шнурок также уделяет внимание кроссбраузерной совместимости и адаптивному дизайну, что обеспечивает качественный опыт для пользователей на всех устройствах.",sixImage)}
          />
        </div>

        {isModalOpen && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>{modalContent.title}</h2>
              <p>{modalContent.description}</p>
              <a href={modalContent.conection}>github</a>
              <img src={modalContent.image} alt={modalContent.title} style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          </div>
        )}
      </div>

      <div className="section">
        <Heading size={1.2}>{t('team.supporters-partners')}</Heading>
        <br />
        <div className="infos">
          <h2>SeedBox</h2>
          <h2>Freedom Finance</h2>
        </div>
      </div>
    </main>
  );
}

export default Team;