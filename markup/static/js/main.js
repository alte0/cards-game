'use strict';

/*
    This file can be used as entry point for webpack!
 */
import { changeScreen } from '../../components/mangment-dom/mangment-dom.js'
import gameIntro from '../../components/game-intro/game-intro.js'
import gamePlay from "../../components/game-play/game-play.js";

changeScreen(gamePlay());
