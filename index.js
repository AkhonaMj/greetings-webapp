import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
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
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));
app.use(flash());


app.get('/', function (req, res) {
    res.render('index', {
        greetUser: greetings.greet(),
        counter: greetings.count(),
        messages: req.flash('error')[0],

    });
});


app.post('/greetings', function (req, res) {
    greetings.setName(req.body.name);
    greetings.setLanguage(req.body.languageRadio);


    if (!greetings.getName()) {
        req.flash('error', greetings.invalid());


    }

    if (!greetings.getLanguage()) {
        req.flash('error', greetings.noGreetLanguage());
    }


    res.redirect('/')
});

app.post('/reset', function (req, res) {
    greetings.reset()
   

    res.redirect('/')
})


app.get("/counter/:username", function (req, res) {
    const username = req.params.username;

    res.render("counter", {
        counter: count()

    });
});


app.get("/greeted", function (req, res) {
    res.render("greeted", { greeted: greetings.greeter() })

});




const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});