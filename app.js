var express = require('express')
var port = process.env.PORT||3000
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var mongoose = require('mongoose')
var Movie = require('./models/movie')
var _ = require('underscore')
mongoose.connect('mongodb://localhost/imooc')
app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser())
app.use(express.static(path.join(__dirname,'bower_components')))
app.locals.moment = require('moment')
app.listen(port);

console.log('imooc started on port'+port)

app.get('/',function(req,res){

    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }

          res.render('index',{
        title:  'imooc 首页',
        movies: movies
     })
  })
  
})

app.get('/movie/:id',function(req,res){

    var id = req.params.id
Movie.findById(id,function(err,movie){
       res.render('detail',{
        title:  'imooc' + movie.title,
        movie: movie
         })
    })
})

app.get('/admin/movie',function(req,res){
    res.render('admin',{
        title:  'imooc 后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
})

app.get('/admin/update/:id',function(req,res){
        var id = req.params.id
        if(id){
            Movie.findById(id,function(err,movie){
                res.render('admin',{
                    title:'imooc 后台更新页',
                    movie:movie
                })
            })
        }

})

app.post('/admin/movie/new',function(req,res){
    var id = req.body.movie._id
    var movieObj = req.body.movie
    var _movie

    if(id !== 'undefined'){
        Movie.findById(id,function(err,movie){
            _movie = _.extend(movie,movieObj)
            _movie.save(function(err,movie){
                res.redirect('/movie/'+movie._id)
            })
        })
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash,

        })

        _movie.save(function(err,movie){
            res.redirect('/movie/' + movie._id)
        })
    }
})

app.get('/admin/list',function(req,res){
    
    Movie.fetch(function(err,movies){
        if(err){
            console.log(err);
        }

          res.render('list',{
        title:  'imooc list',
        movies: movies
     })
  })
})

app.delete('/admin/list',function(req,res){
    var id = req.query.id
    if(id){
        Movie.remove({_id:id},function(err,movie){
            res.json({'success':1})
        })
    }
})