export default function Greetdb(db) {

    async function addNames(name) {

        var nameGreeted = await existingName(name)
        if (!nameGreeted) {

            await db.none("INSERT INTO greetings (name, count) VALUES ($1, $2)", [name, 1])

         }
         else {
             await update(name)
         }
        // let queryResults = 'INSERT INTO greetings (name, count) VALUES ($1, $2)';
        //  db.none(queryResults,[req.body.name, 1])
    }

    async function existingName(name) {
        var namesAvailable = await db.oneOrNone("SELECT name FROM greetings WHERE name = $1", [name])
        return namesAvailable 


    }

    async function showNames() {

        var results = await db.manyOrNone("SELECT name FROM greetings");
        // console.log(results);
        return results;
    }



    async function userGreetCount() {
        var results = await db.one("SELECT count (name) FROM greetings");
        return results.count

    }

    async function update(name) {
        await db.none("UPDATE greetings SET count = count + 1 WHERE name = $1", [name])

    }

    async function nameCounts(name) {
        var results = await db.any("SELECT count FROM greetings WHERE name = $1", [name])
        return results[0].count
    }

    async function resetCounter (){
      await db.any("DELETE FROM greetings");

    }
   
  
    return {
        addNames,
        showNames,
        userGreetCount,
        update,
        nameCounts,
        existingName,
        resetCounter


    }
}