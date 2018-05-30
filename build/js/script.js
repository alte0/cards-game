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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcclxuXHJcbiAgdmFyIEJMT0NLX0dBTUVfU1RBUlQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fc3RhcnQnKTtcclxuICB2YXIgQkxPQ0tfR0FNRV9QTEFZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX3BsYXknKTtcclxuICB2YXIgQkxPQ0tfR0FNRV9FTkQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fZW5kJyk7XHJcbiAgdmFyIEJUTl9QTEFZID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXknKTtcclxuICB2YXIgQlROX1BMQVlfQUdBSU4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1hZ2FpbicpO1xyXG4gIHZhciBCVE5fUExBWV9TVEFSVF9PVkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXktc3RhcnQtb3ZlcicpO1xyXG4gIHZhciBDQVJEU19BUlJBWSA9IFsnMCcsJzInLCczJywnNCcsJzUnLCc2JywnNycsJzgnLCc5JywnSicsJ0EnLCdLJywnUSddO1xyXG4gIHZhciBDQVJEU19BUlJBWV9TVFIgPSBbJ0MnLCAnRCcsICdIJywgJ1MnXTtcclxuICB2YXIgQ0FSRFNfQ09OVEFJTkVSID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVfX3BsYXktY2FyZHMnKTtcclxuICB2YXIgY291bnRlck1hdGNoZWRDYXJkID0gMDtcclxuICB2YXIgY291bnRlckNoZWNrQ2FyZCA9IDA7XHJcbiAgdmFyIHBvaW50cyA9IDA7XHJcbiAgdmFyIGNhcmRMZWZ0O1xyXG4gIHZhciBTQ09SRSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZScpO1xyXG4gIHZhciBNVUxUSVBMSUVEX05VTSA9IDQyO1xyXG4gIHZhciBBTExfQ0FSRFNfTlVNID0gMTg7XHJcbiAgdmFyIEZJTkFMX1NDT1JFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbmFsLXNjb3JlJyk7XHJcblxyXG4gIHZhciBpbnZlcnRPcGVuaW5nQ2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XHJcblxyXG4gICAgW10uZm9yRWFjaC5jYWxsKGNhcmRzLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICBpZiAoIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkX19vdXRzaWRlJykpIHtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2NhcmRfX291dHNpZGUnKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb3VudGVyQ2hlY2tDYXJkID0gMDtcclxuICAgIENBUkRTX0NPTlRBSU5FUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGRlbGV0ZU9wZW5DYXJkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4gICAgd2hpbGUgKGVsZW1lbnQgIT09IG51bGwpIHtcclxuICAgICAgdmFyIHBhcmVudEVsID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICBwYXJlbnRFbC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkW2RhdGEtb3Blbj1cInRydWVcIl0nKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgY2hlY2tPcGVuQ2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkW2RhdGEtb3Blbj1cInRydWVcIl0nKTtcclxuICAgIHZhciBjYXJkMSA9IGNhcmRzWzBdLmNsYXNzTmFtZS5zdWJzdHJpbmcoNSk7XHJcbiAgICB2YXIgY2FyZDIgPSBjYXJkc1sxXS5jbGFzc05hbWUuc3Vic3RyaW5nKDUpO1xyXG4gICAgaWYgKGNhcmQxID09PSBjYXJkMikge1xyXG4gICAgICBzZXRUaW1lb3V0KGRlbGV0ZU9wZW5DYXJkcywgMjAwMCk7XHJcbiAgICAgIGNvdW50ZXJDaGVja0NhcmQgPSAwO1xyXG4gICAgICBDQVJEU19DT05UQUlORVIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuICAgICAgY291bnRlck1hdGNoZWRDYXJkICs9MjtcclxuICAgICAgc2V0VGltZW91dChjbGlja0NhcmRSZW1haW5pbmdIYW5kbGVyLCAyNTAwKTtcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIHBvaW50cyA9IHBvaW50cyArIGNhcmRMZWZ0ICogTVVMVElQTElFRF9OVU07XHJcbiAgICAgICAgU0NPUkUudGV4dENvbnRlbnQgPSBwb2ludHM7XHJcbiAgICAgICAgRklOQUxfU0NPUkUudGV4dENvbnRlbnQgPSBwb2ludHM7XHJcbiAgICAgIH0sIDI1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0VGltZW91dChpbnZlcnRPcGVuaW5nQ2FyZCwgMjAwMCk7XHJcbiAgICAgIFtdLmZvckVhY2guY2FsbChjYXJkcywgZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3BlbicsICdmYWxzZScpO1xyXG4gICAgICB9KTtcclxuICAgICAgY2FyZExlZnQgPSBDQVJEU19DT05UQUlORVIuY2hpbGROb2Rlcy5sZW5ndGg7XHJcbiAgICAgIHBvaW50cyA9IHBvaW50cyAtIChBTExfQ0FSRFNfTlVNIC0gY2FyZExlZnQpICogTVVMVElQTElFRF9OVU07XHJcbiAgICAgIFNDT1JFLnRleHRDb250ZW50ID0gcG9pbnRzO1xyXG4gICAgICBGSU5BTF9TQ09SRS50ZXh0Q29udGVudCA9IHBvaW50cztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgY2xpY2tDYXJkSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcclxuICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xyXG5cclxuICAgIHdoaWxlICh0YXJnZXQgIT09IENBUkRTX0NPTlRBSU5FUikge1xyXG4gICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNhcmRcIikpIHtcclxuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnY2FyZF9fb3V0c2lkZScpO1xyXG4gICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3BlbicsICd0cnVlJyk7XHJcbiAgICAgICAgY291bnRlckNoZWNrQ2FyZCsrO1xyXG4gICAgICAgIGlmIChjb3VudGVyQ2hlY2tDYXJkID09PSAyKSB7XHJcbiAgICAgICAgICBDQVJEU19DT05UQUlORVIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuICAgICAgICAgIGNoZWNrT3BlbkNhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdmFyIGNsaWNrQ2FyZFJlbWFpbmluZ0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYXJkTGVmdCA9IENBUkRTX0NPTlRBSU5FUi5jaGlsZE5vZGVzLmxlbmd0aDtcclxuICAgIGNvbnNvbGUubG9nKGNhcmRMZWZ0KTtcclxuICAgIGlmIChjYXJkTGVmdCA9PT0gMCkge1xyXG4gICAgICBCTE9DS19HQU1FX1BMQVkuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fcGxheV9kLW5vbmUnKTtcclxuICAgICAgQkxPQ0tfR0FNRV9FTkQuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fZW5kX2Qtbm9uZScpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgXHJcbiAgdmFyIGNsaWNrUGxheUhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBCTE9DS19HQU1FX1NUQVJULmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX3N0YXJ0X2Qtbm9uZScpO1xyXG4gICAgQkxPQ0tfR0FNRV9QTEFZLmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX3BsYXlfZC1ub25lJyk7XHJcbiAgICByZW5kZXJDYXJkcygpO1xyXG4gICAgY2FyZHNSb3RhdGUoKTtcclxuICAgIEJUTl9QTEFZX1NUQVJUX09WRVIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1BsYXlTdGFydE92ZXJIYW5kbGVyKTtcclxuICB9O1xyXG4gIFxyXG4gIHZhciBjbGlja1BsYXlBZ2FpbkhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBCTE9DS19HQU1FX1BMQVkuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fcGxheV9kLW5vbmUnKTtcclxuICAgIEJMT0NLX0dBTUVfRU5ELmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX2VuZF9kLW5vbmUnKTtcclxuICAgIHJlbmRlckNhcmRzKCk7XHJcbiAgICBjYXJkc1JvdGF0ZSgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBjbGlja1BsYXlTdGFydE92ZXJIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgd2hpbGUgKENBUkRTX0NPTlRBSU5FUi5sYXN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgIENBUkRTX0NPTlRBSU5FUi5yZW1vdmVDaGlsZChDQVJEU19DT05UQUlORVIubGFzdEVsZW1lbnRDaGlsZCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDYXJkcygpO1xyXG4gICAgY2FyZHNSb3RhdGUoKTtcclxuICAgIHBvaW50cyA9IDA7XHJcbiAgICBTQ09SRS50ZXh0Q29udGVudCA9IHBvaW50cztcclxuICB9O1xyXG5cclxuICB2YXIgcmFuZG9tVmFsdWVBcnJheSA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChhcnJheS5sZW5ndGggLSAxKSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHJhbmRvbkNhcmRzID0gZnVuY3Rpb24gKGFycmF5LCBhcnJheTIpIHtcclxuICAgIHZhciBjYXJkc1Jlc3VsdCA9IFtdO1xyXG4gICAgdmFyIGNhcmRzUmVzdWx0VGVtcCA9IFtdO1xyXG4gICAgdmFyIGNhcmRzVGVtcCA9IFtdO1xyXG4gICAgdmFyIHJhbmRvbVZhbHVlQ2FyZHNTdWl0ID0gYXJyYXkyW3JhbmRvbVZhbHVlQXJyYXkoYXJyYXkyKV07XHJcbiAgICBhcnJheUNhcmRzID0gYXJyYXkuc2xpY2UoKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDk7IGkrKykge1xyXG4gICAgICBjYXJkc1RlbXAucHVzaChhcnJheUNhcmRzLnNwbGljZShyYW5kb21WYWx1ZUFycmF5KGFycmF5Q2FyZHMpLDEpWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICBjYXJkc1RlbXAuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICBjYXJkc1Jlc3VsdFRlbXAucHVzaChpdGVtICsgcmFuZG9tVmFsdWVDYXJkc1N1aXQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE4OyBpKyspIHtcclxuICAgICAgY2FyZHNSZXN1bHQucHVzaChjYXJkc1Jlc3VsdFRlbXAuc3BsaWNlKHJhbmRvbVZhbHVlQXJyYXkoY2FyZHNSZXN1bHRUZW1wKSwgMSlbMF0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4gY2FyZHNSZXN1bHQ7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHJlbmRlckNhcmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgdmFyIGNhcmRzUmVzdWx0ID0gcmFuZG9uQ2FyZHMoQ0FSRFNfQVJSQVksIENBUkRTX0FSUkFZX1NUUik7XHJcbiAgICBjYXJkc1Jlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYXJkX18nICsgaXRlbSk7XHJcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgICBDQVJEU19DT05UQUlORVIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG4gIH07XHJcblxyXG4gIHZhciBjYXJkc1JvdGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBbXS5mb3JFYWNoLmNhbGwoY2FyZHMsIGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnY2FyZF9fb3V0c2lkZScpO1xyXG4gICAgICB9KTtcclxuICAgICAgQ0FSRFNfQ09OVEFJTkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYXJkSGFuZGxlcik7XHJcbiAgICB9LCA1MDAwKTtcclxuICB9O1xyXG5cclxuICBCVE5fUExBWS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrUGxheUhhbmRsZXIpO1xyXG4gIEJUTl9QTEFZX0FHQUlOLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tQbGF5QWdhaW5IYW5kbGVyKTtcclxuXHJcblxyXG59KSgpO1xyXG4iXX0=
