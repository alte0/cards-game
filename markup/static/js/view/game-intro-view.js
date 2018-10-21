import AbstractView from '../clases/Abstract-view.js';

export default class GameIntro extends AbstractView {
    constructor() {
        super();
    }

    get template () {
        return `
                <div class="game__intro">
                    <img src="./static/img/general/StartGame.png" srcset="./static/img/general/StartGame.png 1x, ./static/img/general/StartGame@2x.png 2x" alt="Картинка карт">
                    <h1 class="game__title">Memory Game</h1>
                    <button class="btn" id="play">Начать игру</button>
                </div>
                `;
    }

    nextScreen() { }

    bind () {
        const btn = this.element.querySelector(`#play`);

        const onClickBtn = () => {
            this.nextScreen();
        }

        btn.addEventListener(`click`, onClickBtn);
    }
}
