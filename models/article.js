const mongoose = require('mongoose');
const slugify = require('slugify');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } =   require('jsdom')

const dompurify = createDomPurify(new JSDOM().window )


const articleSchema = new mongoose.Schema({
    title : {
        required : true,
        type: String
    },
    description : {
        type: String 
    },
    markdown : {
        type : String ,
        required : true 
   

    },
    createdAt:{
        type : Date , 
        default : Date.now 
    },
    slug : {
        type : String ,
        unique : true,   
        required : true 
    },
    sanitizedHtml : {
        type : String , 
        required : true
    }

})

function markToHtml(markdown){
    sanitizedHtml = dompurify.sanitize(marked( markdown ));
    return sanitizedHtml
} 


articleSchema.pre('validate' ,  function (next)  {
    if(this.title){
        
        this.slug = slugify(this.title, {lower : true, strict : true})
        console.log(this.slug)
    
    }


    if(this.markdown){
        this.sanitizedHtml =markToHtml(this.markdown)
    }
    next()

 

})


exports.Article = mongoose.model('Article' , articleSchema) ;
exports.markToHtml = markToHtml ;  