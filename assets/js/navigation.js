window.App = window.App || {};

App.Navigation = (function (app) {
  var SCROLL_OPTIONS = {
    behavior: 'smooth',
    block: 'end'
  };

  function onChangedPosition() {
    var currentRow = Math.floor(app.currentPhoto / app.rowQty) + 1;
    var allRows = document.getElementById('images').children.length;
    if (currentRow === allRows - 1) {
      app.Core.renderMorePhotos(app.photos, app.endNumber, app.endNumber * 2);
    }
  }

  function isValidNextPos(offset) {
    var newPosition = app.currentPhoto + offset;
    return (newPosition >= app.startNubmer && newPosition < app.endNumber);
  }

  function changePos (offset) {
    if (!offset) return false;
    if (isValidNextPos(offset)) {
      document.getElementById(app.currentPhoto).classList.remove('active');
      app.currentPhoto += offset;
      var nextPhotoElement = document.getElementById(app.currentPhoto);
      if (nextPhotoElement) {
        nextPhotoElement.classList.add('active');
        nextPhotoElement.parentNode.scrollIntoView(SCROLL_OPTIONS);
        onChangedPosition();
      }
    }
  }

  function up () {
    changePos(-app.rowQty);
  }

  function down () {
    changePos(app.rowQty);
  }

  function right () {
    changePos(1);
  }

  function left () {
    changePos(-1);
  }
  
  return {
    up: up,
    down: down,
    right: right,
    left: left
  }
})(App);