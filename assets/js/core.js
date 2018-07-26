window.App = window.App || {};

App.Core = (function (utils) {

  function getPhotos (callback) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=afc68954ccbb21bba24b76de2d5a3d66&format=json&nojsoncallback=1';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status !== 200) {
      console.error( xhr.status + ': ' + xhr.statusText );
    } else {
      try {
        callback(JSON.parse(xhr.responseText).photos);
      } catch (error) {
        console.error(error);
      }

    }
  }
  function buildPhotoUrls (photos) {
    for (var i=0; i < photos.length; i++) {
      var photo = photos[i];
      photo.src = 'https://farm' + photo.farm +'.staticflickr.com/'+ photo.server + '/' + photo.id +'_'+ photo.secret +'.jpg';
    }
  }
  function renderPhotos(photos, from, to) {
    if (to > photos.length) return false;
    var imagesDiv = createImagesContainer();
    var j= -1;
    var row = [];
    for (var i = from; i < to; i++) {
      if (utils.isNewRow(i)) {
        j++;
        row[j] = createRow(j);
      }
      var img = createImage(photos[i], i);
      row[j].appendChild(img);
      setCurrentPhoto(i);
    }
    for (i=0; i < row.length; i++) {
      imagesDiv.appendChild(row[i]);
    }
    document.getElementById('root').appendChild(imagesDiv);
  }

  function renderMorePhotos(photos, from, to) {
    if (to > photos.length) return false;
    var j= -1;
    var row = [];
    for (var i = from; i < to; i++) {
      if (utils.isNewRow(i)) {
        j++;
        row[j] = createRow(j);
      }
      var img = createImage(photos[i], i);
      row[j].appendChild(img);
    }
    for (i=0; i < row.length; i++) {
      document.getElementById('images').appendChild(row[i]);
    }
    App.endNumber = to;
  }

  function createImage(photo, index) {
    var img = document.createElement('IMG');
    img.src = photo.src;
    img.className = (index === 0) ? 'flickr-img active' : 'flickr-img';
    img.id = index;
    img.setAttribute('data-pos', index);
    return img;
  }

  function createRow(rowIndex) {
    var row = document.createElement('DIV');
    var images = document.getElementById('images');
    var rowId = images ? rowIndex + images.children.length : rowIndex;
    row.className = 'img-row';
    row.id = 'row-' + rowId;
    return row;
  }

  function setCurrentPhoto(i) {
    App.currentPhoto = (i === 0) ? i : App.currentPhoto;
  }

  function createImagesContainer() {
    var imagesDiv = document.createElement('DIV');
    imagesDiv.className = 'images';
    imagesDiv.id = 'images';
    return imagesDiv;
  }

  return {
    getPhotos: getPhotos,
    buildPhotoUrls: buildPhotoUrls,
    renderPhotos: renderPhotos,
    renderMorePhotos: renderMorePhotos
  }
})(App.Utils);
