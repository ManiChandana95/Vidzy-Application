var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

var monk = require('monk');
var db = monk('localhost:27017/vidzy');


router.get('/', function(req, res, next) {
  res.redirect('/videos');
});

router.get('/videos', function(req, res) {
	var collection = db.get('videos');
	/*collection.find({}, function(err, videos){
		if (err) throw err;
	  	res.render('index', { videos: videos });
	});*/
	//search and filter
    if(req.body.genre != "All")
    {
        collection.find( { $and: [ 
        {"genre": {'$regex' : new RegExp("" + req.body.genre, "ig")}},
        {"title": {'$regex' : new RegExp("" + req.body.title, "ig")}}
        ] }
        ,function(err, videos){
        if (err) throw err;
        res.render('index', { videos: videos });
    });
   }
   else
   {
    
    collection.find({"title": {'$regex' : new RegExp("" + req.body.title, "ig")}}, function(err, videos){
        if (err) throw err;
        res.render('index', { videos: videos });
    });
     
   }
});


//new video
router.get('/videos/new', function(req, res) {
	res.render('new');
});

//insert route
router.post('/videos', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        description: req.body.desc
    }, function(err, video){
        if (err) throw err;

        res.redirect('/videos');
    });
});


router.get('/videos/:id', function(req, res) {
	var collection = db.get('videos');
	collection.findOne({ _id: req.params.id }, function(err, video){
		if (err) throw err;
	  	//res.json(video);
	  	res.render('show', { video: video });
	});
});

//edit
router.get('/videos/:id/edit', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;
        //res.json(video);
        res.render('change', { video: video });
    });
});

//update
router.put('/videos/:id', function(req, res) {
    var collection = db.get('videos');
    collection.update(
   { _id: req.params.id },
   {
    $set:{
    title: req.body.title,
    genre: req.body.genre,
    image: req.body.image,
    description: req.body.desc
   }
},function(err, video) {
    if(err) throw err;

    res.redirect('/');
});

});

//delete route
router.delete('/videos/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.redirect('/');
    });
});


module.exports = router;
