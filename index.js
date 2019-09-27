const express = require("express")
const app = express()
const path = require("path")
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const request = require('request')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: false}))


function call_api(fetchApi , lookup) {
		request('https://cloud.iexapis.com/stable/stock/' + lookup +'/quote?token=pk_faee4573aca54cc5aeb65a006fb39e31' , { json:true } , (err,res,body) => {
		if(err){
			return console.log(err)
		}
		if(res.statusCode === 200){
			fetchApi(body);
		}
	})
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// set Handlebar index route
app.get('/', function (req, res) { call_api(function(api){ 
			res.render('home', { 
				stock: api ,
			}); 
			console.log(api) 
		} , "fb")
	}
);

/// set Handlebar Post Route
app.post('/', function (req, res) { call_api(function(api){ 
			res.render('home', {  
				stock: api ,
			}); 
			console.log(api) 
		} , req.body.stock_ticker)
	});

app.get('/about' , (req,res) => {
	res.render('about')
}
)

app.use(express.static(path.join(__dirname , 'public')))

app.listen(PORT , () => {
	console.log("Listening")
})