import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import Greetings from "./greet.js";
import dotenv from "dotenv";
dotenv.config()
import pgPromise from "pg-promise";
import Greetdb from "./greetdb.js";
import redis from "redis";


const app = express();

app.use(express.session({
  store: new redis.Client(),
  secret: 'my-secret-key',
  resave: true,
  saveUninitialized: true
}));













const pgp = pgPromise();


const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
});
// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.CONNECTION_STRING
console.log(connectionString);
const db = pgp(connectionString);
const greetInstance = Greetdb(db);
const greetings = Greetings(greetInstance);





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


app.get('/', async function (req, res) {
    res.render('index', {
        greetUser: greetings.greet(),
        counter: await greetInstance.userGreetCount(),
        //counter: greetings.count(),
        messages: req.flash('error')[0],

    });
});


app.post('/greetings', async function (req, res) {
    greetings.setName(req.body.name);
    greetings.setLanguage(req.body.languageRadio);
    //    let queryResults = 'INSERT INTO greetings (name, count) VALUES ($1, $2)';
    //  db.none(queryResults,[req.body.name, 1])
    await greetInstance.addNames(req.body.name)
    if (!greetings.getName()) {
        req.flash('error', greetings.invalid());
    }
    if (!greetings.getLanguage()) {
        req.flash('error', greetings.noGreetLanguage());
    }
    res.redirect('/')
});


app.post('/reset', async function (req, res) {
    await greetInstance.resetCounter()
    // greetings.reset()
    res.redirect('/')
})


app.get("/counter/:username", async function (req, res) {
    const username = req.params.username;
    // var counted = await greetInstance.counter();
    const countPerPerson = await greetInstance.nameCounts(username)
    console.log(countPerPerson);

    res.render("counter", {
        counter: countPerPerson,
        username: username


    });
});



app.get("/greeted", async function (req, res) {
    var results = await greetInstance.showNames();

    res.render("greeted", {
        greeted: results
    })


});




const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});