const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
// eslint-disable-next-line no-undef
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error',console.error.bind(console,'connection error: '))

db.once('open', function(){
    console.log('Connected to MongoDB')

    app.listen(app.get('port'),function(){
        console.log('Server listening on port '+app.get('port'))
    })
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
	res.send('Hii');

});

app.listen(port, () => {
	console.log(`listening on port  ${port}`);
});
