module.exports = function(app) {
  var account = app.models.Account;
  var folder = app.models.Folder;
  var photo = app.models.Photo;
  //folder.nestRemoting('photos');
  // account.nestRemoting('folders');
  //photo.nestRemoting('folder');
  var someAccountInfo = {
    name: 'peasant',
    password: 'peasant',
    email: 'peasant@test.com',
  };

  var filter = {
    include: 'folders',
  };


  // works fine the first time (insert)
  // update no longer populates the `folder` obj in queriedPhotoObj[0].__data
  account.create(someAccountInfo, function(err, newAccount) {

    newAccount.folders.create({}, function(err, folderObj){
      folderObj.photos.create({url: 'some-url'}, function(err, photoObj) {
        console.log("photoId is %s", photoObj.id);
        console.log(photoObj.folder());
        photo.find(
          {
            where: {id: photoObj.id},
            include: 'folder',
          },
          function(err, queriedPhotoObj) {
            queriedPhotoObj[0].folderId = queriedPhotoObj[0].__data.folderId;
            console.log('queried: ', queriedPhotoObj[0].folder());
          }
        );
      });
    });
  });

};
