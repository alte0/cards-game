import { renderTemplate, changeScreen, deleteElement } from "../mangment-dom/mangment-dom.js";
// import gameResult from "../../components/game-result/game-result.js";
// changeScreen(gameResult());
const template = `
<div class="game__play">
    <div class="game__play-header">
        <button class="btn btn_start-over" id="play-start-over">Начать заново</button>
        <span class="game__score">Очки:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="game__score" id="score">0</span>
    </div>
    <div class="game__wrap-cards">
        <div class="card card__0C"></div>
        <div class="card card__0D"></div>
        <div class="card card__0H"></div>
        <div class="card card__0S"></div>
        <div class="card card__outside"></div>
        <div class="card card__2D"></div>
        <div class="card card__5D"></div>
        <div class="card card__6D"></div>
        <div class="card card__3D"></div>
        <div class="card card__8D"></div>
        <div class="card card__9D"></div>
        <div class="card card__2D"></div>
        <div class="card card__QD"></div>
        <div class="card card__QD"></div>
        <div class="card card__8D"></div>
        <div class="card card__4D"></div>
        <div class="card card__4D"></div>
        <div class="card card__6D"></div>
    </div>
</div>
`;
const templateCard = `<div class="card card__0S"></div>`;

export default () => {
    const element = renderTemplate(template);
    const btn = element.querySelector(`#play-start-over`);
    const cardsWrap = element.querySelector(`.game__wrap-cards`);
    const cards = element.querySelectorAll(`.card`);

    const onClickBtn = () => {
        while(cardsWrap.lastChild) {
            deleteElement(cardsWrap, cardsWrap.lastChild);
        }
        cardsWrap.appendChild(renderTemplate(templateCard));
    };
    btn.addEventListener(`click`, onClickBtn);

    return element;
};

