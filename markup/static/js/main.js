/*
    This file can be used as entry point for webpack!
 */
import { changeScreen } from './mangment-dom.js'
import gameIntro from "./screens/game-intro.js";
import gamePlay from "./screens/game-play.js";
import gameResult from "./screens/game-result.js";

changeScreen(gamePlay());
