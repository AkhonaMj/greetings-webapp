import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import Greetings from "./greet.js";


const app = express();
const greetings = Greetings();

const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
});


app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/', function (req, res) {

    res.render('index', {
        greetUser: greetings.greet(),
        
    });

});




app.post('/greetings', function (req, res) {
    greetings.setName(req.body.name);
    greetings.setLanguage(req.body.languageRadio)
   

    res.redirect('/')

});


app.get("/counter/:username", function (req, res) {

    res.render("counter", {

    })
});


app.post("/greeted", function (req, res) {
    greetings.greet(req.body.languageRadio),
    greetings.setName(req.body.name)
    res.redirect("/")

})



const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});