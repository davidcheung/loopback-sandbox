module.exports = function(Peasant) {

  Peasant.validateAsync('name', function(err,done){
    console.log("ASYNC VALIDATION ----- START !");
      process.nextTick(function () {
          setTimeout(function(){
            console.log("ASYNC VALIDATION -----  WAITING !");
            console.log(  "PROPERTY VALUE IS: %j", this.name );
            done();
            //done( err );
            console.log("ASYNC VALIDATION ----- DONE!");
          },1000);

      });
  }, {message: 'Bad name'});
  function customValidator(err, done) {
      console.log("ASYNC VALIDATION ----- START !");
      process.nextTick(function () {
          setTimeout(function(){
            console.log("ASYNC VALIDATION -----  WAITING !");
            console.log(  "PROPERTY VALUE IS: %j", this.name );
            err( true);
            //done( err );
            console.log("ASYNC VALIDATION ----- DONE!");
          },2000);

      });
  }
  Peasant.beforeSave = function(cb, modelInstance){
    console.log( "Before Save hook performing operations...");
    modelInstance.isValid( function( isValidResult ){
      if ( isValidResult ){
        console.log( "so valid" )
        cb();
      }
    })
  }
  Peasant.afterSave = function(cb, modelInstance){
    console.log( "After Save hook performing operations...");
    cb();
  }

  Peasant.prototype.sigh = function(cb) {

    var error = null;
    var data = {
      msg: 'Life is tough.'
    };
    cb(error, data);
  }
  
  // Peasant.find = function(id, cb) {
  //   console.log( "OVERRIDDEN!");
  //   var error = null;
  //   var data = {
  //     msg: 'Life is tough.'
  //   };
  //   cb(error, data);
  // }

  Peasant.remoteMethod("sigh", {
    returns: {
      arg: "msg",
      type: "msg"
    },
    http: {
      path: '/sigh',
      verb: 'get'
    }
  });


};

