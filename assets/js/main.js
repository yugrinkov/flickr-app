App.startNubmer = 0;
App.endNumber = 50;
App.rowQty = 5;

(function (app, navigation, utils, core) {

  function onGetPhotos (response) {
    app.photos = response.photo;
    core.buildPhotoUrls(app.photos);
    core.renderPhotos(app.photos, app.startNubmer, app.endNumber);
    initEventListeners();
  }

  function initEventListeners() {
    var onKeyDownEventHandler = utils.debounce(function (e) {
      e.preventDefault();
      var keyCode = e.keyCode;
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        var keyCodeMap = {
          '37': 'left',
          '38': 'up',
          '39': 'right',
          '40': 'down'
        };
        navigation[keyCodeMap[keyCode]]();
      }
    }, 100);

    var onWheelEventHandler = utils.debounce(function(e) {
      if (e.deltaY < 0) {
        navigation.up();
      }
      if (e.deltaY > 0) {
        navigation.down();
      }
    }, 200);

    document.addEventListener('keydown', onKeyDownEventHandler);
    document.addEventListener('wheel', onWheelEventHandler);
  }

  var flickr = {
    start: function () {
      core.getPhotos(onGetPhotos);
    }
  };

  flickr.start();

})(App, App.Navigation, App.Utils, App.Core);