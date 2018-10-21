import GamePlayView from '../view/game-play-view.js';
import gamePlay from "./game-play.js";
import { changeScreen } from "../mangment-dom.js";


export default () => {
    const gameScreen = new GamePlayView();
    gameScreen.nextScreen = () => {
        changeScreen(gamePlay());
    }

    return gameScreen.element;
}

