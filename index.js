import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import flash from "express-flash";
import session from "express-session";
import Greetings from "./services/greet.js";
import dotenv from "dotenv";
dotenv.config()
import pgPromise from "pg-promise";
import Greetdb from "./services/greetdb.js";
import GreetRoutes from "./routes/greetings.js";


const pgp = pgPromise();
const app = express();

const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
});
// should we use a SSL connection
let useSSL = true;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local) {
//     useSSL = true;
// }
const connectionString = process.env.CONNECTION_STRING
const db = pgp(connectionString);

const greetInstance = Greetdb(db);
const greetings = Greetings();





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

const greetRoutesInst = GreetRoutes(greetInstance,greetings)

app.get('/', greetRoutesInst.home);

app.post('/greetings', greetRoutesInst.greet);


app.post('/reset', greetRoutesInst.reset)


app.get("/counter/:username", greetRoutesInst.counter);



app.get("/greeted", greetRoutesInst.greeted);




const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});