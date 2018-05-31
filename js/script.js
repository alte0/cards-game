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
  var TIME_ROTATE_CARD = 5000;
  var TIME_FOR_JOB_CARD = 2000;
  var TIME_FOR_SET_POINTS_CARD = 2500;
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

  var setPoints = function () {
    SCORE.textContent = points;
    FINAL_SCORE.textContent = points;
  };

  var checkOpenCard = function () {
    var cards = document.querySelectorAll('.card[data-open="true"]');
    var card1 = cards[0].className.substring(5);
    var card2 = cards[1].className.substring(5);
    var CardRemaining = clickCardRemainingHandler;
    if (card1 === card2) {
      setTimeout(deleteOpenCards, TIME_FOR_JOB_CARD);
      counterCheckCard = 0;
      CARDS_CONTAINER.addEventListener('click', clickCardHandler);
      counterMatchedCard += 2;
      setTimeout(function(){
        CardRemaining();
        points = points + cardLeft * MULTIPLIED_NUM;
        setPoints();
      }, TIME_FOR_SET_POINTS_CARD);
    } else {
      setTimeout(invertOpeningCard, TIME_FOR_JOB_CARD);
      [].forEach.call(cards, function(item){
        item.setAttribute('data-open', 'false');
      });
      CardRemaining();
      points = points - (ALL_CARDS_NUM - cardLeft) * MULTIPLIED_NUM;
      setPoints();
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
    }, TIME_ROTATE_CARD);
  };

  BTN_PLAY.addEventListener('click', clickPlayHandler);
  BTN_PLAY_AGAIN.addEventListener('click', clickPlayAgainHandler);


})();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cclxuICB2YXIgQkxPQ0tfR0FNRV9TVEFSVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19zdGFydCcpO1xyXG4gIHZhciBCTE9DS19HQU1FX1BMQVkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fcGxheScpO1xyXG4gIHZhciBCTE9DS19HQU1FX0VORCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19lbmQnKTtcclxuICB2YXIgQlROX1BMQVkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheScpO1xyXG4gIHZhciBCVE5fUExBWV9BR0FJTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluJyk7XHJcbiAgdmFyIEJUTl9QTEFZX1NUQVJUX09WRVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1zdGFydC1vdmVyJyk7XHJcbiAgdmFyIENBUkRTX0FSUkFZID0gWycwJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCcsJzknLCdKJywnQScsJ0snLCdRJ107XHJcbiAgdmFyIENBUkRTX0FSUkFZX1NUUiA9IFsnQycsICdEJywgJ0gnLCAnUyddO1xyXG4gIHZhciBDQVJEU19DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fcGxheS1jYXJkcycpO1xyXG4gIHZhciBUSU1FX1JPVEFURV9DQVJEID0gNTAwMDtcclxuICB2YXIgVElNRV9GT1JfSk9CX0NBUkQgPSAyMDAwO1xyXG4gIHZhciBUSU1FX0ZPUl9TRVRfUE9JTlRTX0NBUkQgPSAyNTAwO1xyXG4gIHZhciBjb3VudGVyTWF0Y2hlZENhcmQgPSAwO1xyXG4gIHZhciBjb3VudGVyQ2hlY2tDYXJkID0gMDtcclxuICB2YXIgcG9pbnRzID0gMDtcclxuICB2YXIgY2FyZExlZnQ7XHJcbiAgdmFyIFNDT1JFID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlJyk7XHJcbiAgdmFyIE1VTFRJUExJRURfTlVNID0gNDI7XHJcbiAgdmFyIEFMTF9DQVJEU19OVU0gPSAxODtcclxuICB2YXIgRklOQUxfU0NPUkUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmluYWwtc2NvcmUnKTtcclxuXHJcbiAgdmFyIGludmVydE9wZW5pbmdDYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcclxuXHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoY2FyZHMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmICghaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmRfX291dHNpZGUnKSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnY2FyZF9fb3V0c2lkZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvdW50ZXJDaGVja0NhcmQgPSAwO1xyXG4gICAgQ0FSRFNfQ09OVEFJTkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYXJkSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICB2YXIgZGVsZXRlT3BlbkNhcmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZFtkYXRhLW9wZW49XCJ0cnVlXCJdJyk7XHJcbiAgICB3aGlsZSAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICB2YXIgcGFyZW50RWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIHBhcmVudEVsLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBzZXRQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBTQ09SRS50ZXh0Q29udGVudCA9IHBvaW50cztcclxuICAgIEZJTkFMX1NDT1JFLnRleHRDb250ZW50ID0gcG9pbnRzO1xyXG4gIH07XHJcblxyXG4gIHZhciBjaGVja09wZW5DYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4gICAgdmFyIGNhcmQxID0gY2FyZHNbMF0uY2xhc3NOYW1lLnN1YnN0cmluZyg1KTtcclxuICAgIHZhciBjYXJkMiA9IGNhcmRzWzFdLmNsYXNzTmFtZS5zdWJzdHJpbmcoNSk7XHJcbiAgICB2YXIgQ2FyZFJlbWFpbmluZyA9IGNsaWNrQ2FyZFJlbWFpbmluZ0hhbmRsZXI7XHJcbiAgICBpZiAoY2FyZDEgPT09IGNhcmQyKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoZGVsZXRlT3BlbkNhcmRzLCBUSU1FX0ZPUl9KT0JfQ0FSRCk7XHJcbiAgICAgIGNvdW50ZXJDaGVja0NhcmQgPSAwO1xyXG4gICAgICBDQVJEU19DT05UQUlORVIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuICAgICAgY291bnRlck1hdGNoZWRDYXJkICs9IDI7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICBDYXJkUmVtYWluaW5nKCk7XHJcbiAgICAgICAgcG9pbnRzID0gcG9pbnRzICsgY2FyZExlZnQgKiBNVUxUSVBMSUVEX05VTTtcclxuICAgICAgICBzZXRQb2ludHMoKTtcclxuICAgICAgfSwgVElNRV9GT1JfU0VUX1BPSU5UU19DQVJEKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFRpbWVvdXQoaW52ZXJ0T3BlbmluZ0NhcmQsIFRJTUVfRk9SX0pPQl9DQVJEKTtcclxuICAgICAgW10uZm9yRWFjaC5jYWxsKGNhcmRzLCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1vcGVuJywgJ2ZhbHNlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBDYXJkUmVtYWluaW5nKCk7XHJcbiAgICAgIHBvaW50cyA9IHBvaW50cyAtIChBTExfQ0FSRFNfTlVNIC0gY2FyZExlZnQpICogTVVMVElQTElFRF9OVU07XHJcbiAgICAgIHNldFBvaW50cygpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBjbGlja0NhcmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgdmFyIHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcblxyXG4gICAgd2hpbGUgKHRhcmdldCAhPT0gQ0FSRFNfQ09OVEFJTkVSKSB7XHJcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZFwiKSkge1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjYXJkX19vdXRzaWRlJyk7XHJcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1vcGVuJywgJ3RydWUnKTtcclxuICAgICAgICBjb3VudGVyQ2hlY2tDYXJkKys7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJDaGVja0NhcmQgPT09IDIpIHtcclxuICAgICAgICAgIENBUkRTX0NPTlRBSU5FUi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4gICAgICAgICAgY2hlY2tPcGVuQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgY2xpY2tDYXJkUmVtYWluaW5nSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNhcmRMZWZ0ID0gQ0FSRFNfQ09OVEFJTkVSLmNoaWxkTm9kZXMubGVuZ3RoO1xyXG4gICAgXHJcbiAgICBpZiAoY2FyZExlZnQgPT09IDApIHtcclxuICAgICAgQkxPQ0tfR0FNRV9QTEFZLmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX3BsYXlfZC1ub25lJyk7XHJcbiAgICAgIEJMT0NLX0dBTUVfRU5ELmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX2VuZF9kLW5vbmUnKTtcclxuICAgIH1cclxuICB9O1xyXG4gIFxyXG4gIHZhciBjbGlja1BsYXlIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgQkxPQ0tfR0FNRV9TVEFSVC5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19zdGFydF9kLW5vbmUnKTtcclxuICAgIEJMT0NLX0dBTUVfUExBWS5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19wbGF5X2Qtbm9uZScpO1xyXG4gICAgcmVuZGVyQ2FyZHMoKTtcclxuICAgIGNhcmRzUm90YXRlKCk7XHJcbiAgICBCVE5fUExBWV9TVEFSVF9PVkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tQbGF5U3RhcnRPdmVySGFuZGxlcik7XHJcbiAgfTtcclxuICBcclxuICB2YXIgY2xpY2tQbGF5QWdhaW5IYW5kbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgQkxPQ0tfR0FNRV9QTEFZLmNsYXNzTGlzdC50b2dnbGUoJ2dhbWVfX3BsYXlfZC1ub25lJyk7XHJcbiAgICBCTE9DS19HQU1FX0VORC5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19lbmRfZC1ub25lJyk7XHJcbiAgICByZW5kZXJDYXJkcygpO1xyXG4gICAgY2FyZHNSb3RhdGUoKTtcclxuICB9O1xyXG5cclxuICB2YXIgY2xpY2tQbGF5U3RhcnRPdmVySGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHdoaWxlIChDQVJEU19DT05UQUlORVIubGFzdEVsZW1lbnRDaGlsZCkge1xyXG4gICAgICBDQVJEU19DT05UQUlORVIucmVtb3ZlQ2hpbGQoQ0FSRFNfQ09OVEFJTkVSLmxhc3RFbGVtZW50Q2hpbGQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQ2FyZHMoKTtcclxuICAgIGNhcmRzUm90YXRlKCk7XHJcbiAgICBwb2ludHMgPSAwO1xyXG4gICAgU0NPUkUudGV4dENvbnRlbnQgPSBwb2ludHM7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHJhbmRvbVZhbHVlQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoYXJyYXkubGVuZ3RoIC0gMSkpO1xyXG4gIH07XHJcblxyXG4gIHZhciByYW5kb25DYXJkcyA9IGZ1bmN0aW9uIChhcnJheSwgYXJyYXkyKSB7XHJcbiAgICB2YXIgY2FyZHNSZXN1bHQgPSBbXTtcclxuICAgIHZhciBjYXJkc1Jlc3VsdFRlbXAgPSBbXTtcclxuICAgIHZhciBjYXJkc1RlbXAgPSBbXTtcclxuICAgIHZhciByYW5kb21WYWx1ZUNhcmRzU3VpdCA9IGFycmF5MltyYW5kb21WYWx1ZUFycmF5KGFycmF5MildO1xyXG4gICAgYXJyYXlDYXJkcyA9IGFycmF5LnNsaWNlKCk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA5OyBpKyspIHtcclxuICAgICAgY2FyZHNUZW1wLnB1c2goYXJyYXlDYXJkcy5zcGxpY2UocmFuZG9tVmFsdWVBcnJheShhcnJheUNhcmRzKSwxKVswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FyZHNUZW1wLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgY2FyZHNSZXN1bHRUZW1wLnB1c2goaXRlbSArIHJhbmRvbVZhbHVlQ2FyZHNTdWl0KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxODsgaSsrKSB7XHJcbiAgICAgIGNhcmRzUmVzdWx0LnB1c2goY2FyZHNSZXN1bHRUZW1wLnNwbGljZShyYW5kb21WYWx1ZUFycmF5KGNhcmRzUmVzdWx0VGVtcCksIDEpWzBdKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIGNhcmRzUmVzdWx0O1xyXG4gIH07XHJcblxyXG4gIHZhciByZW5kZXJDYXJkcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIHZhciBjYXJkc1Jlc3VsdCA9IHJhbmRvbkNhcmRzKENBUkRTX0FSUkFZLCBDQVJEU19BUlJBWV9TVFIpO1xyXG4gICAgY2FyZHNSZXN1bHQuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FyZF9fJyArIGl0ZW0pO1xyXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIH0pO1xyXG4gICAgQ0FSRFNfQ09OVEFJTkVSLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuICB9O1xyXG5cclxuICB2YXIgY2FyZHNSb3RhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgW10uZm9yRWFjaC5jYWxsKGNhcmRzLCBmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2NhcmRfX291dHNpZGUnKTtcclxuICAgICAgfSk7XHJcbiAgICAgIENBUkRTX0NPTlRBSU5FUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4gICAgfSwgVElNRV9ST1RBVEVfQ0FSRCk7XHJcbiAgfTtcclxuXHJcbiAgQlROX1BMQVkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1BsYXlIYW5kbGVyKTtcclxuICBCVE5fUExBWV9BR0FJTi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrUGxheUFnYWluSGFuZGxlcik7XHJcblxyXG5cclxufSkoKTtcclxuIl19
