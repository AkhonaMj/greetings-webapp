export default  function GreetRoutes(greetInstance, greetings) {

    async function home(req, res) {
        res.render('index', {
            greetUser: await greetings.greet(),
            counter: await greetInstance.userGreetCount(),
            //counter: greetings.count(),
            messages: req.flash('error')[0],

        });
    }
    async function greet(req, res) {
        greetings.reset();
        greetings.setName(req.body.name.toLowerCase());
        greetings.setLanguage(req.body.languageRadio);
        //    let queryResults = 'INSERT INTO greetings (name, count) VALUES ($1, $2)';
        //  db.none(queryResults,[req.body.name, 1])
        if (!greetings.getName()) {
            console.log(greetings.getLanguage());
            req.flash('error', greetings.invalid());
        } else if (!greetings.getLanguage()) {
            console.log(greetings.getLanguage());
            req.flash('error', greetings.noGreetLanguage());
        }
        else if (await greetInstance.existingName(greetings.getName())) {
            await greetInstance.update(req.body.name.toLowerCase())
        }
        else {
            console.log(greetings.getLanguage());
            await greetInstance.addNames(req.body.name.toLowerCase())
        }
        res.redirect('/')
    }

    async function reset(req, res) {
        await greetInstance.resetCounter()
        greetings.reset()
        res.redirect('/')
    }

    async function counter(req, res) {
        const username = req.params.username;
        // var counted = await greetInstance.counter();
        const countPerPerson = await greetInstance.nameCounts(username)
        res.render("counter", {
            counter: countPerPerson,
            username: username
        });
    }
    async function greeted(req, res) {
        var results = await greetInstance.showNames();
        res.render("greeted", {
            greeted: results
        })
    }

    return {
        home,
        greet,
        reset,
        counter,
        greeted




    }
}