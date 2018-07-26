window.App = window.App || {};

App.Utils = (function () {
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function isNewRow(index) {
    return (index % App.rowQty === 0);
  }
  return {
    debounce: debounce,
    isNewRow: isNewRow
  }
})();