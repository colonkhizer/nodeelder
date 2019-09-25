const express = require("express")
const app = express()
const path = require("path")
var exphbs  = require('express-handlebars');

const PORT = process.env.PORT || 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('home' , {
    	stuff: 'My stuff'
    });
});

app.use(express.static(path.join(__dirname , 'public')))

app.listen(PORT , () => {
	console.log("Listening")
})