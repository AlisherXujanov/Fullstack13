import "./style.scss"
import Heading from "../common/Heading"
import ImageAbout from "../../assets/images/programmer.jpg"
import ImageAbout2 from "../../assets/images/programmer2.jpg"
import { TbLicense } from "react-icons/tb"
import { useEffect } from 'react'
import Lycence from "../../assets/images/certificates/second.png"
import { useContext } from "react"
import { globalContext } from "../../store/index.js"


function About() {
  const state = useContext(globalContext)

  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <main className="about-page-wrapper">
      <Heading size={1.4}>О нас</Heading>

      <div className="content-wrapper">
        <img src={ImageAbout} alt="ImageAbout" width={"100%"} height={450} />

        <div className="info">
          <p>Наша команда Fullstack13 – это не просто коллектив, это настоящий отряд героев, готовых покорять любые инвестиционные вершины. Глава Алишер всегда держит руку на пульсе, давая стратегические указания, а AkerFer и Ойбеки без устали оптимизируют и масштабируют. Когда ночь спускается на код, на помощь приходит Batman — никто не знает, когда он спит, но все знают, что он спасет проект в самый неожиданный момент. </p>
          <p>Кореец всегда в деле, кодит с такой скоростью, что иногда за ним даже не успевает клавиатура. А когда нужно найти сложное решение — тут на сцену выходит Главный мозг: он видит все, как в «Матрице», и находит выход из любой ситуации. Ятолькочтопришел — настоящий мастер неожиданных решений: пришел, увидел, написал код и оставил всех в шоке. А Egypt всегда на передовой, как настоящий египетский герой, готовый сразиться с любыми багами.
          И конечно, Шерка — наш загадочный талисман, который, кажется, всегда знает что-то важное, но никогда не говорит заранее, держит интригу до последнего.
          </p>
          <p>Мы, Fullstack13, создаем такие решения, что даже компьютерные вирусы обходят нас стороной. Вместе мы не просто работаем — мы завоевываем новые рубежи в мире IT и инвестиций... с легкостью и хорошим настроением!</p>
          <a className="warning-btn" href={Lycence} download={"Lycence"} style={{ display: "inline-block"}}>
            <TbLicense /> Лицензии
          </a>

        </div>
      </div>
    <div className="languages-section">
      <h2>Наша команда Fullstack13 изучает следующие языки и фреймворки:</h2>
      <div className="languages-grid">
          <div className="language-card python"></div>
          <div className="language-card javascript"></div>
          <div className="language-card django"></div>
          <div className="language-card rest"></div>
          <div className="language-card react"></div>
      </div>

    </div>

    <div class="second-about-page-wrapper">
    <div class="second-about">
        <h2>Миссия и Ценности</h2>
        <p><strong>Наша миссия</strong> — покорять просторы веб-программирования, превращая строки кода в искусные решения. Мы стремимся не просто изучать языки программирования, а мастерски ими владеть, создавая веб-приложения, которые станут неотъемлемой частью цифрового мира. Вместе мы строим мост между идеями и их воплощением, применяя передовые технологии и неизменную страсть к развитию.</p>
        <p><strong>Наши ценности</strong> — это бесконечное любопытство, жажда знаний и желание делиться ими. Мы верим, что великие программисты не просто пишут код, они раздвигают границы возможного, создавая что-то уникальное и полезное. Вдохновленные новыми вызовами, мы растем с каждым проектом и каждым успешным запуском.</p>
    </div>
    <div class="about-image-second">
        <img src={ImageAbout2} alt="ImageAbout2" width={"100%"} height={450} />
    </div>
   </div>

    </main>
  );
}

export default About;