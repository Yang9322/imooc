var express = require('express')
var port = process.env.PORT||3000
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
app.set('views','./views/pages')
app.set('view engine','jade')
app.use(bodyParser())
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port);

console.log('imooc started on port'+port)

app.get('/',function(req,res){
    res.render('index',{
        title:  'imooc 首页',
        movies: [{
            title: '机械战警',
            _id:1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
            title: '机械战警',
            _id:1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },{
            title: '机械战警',
            _id:1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        }]
    })
})

app.get('/movie/:id',function(req,res){
    res.render('detail',{
        title:  'imooc 详情页',
        movie: {
            doctor:'yang',
            country:'Us',
            title: '机械战警',
            year:2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language:'英语',
            flash:'http://baidu.v.ifeng.com/kan/a93Xk?fr=v.baidu.com/',
            summary:'123121233123123123123'
        }
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

app.get('/admin/list',function(req,res){
    res.render('list',{
        title:  'imooc 列表页',
        movies: [{
            _id:1,
            doctor:'yang',
            country:'Us',
            title: '机械战警',
            year:2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language:'英语',
            flash:'http://baidu.v.ifeng.com/kan/a93Xk?fr=v.baidu.com/',
            summary:'123121233123123123123'
        },{
            _id:2,
            doctor:'yang',
            country:'Us',
            title: '机械战警',
            year:2014,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language:'英语',
            flash:'http://baidu.v.ifeng.com/kan/a93Xk?fr=v.baidu.com/',
            summary:'123121233123123123123'
        }
        ]
    })
})

