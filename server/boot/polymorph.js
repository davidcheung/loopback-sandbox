'use strict'
//This example is done following this test case
//https://github.com/strongloop/loopback-datasource-juggler/blob/master/test/relations.test.js#L1721-L1746
//https://github.com/strongloop/loopback-datasource-juggler/issues/517
//Defining relationships
module.exports = function(app) {
  var Author = app.models.Author;
  var Reader = app.models.Reader;
  var Picture = app.models.Picture;
  Author.hasOne(Picture, {
    as: 'avatar',
    polymorphic: {
      foreignKey: 'imageableId',
      discriminator: 'imageableType'
    }
  });
  Reader.hasOne(Picture, {
    as: 'imageable',
    polymorphic: {
      foreignKey: 'imageableId',
      discriminator: 'imageableType'
    }
  });
  Picture.belongsTo('owner', {
    idName: 'username',
    polymorphic: {
      idType: Author.definition.properties.username.type,
      foreignKey: 'imageableId',
      discriminator: 'imageableType'
    }
  });
//Creating demo author, reader pictures then listing them
  function createAuthor(cb){
    Author.create({
      username: "John"
    }). then( function(author){
      author.avatar.create({url : "john.jpg"}, function(){
        cb();
      });
    });
  }
  function createReader(cb){
    Reader.create({
      name: "Joe"
    }). then( function(reader){
      reader.imageable.create({url : "joe.jpg"}, function(){
        cb();
      });
    });
  }
  function listPictures(){
    Picture.find(function(err,res){
      console.log("\nPictures:\n",res);
    })
  }
  function listReaders(){
    Reader.find(function(err,res){
      console.log("\nReaders:\n",res);
    })
  }
  function listAuthors(){
    Author.find(function(err,res){
      console.log("\nAuthors:\n",res);
    })
  }
//executing the demo
  createAuthor( function(){
    createReader(function(){ 
      listPictures();
      listAuthors();
      listReaders();
    });
  });

}

/* ----------------------------
  The above example should provide you with results as follow:
  Pictures:
   [ { url: 'john.jpg',
      imageableType: 'Author',
      imageableId: '1',
      id: 1 },
    { url: 'joe.jpg',
      imageableType: 'Reader',
      imageableId: '1',
      id: 2 } ]

  Authors:
   [ { username: 'John', id: 1 } ]

  Readers:
   [ { name: 'Joe', id: 1 } ]
---------------------------- */
