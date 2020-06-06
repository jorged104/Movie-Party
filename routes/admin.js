var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
let manager = require('../videoManager');
/* GET users listing. */
router.get('/', function(req, res, next) {
 
    if (req.session.loggedin) {
        const directoryPath = path.join(__dirname, '../public/uploads');
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            res.render('admin', {layout : 'index', 
                    post: {files: files},
                    videoactual : manager.getVideo()
                });
        });  
    }
    else{
        console.log(' porque no llega aqui')
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
//setArchivo

router.post('/setArchivo', function(request, response,next) {
    var a = request.body.archivo;
    manager.setVideoStreem(a);
    response.redirect('/admin');
});

router.post('/upload-video', function(req, res,next)  {
    console.log(req.files)

        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploadedsad'
            });
        } else {
            let archivo = req.files.video;
            archivo.mv('public/uploads/' + archivo.name,function(err) {
                if (err)
                  return res.status(500).send(err);
            
                res.send('File uploaded!');
              });
        }

});

module.exports = router;
