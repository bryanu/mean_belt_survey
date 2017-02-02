var mongoose 		= require('mongoose'),
		express 		= require('express'),
    session     = require('express-session'),
		bp 					= require('body-parser'),
		path 				= require('path'),
		root 				= __dirname,
		models_path = path.join(root, '../models'),
		port 				= process.env.PORT || 8000,
		app 				= express();

app.use(session({secret: 'Bryan_Utley_Rox_2_2_2017', saveUninitialized: true, resave: true}));

app.use(express.static(path.join(root, 'client')));
app.use(express.static(path.join(root, 'bower_components')));
app.use(bp.json());

require(path.join(root, 'server/config/mongoose.js'));
require(path.join(root, 'server/config/routes.js'))(app);

app.listen(port, function(){
	console.log('Server running on port ' + port);
})
