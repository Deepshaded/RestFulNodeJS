const express = require('express');
const mongoose = require('mongoose');

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

bookRouter.route('/books').get((req, res) => {
	Book.find().exec() 
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
