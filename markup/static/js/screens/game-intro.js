import GameIntroView from '../view/game-intro-view.js';
import gamePlay from "./game-play.js";
import { changeScreen } from "../mangment-dom.js";


export default () => {
    const introScreen = new GameIntroView();
    introScreen.nextScreen = () => {
        changeScreen(gamePlay());
    }

    return introScreen.element;
}
