// import { renderTemplate, changeScreen } from "../mangment-dom.js";
// import gamePlay from "./game-play.js";

// const template = `
// <div class="game__end">
//     <img src="./static/img/general/Group 2.png" srcset="./static/img/general/Group 2.png 1x, ./static/img/general/Group 2@2x.png 2x" alt="">
//     <h2 class="game__title game__title_final-score">Поздравляем!<br>Ваш итоговый счет: <span id="final-score">0</span></h2>
//     <button class="btn" id="play-again">Еще раз</button>
// </div>
// `;

// export default () => {
//     const element = renderTemplate(template);
//     const btn = element.querySelector(`#play-again`);

//     const onClickBtn = () => {
//         changeScreen(gamePlay());
//     };
//     btn.addEventListener(`click`, onClickBtn);

//     return element;
// };

import AbstractView from '../clases/Abstract-view.js';

export default class GameIntro extends AbstractView {
    constructor(state) {
        super();
        this._state = state;
        this._score = 100;
    }

    get template() {
        return `
                <div class="game__end">
                    <img src="./static/img/general/Group 2.png" srcset="./static/img/general/Group 2.png 1x, ./static/img/general/Group 2@2x.png 2x" alt="">
                    <h2 class="game__title game__title_final-score">Поздравляем!<br>Ваш итоговый счет: <span id="final-score">${this._score}</span></h2>
                    <button class="btn" id="play-again">Еще раз</button>
                </div>
                `;
    }

    nextScreen() { }

    bind() {
        const btn = this.element.querySelector(`#play-again`);

        const onClickBtn = () => {
            this.nextScreen();
        }

        btn.addEventListener(`click`, onClickBtn);
    }
}
