var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 
    if (req.session.loggedin) {
        res.render('admin', { login: false });
    }
    else{
        res.render('loginAdmin', { login: false });
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
