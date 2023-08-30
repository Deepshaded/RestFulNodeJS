const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error',console.error.bind(console,'connection error: '))

db.once('open', function(){
    console.log('Connected to MongoDB')

    app.listen(app.get('port'),function(){
        console.log('Server listening on port '+app.get('port'))
    })
})

// eslint-disable-next-line no-undef

const Book = require('./models/bookModel');

const bookRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

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

app.use('/api', bookRouter);

app.get('/', (req, res) => {
	res.send('Hii');

});

app.listen(port, () => {
	console.log(`listening on port  ${port}`);
});
