import AbstractView from '../clases/Abstract-view.js';
import { renderTemplate, deleteElement } from "../mangment-dom.js";
export default class GameIntro extends AbstractView {
    constructor() {
        super();
    }

    get template() {
        return `
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
    }

    templateCard(className) {
        return `<div class="card ${className}"></div>`;
    }

    nextScreen() { }

    _restartGame(element) {
        while (element.lastChild) {
            deleteElement(element, element.lastChild);
        }
        element.appendChild(renderTemplate(this.templateCard("fg")));
     }

    bind() {
        const btn = this.element.querySelector(`#play-start-over`);
        const cardsWrap = this.element.querySelector(`.game__wrap-cards`);

        const onClickBtn = () => {
            this._restartGame(cardsWrap);
        }

        btn.addEventListener(`click`, onClickBtn);
    }
}


