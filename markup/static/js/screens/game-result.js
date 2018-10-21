import GameResultView from '../view/game-result-view.js';
import gamePlay from "./game-play.js";
import { changeScreen } from "../mangment-dom.js";

export default (state) => {
    const resultScreen = new GameResultView(state);
    resultScreen.nextScreen = () => {
        changeScreen(gamePlay());
    };

    return resultScreen.element;
}
