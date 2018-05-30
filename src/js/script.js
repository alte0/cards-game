(function(){

  var BLOCK_GAME_START = document.querySelector('.game__start');
  var BLOCK_GAME_PLAY = document.querySelector('.game__play');
  var BLOCK_GAME_END = document.querySelector('.game__end');
  var BTN_PLAY = document.querySelector('#play');
  var BTN_PLAY_AGAIN = document.querySelector('#play-again');
  var BTN_PLAY_START_OVER = document.querySelector('#play-start-over');
  var CARDS_ARRAY = ['0','2','3','4','5','6','7','8','9','J','A','K','Q'];
  var CARDS_ARRAY_STR = ['C', 'D', 'H', 'S'];
  var CARDS_CONTAINER = document.querySelector('.game__play-cards');
  var counterMatchedCard = 0;
  var counterCheckCard = 0;
  var points = 0;
  var cardLeft;
  var SCORE = document.querySelector('#score');
  var MULTIPLIED_NUM = 42;
  var ALL_CARDS_NUM = 18;
  var FINAL_SCORE = document.querySelector('#final-score');

  var invertOpeningCard = function () {
    var cards = document.querySelectorAll('.card');

    [].forEach.call(cards, function (item) {
      if (!item.classList.contains('card__outside')) {
        item.classList.toggle('card__outside');
      }
    });
    counterCheckCard = 0;
    CARDS_CONTAINER.addEventListener('click', clickCardHandler);
  }

  var deleteOpenCards = function () {
    var element = document.querySelector('.card[data-open="true"]');
    while (element !== null) {
      var parentEl = element.parentElement;
      parentEl.removeChild(element);
      element = document.querySelector('.card[data-open="true"]');
    }
  };

  var checkOpenCard = function () {
    var cards = document.querySelectorAll('.card[data-open="true"]');
    var card1 = cards[0].className.substring(5);
    var card2 = cards[1].className.substring(5);
    if (card1 === card2) {
      setTimeout(deleteOpenCards, 2000);
      counterCheckCard = 0;
      CARDS_CONTAINER.addEventListener('click', clickCardHandler);
      counterMatchedCard +=2;
      setTimeout(clickCardRemainingHandler, 2500);
      setTimeout(function(){
        points = points + cardLeft * MULTIPLIED_NUM;
        SCORE.textContent = points;
        FINAL_SCORE.textContent = points;
      }, 2500);
    } else {
      setTimeout(invertOpeningCard, 2000);
      [].forEach.call(cards, function(item){
        item.setAttribute('data-open', 'false');
      });
      cardLeft = CARDS_CONTAINER.childNodes.length;
      points = points - (ALL_CARDS_NUM - cardLeft) * MULTIPLIED_NUM;
      SCORE.textContent = points;
      FINAL_SCORE.textContent = points;
    }
  };

  var clickCardHandler = function (evt) {
    var target = evt.target;

    while (target !== CARDS_CONTAINER) {
      if (target.classList.contains("card")) {
        target.classList.toggle('card__outside');
        target.setAttribute('data-open', 'true');
        counterCheckCard++;
        if (counterCheckCard === 2) {
          CARDS_CONTAINER.removeEventListener('click', clickCardHandler);
          checkOpenCard();
        }
      }
      target = target.parentNode;
    }
  };

  var clickCardRemainingHandler = function () {
    cardLeft = CARDS_CONTAINER.childNodes.length;
    console.log(cardLeft);
    if (cardLeft === 0) {
      BLOCK_GAME_PLAY.classList.toggle('game__play_d-none');
      BLOCK_GAME_END.classList.toggle('game__end_d-none');
    }
  };
  
  var clickPlayHandler = function () {
    BLOCK_GAME_START.classList.toggle('game__start_d-none');
    BLOCK_GAME_PLAY.classList.toggle('game__play_d-none');
    renderCards();
    cardsRotate();
    BTN_PLAY_START_OVER.addEventListener('click', clickPlayStartOverHandler);
  };
  
  var clickPlayAgainHandler = function () {
    BLOCK_GAME_PLAY.classList.toggle('game__play_d-none');
    BLOCK_GAME_END.classList.toggle('game__end_d-none');
    renderCards();
    cardsRotate();
  };

  var clickPlayStartOverHandler = function () {
    while (CARDS_CONTAINER.lastElementChild) {
      CARDS_CONTAINER.removeChild(CARDS_CONTAINER.lastElementChild);
    }
    renderCards();
    cardsRotate();
    points = 0;
    SCORE.textContent = points;
  };

  var randomValueArray = function (array) {
    return Math.round(Math.random() * (array.length - 1));
  };

  var randonCards = function (array, array2) {
    var cardsResult = [];
    var cardsResultTemp = [];
    var cardsTemp = [];
    var randomValueCardsSuit = array2[randomValueArray(array2)];
    arrayCards = array.slice();

    for (var i = 0; i < 9; i++) {
      cardsTemp.push(arrayCards.splice(randomValueArray(arrayCards),1)[0]);
    }

    cardsTemp.forEach(function(item){
      for (var i = 0; i < 2; i++) {
        cardsResultTemp.push(item + randomValueCardsSuit);
      }
    });

    for (var i = 0; i < 18; i++) {
      cardsResult.push(cardsResultTemp.splice(randomValueArray(cardsResultTemp), 1)[0]);
    }
    
    return cardsResult;
  };

  var renderCards = function () {
    var fragment = document.createDocumentFragment();
    var cardsResult = randonCards(CARDS_ARRAY, CARDS_ARRAY_STR);
    cardsResult.forEach(function(item){
      var element = document.createElement('div');
      element.classList.add('card');
      element.classList.add('card__' + item);
      fragment.appendChild(element);
    });
    CARDS_CONTAINER.appendChild(fragment);
  };

  var cardsRotate = function () {
    var cards = document.querySelectorAll('.card');
    setTimeout(function() {
      [].forEach.call(cards, function(item){
        item.classList.toggle('card__outside');
      });
      CARDS_CONTAINER.addEventListener('click', clickCardHandler);
    }, 5000);
  };

  BTN_PLAY.addEventListener('click', clickPlayHandler);
  BTN_PLAY_AGAIN.addEventListener('click', clickPlayAgainHandler);


})();
