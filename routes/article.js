const express = require('express');

const { Article , markToHtml }= require('./../models/article');
const router = express.Router() ;


router.use('/new',(req,res) => {
        let article = new Article();
         res.render('articles/new', {article : article }) ;
}) ;


router.use('/edit/:id', async (req, res) => {
    let article =await Article.findById(req.params.id);
    console.log(article);
    res.render('articles/edit' , {article : article })
})


//override the method 
router.delete('/:id' , async function (req, res) {
    console.log("I have called you Thankyou")
    await Article.findByIdAndDelete(req.params.id) ;    
    res.redirect('/');
})


router.put('/:id',async(req, res , next) => {
    console.log("i am on the put middleware");
    const filter = {id : req.params.id};
    const sanitize = markToHtml(req.body.markdown);
    const update = {
        title : req.body.title , 
        description : req.body.description ,
        markdown : req.body.markdown ,
        sanitizedHtml : sanitize 
    }
    const article = await Article.findOneAndUpdate(filter , update , {new : true });
    res.redirect('/')
})



router.use('/:slug' , async function (req, res) {

    const article = await Article.findOne({slug : req.params.slug}) ;
    if (article == null ) res.redirect('/');
    res.render('articles/show',{article : article});
})


router.post('/',async(req, res , next) => {
    console.log(req.body) ; 
    const article = new Article({
        title : req.body.title , 
        description : req.body.description , 
        markdown : req.body.markdown 
    })

    try {
        articles = await article.save() ;
        
    res.redirect(`/articles/${articles.slug}`) ;
        
    } catch (error) {
        console.log(error);
        res.render('articles/new',{article : article } )

        
    } 
})





module.exports = router ; 




