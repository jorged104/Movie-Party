var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
 
    if (req.session.loggedin) {
        const directoryPath = path.join(__dirname, '../public/uploads');
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            res.render('admin', {layout : 'index', 
                    post: {files: files}
                });
        });  
    }
    else{
        res.render('loginAdmin',  {layout : 'index'});
    }

});

router.post('/auth', function(request, response) {
    var password = request.body.password;
    var passAdmin =  process.env.ADMIN || 'admin';
	if (password) {
		
			if (password === passAdmin ) {
				request.session.loggedin = true;
				request.session.username = "Admin";
				response.redirect('/admin');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



  
module.exports = router;
