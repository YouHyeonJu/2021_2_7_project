var express = require('express');
var router = express.Router();
var fs = require('fs');
const { setTimeout } = require('timers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {'error':'', 'success':'', 'request':'', 'delay':'', 'end':''});
});

router.get('/notice', function(req, res){
  res.render('index', {'error':'', 'success':'', 'request':'', 'delay':'', 'end':''});
});

router.post('/', function(req, res){
    var file = 'test.txt';
    fs.open(file, 'w', function(err, fd){
        if(err) throw err;
        console.log('file open');
    })
    var data = req.body.id;
    fs.writeFile('test.txt', data, 'utf8', function(error){
        console.log('write end');
    });
    setTimeout(function(){
      fs.readFile('error.txt', 'utf8', function(err, data){
        d = ''
        console.log(data);
        if(data == 'error'){
          var error = 'error';
        } else if(data == 'success'){
          var success = 'success';
        }
        console.log(success);
        fs.writeFile('error.txt', d, 'utf8', function(error){
          //console.log('second');
        });
        fs.readFile('request.txt', 'utf8', function(err, data){
          if(data == 'request'){
            var request = data
          }
          fs.writeFile('request.txt', d, 'utf8', function(error){
            //console.log('second');
          });
          fs.readFile('end.txt', 'utf8', function(err, data){
            if(data = 'end'){
              var end = data
            }
            fs.writeFile('end.txt', d, 'utf8', function(error){
              //console.log('second');
            });
            var delay = ''
            res.render('index', {'error': error, 'success': success, 'request':request, 'delay':delay, 'end':''});
          })
        });
      });
    }, 2500);
    // res.json({method:req.body.id});
});

router.post('/grade', function(req, res){
  var grade = req.body.grade;
  console.log(grade);
  fs.writeFile('class.txt', grade, 'utf8', function(err){
    console.log('write end');
    
  var file = 'test.txt';
    fs.open(file, 'w', function(err, fd){
        if(err) throw err;
        console.log('file open');
    })
    var data = req.body.id;
    fs.writeFile('test.txt', '1', 'utf8', function(error){
        console.log('write end');
    });
    setTimeout(function(){
      fs.readFile('error.txt', 'utf8', function(err, data){
        d = ''
        console.log(data);
        if(data == 'error'){
          var error = 'error';
        } else if(data == 'success'){
          var success = 'success';
        }
        console.log(success);
        fs.writeFile('error.txt', d, 'utf8', function(error){
          //console.log('second');
        });
        fs.readFile('request.txt', 'utf8', function(err, data){
          if(data == 'request'){
            var request = data
          }
          fs.writeFile('request.txt', d, 'utf8', function(error){
            //console.log('second');
          });
          fs.readFile('end.txt', 'utf8', function(err, data){
            if(data = 'end'){
              var end = data
            }
            fs.writeFile('end.txt', d, 'utf8', function(error){
              //console.log('second');
            });
            var delay = ''
            res.redirect('/')
          })
        });
      });
    }, 2500);
  })
    // res.json({method:req.body.id});
})

module.exports = router;
