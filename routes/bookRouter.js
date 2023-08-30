const express = require('express');

function routes(Book){
    const bookRouter = express.Router();

    bookRouter.route('/books')
    .post((req, res) => {
        const book=new Book(req.body);
        console.log(book);
        book.save();
        return res.status(201).json(book);
    })
    .get((req, res) => {
        //http://localhost:4000/api/books?genre=Fantasy
        const query={}
    
        if(req.query.genre){
            query.genre=req.query.genre
        }
    
        Book.find(query).exec() 
        .then(docs=>res.status(200)
        .json(docs))
        .catch(err=>res.status(500)
        .json({
            message:"Error to fetch",
                error:err }))
    });
    
    bookRouter.route('/books/:id').get((req, res) => {
    
        Book.findById(req.params.id).exec() 
        .then(docs=>res.status(200)
        .json(docs))
        .catch(err=>res.status(500)
        .json({
            message:"Error to fetch",
                error:err }))
    });
    return bookRouter;
}

module.exports=routes;