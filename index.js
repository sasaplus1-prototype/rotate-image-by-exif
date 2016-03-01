(function(){

  'use strict';

  var file = document.getElementById('js-file'),
      image = document.getElementById('js-image');

  file.addEventListener('change', function(event) {
    Promise
      .resolve()
      .then(function() {
        var f = event.target.files[0];

        return new Promise(function(resolve, reject) {
          EXIF.getData(f, function() {
            resolve({
              file: f,
              orientation: f.exifdata.Orientation
            });
          });
        });
      })
      .then(function(params) {
        var mpi = new MegaPixImage(params.file);

        mpi.render(image, {
          orientation: params.orientation
        });
      })
      .catch(function(err) {
        console.error(err);
      });
  }, false);

}());
