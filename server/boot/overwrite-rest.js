module.exports = function(app) {
  var peasant = app.models.peasant;

  // peasant.disableRemoteMethod("sigh",true);
  // peasant.disableRemoteMethod("find",true);
  // console.log("ASda");
  // peasant.find(function(err,res) {

  //   console.log(res)
  // });
  var username = "bad";
  var a_peasant  = new peasant();
  
  // console.log( a_peasant.name );
  // console.log( "sync isvalid ----> " , a_peasant.isValid()  )
  // a_peasant.name = "David";
  // console.log( "sync isvalid ----> " , a_peasant.isValid()  )

  // a_peasant.isValid(function( isValid){
  // 	console.log( "isValid --->",isValid );
  // });
	
	peasant.create({ username : username },function(err,res){ 
		if (err) console.log( "HAS ERROR :( ", err);
		console.log( "result", err);

	} );

}