import { renderTemplate, changeScreen } from "./mangment-dom.js";
import gamePlay from "./game-play.js";

const template = `
<div class="game__intro">
    <img src="./static/img/general/StartGame.png" srcset="./static/img/general/StartGame.png 1x, ./static/img/general/StartGame@2x.png 2x" alt="Картинка карт">
    <h1 class="game__title">Memory Game</h1>
    <button class="btn" id="play">Начать игру</button>
</div>
`;

export default () => {
    const element = renderTemplate(template);
    const btn = element.querySelector(`#play`);

    const onClickBtn = () => {
        changeScreen(gamePlay());
    }
    btn.addEventListener(`click`, onClickBtn);

    return element;
}
