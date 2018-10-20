'use strict';

/*
    This file can be used as entry point for webpack!
 */
import { changeScreen } from './mangment-dom.js'
import gameIntro from './game-intro.js'
import gamePlay from "./game-play.js";

changeScreen(gamePlay());
