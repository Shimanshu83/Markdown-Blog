//built in package
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//user defined package
const articleRouter = require('./routes/article.js');
const {Article} = require('./models/article');

const app = express();
mongoose.connect('mongodb://localhost/blog')

app.use(express.urlencoded({extended : false })); // To parse the body of the request 
app.set('view engine' , 'ejs');
app.set('views' , 'views');   

//override the method 
app.use(methodOverride('_method'))

app.use('/articles',articleRouter);

app.get('/', async (req, res, next) => {
    const articles = await Article.find()
    res.render('articles/index' , {articles : articles}) ;

})

app.listen(3030);
