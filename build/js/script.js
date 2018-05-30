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
    } else {
      setTimeout(invertOpeningCard, 2000);
      [].forEach.call(cards, function(item){
        item.setAttribute('data-open', 'false');
      })
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
    console.log(CARDS_CONTAINER.childNodes.length);
    if (CARDS_CONTAINER.childNodes.length === 0) {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe1xyXG5cclxuICB2YXIgQkxPQ0tfR0FNRV9TVEFSVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19zdGFydCcpO1xyXG4gIHZhciBCTE9DS19HQU1FX1BMQVkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fcGxheScpO1xyXG4gIHZhciBCTE9DS19HQU1FX0VORCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lX19lbmQnKTtcclxuICB2YXIgQlROX1BMQVkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheScpO1xyXG4gIHZhciBCVE5fUExBWV9BR0FJTiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5LWFnYWluJyk7XHJcbiAgdmFyIEJUTl9QTEFZX1NUQVJUX09WRVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheS1zdGFydC1vdmVyJyk7XHJcbiAgdmFyIENBUkRTX0FSUkFZID0gWycwJywnMicsJzMnLCc0JywnNScsJzYnLCc3JywnOCcsJzknLCdKJywnQScsJ0snLCdRJ107XHJcbiAgdmFyIENBUkRTX0FSUkFZX1NUUiA9IFsnQycsICdEJywgJ0gnLCAnUyddO1xyXG4gIHZhciBDQVJEU19DT05UQUlORVIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZV9fcGxheS1jYXJkcycpO1xyXG4gIHZhciBjb3VudGVyTWF0Y2hlZENhcmQgPSAwO1xyXG4gIHZhciBjb3VudGVyQ2hlY2tDYXJkID0gMDtcclxuICB2YXIgcG9pbnRzID0gMDtcclxuXHJcbiAgdmFyIGludmVydE9wZW5pbmdDYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcclxuXHJcbiAgICBbXS5mb3JFYWNoLmNhbGwoY2FyZHMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmICghaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NhcmRfX291dHNpZGUnKSkge1xyXG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnY2FyZF9fb3V0c2lkZScpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvdW50ZXJDaGVja0NhcmQgPSAwO1xyXG4gICAgQ0FSRFNfQ09OVEFJTkVSLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tDYXJkSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICB2YXIgZGVsZXRlT3BlbkNhcmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZFtkYXRhLW9wZW49XCJ0cnVlXCJdJyk7XHJcbiAgICB3aGlsZSAoZWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICB2YXIgcGFyZW50RWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIHBhcmVudEVsLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBjaGVja09wZW5DYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmRbZGF0YS1vcGVuPVwidHJ1ZVwiXScpO1xyXG4gICAgdmFyIGNhcmQxID0gY2FyZHNbMF0uY2xhc3NOYW1lLnN1YnN0cmluZyg1KTtcclxuICAgIHZhciBjYXJkMiA9IGNhcmRzWzFdLmNsYXNzTmFtZS5zdWJzdHJpbmcoNSk7XHJcbiAgICBpZiAoY2FyZDEgPT09IGNhcmQyKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoZGVsZXRlT3BlbkNhcmRzLCAyMDAwKTtcclxuICAgICAgY291bnRlckNoZWNrQ2FyZCA9IDA7XHJcbiAgICAgIENBUkRTX0NPTlRBSU5FUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4gICAgICBjb3VudGVyTWF0Y2hlZENhcmQgKz0yO1xyXG4gICAgICBzZXRUaW1lb3V0KGNsaWNrQ2FyZFJlbWFpbmluZ0hhbmRsZXIsIDI1MDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgc2V0VGltZW91dChpbnZlcnRPcGVuaW5nQ2FyZCwgMjAwMCk7XHJcbiAgICAgIFtdLmZvckVhY2guY2FsbChjYXJkcywgZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3BlbicsICdmYWxzZScpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBjbGlja0NhcmRIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgdmFyIHRhcmdldCA9IGV2dC50YXJnZXQ7XHJcblxyXG4gICAgd2hpbGUgKHRhcmdldCAhPT0gQ0FSRFNfQ09OVEFJTkVSKSB7XHJcbiAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2FyZFwiKSkge1xyXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCdjYXJkX19vdXRzaWRlJyk7XHJcbiAgICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1vcGVuJywgJ3RydWUnKTtcclxuICAgICAgICBjb3VudGVyQ2hlY2tDYXJkKys7XHJcbiAgICAgICAgaWYgKGNvdW50ZXJDaGVja0NhcmQgPT09IDIpIHtcclxuICAgICAgICAgIENBUkRTX0NPTlRBSU5FUi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrQ2FyZEhhbmRsZXIpO1xyXG4gICAgICAgICAgY2hlY2tPcGVuQ2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgY2xpY2tDYXJkUmVtYWluaW5nSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnNvbGUubG9nKENBUkRTX0NPTlRBSU5FUi5jaGlsZE5vZGVzLmxlbmd0aCk7XHJcbiAgICBpZiAoQ0FSRFNfQ09OVEFJTkVSLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIEJMT0NLX0dBTUVfUExBWS5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19wbGF5X2Qtbm9uZScpO1xyXG4gICAgICBCTE9DS19HQU1FX0VORC5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19lbmRfZC1ub25lJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBcclxuICB2YXIgY2xpY2tQbGF5SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIEJMT0NLX0dBTUVfU1RBUlQuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fc3RhcnRfZC1ub25lJyk7XHJcbiAgICBCTE9DS19HQU1FX1BMQVkuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fcGxheV9kLW5vbmUnKTtcclxuICAgIHJlbmRlckNhcmRzKCk7XHJcbiAgICBjYXJkc1JvdGF0ZSgpO1xyXG4gICAgQlROX1BMQVlfU1RBUlRfT1ZFUi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrUGxheVN0YXJ0T3ZlckhhbmRsZXIpO1xyXG4gIH07XHJcbiAgXHJcbiAgdmFyIGNsaWNrUGxheUFnYWluSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIEJMT0NLX0dBTUVfUExBWS5jbGFzc0xpc3QudG9nZ2xlKCdnYW1lX19wbGF5X2Qtbm9uZScpO1xyXG4gICAgQkxPQ0tfR0FNRV9FTkQuY2xhc3NMaXN0LnRvZ2dsZSgnZ2FtZV9fZW5kX2Qtbm9uZScpO1xyXG4gICAgcmVuZGVyQ2FyZHMoKTtcclxuICAgIGNhcmRzUm90YXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGNsaWNrUGxheVN0YXJ0T3ZlckhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB3aGlsZSAoQ0FSRFNfQ09OVEFJTkVSLmxhc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgQ0FSRFNfQ09OVEFJTkVSLnJlbW92ZUNoaWxkKENBUkRTX0NPTlRBSU5FUi5sYXN0RWxlbWVudENoaWxkKTtcclxuICAgIH1cclxuICAgIHJlbmRlckNhcmRzKCk7XHJcbiAgICBjYXJkc1JvdGF0ZSgpO1xyXG4gIH07XHJcblxyXG4gIHZhciByYW5kb21WYWx1ZUFycmF5ID0gZnVuY3Rpb24gKGFycmF5KSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGFycmF5Lmxlbmd0aCAtIDEpKTtcclxuICB9O1xyXG5cclxuICB2YXIgcmFuZG9uQ2FyZHMgPSBmdW5jdGlvbiAoYXJyYXksIGFycmF5Mikge1xyXG4gICAgdmFyIGNhcmRzUmVzdWx0ID0gW107XHJcbiAgICB2YXIgY2FyZHNSZXN1bHRUZW1wID0gW107XHJcbiAgICB2YXIgY2FyZHNUZW1wID0gW107XHJcbiAgICB2YXIgcmFuZG9tVmFsdWVDYXJkc1N1aXQgPSBhcnJheTJbcmFuZG9tVmFsdWVBcnJheShhcnJheTIpXTtcclxuICAgIGFycmF5Q2FyZHMgPSBhcnJheS5zbGljZSgpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgOTsgaSsrKSB7XHJcbiAgICAgIGNhcmRzVGVtcC5wdXNoKGFycmF5Q2FyZHMuc3BsaWNlKHJhbmRvbVZhbHVlQXJyYXkoYXJyYXlDYXJkcyksMSlbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcmRzVGVtcC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgIGNhcmRzUmVzdWx0VGVtcC5wdXNoKGl0ZW0gKyByYW5kb21WYWx1ZUNhcmRzU3VpdCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xyXG4gICAgICBjYXJkc1Jlc3VsdC5wdXNoKGNhcmRzUmVzdWx0VGVtcC5zcGxpY2UocmFuZG9tVmFsdWVBcnJheShjYXJkc1Jlc3VsdFRlbXApLCAxKVswXSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJldHVybiBjYXJkc1Jlc3VsdDtcclxuICB9O1xyXG5cclxuICB2YXIgcmVuZGVyQ2FyZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICB2YXIgY2FyZHNSZXN1bHQgPSByYW5kb25DYXJkcyhDQVJEU19BUlJBWSwgQ0FSRFNfQVJSQVlfU1RSKTtcclxuICAgIGNhcmRzUmVzdWx0LmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xyXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NhcmRfXycgKyBpdGVtKTtcclxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB9KTtcclxuICAgIENBUkRTX0NPTlRBSU5FUi5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGNhcmRzUm90YXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIFtdLmZvckVhY2guY2FsbChjYXJkcywgZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdjYXJkX19vdXRzaWRlJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBDQVJEU19DT05UQUlORVIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0NhcmRIYW5kbGVyKTtcclxuICAgIH0sIDUwMDApO1xyXG4gIH07XHJcblxyXG4gIEJUTl9QTEFZLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tQbGF5SGFuZGxlcik7XHJcbiAgQlROX1BMQVlfQUdBSU4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1BsYXlBZ2FpbkhhbmRsZXIpO1xyXG5cclxuXHJcbn0pKCk7XHJcbiJdfQ==
