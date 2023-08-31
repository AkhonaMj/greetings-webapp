import assert from "assert";
import Greetdb from "../services/greetdb.js";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
dotenv.config()

const pgp = pgPromise();
const connectionString = process.env.CONNECTION_STRING
const db = pgp(connectionString);



describe("Greetings webapp", function () {
    const greetInst = Greetdb(db);



    this.timeout(5000);

    beforeEach(async function () {
        await db.none("TRUNCATE TABLE greetings")
    })


    describe("addNames function", async function () {
        it("should be able to add names", async function () {
            const name = "Jimmy"
            await greetInst.addNames(name)
            assert.deepEqual([{ 'name': name }], await greetInst.showNames())
        });

    });

    describe("nameCounts function", async function () {
        it("should be able to return a list of names", async function () {
            await greetInst.addNames("Jimmy")
            await greetInst.addNames("Lola")
            await greetInst.addNames("Mimi")
            assert.deepEqual([{ 'name': "Jimmy" }, { 'name': "Lola" }, { 'name': "Mimi" }], await greetInst.showNames())
        })
    })
    describe("userGreetCount function", async function () {
        it("should be able to count greetings", async function () {
            // const name = "Jimmy"
            await greetInst.addNames("Jimmy")
            await greetInst.addNames("Jimmy")
            await greetInst.addNames("Nicho")

            assert.deepEqual(2, await greetInst.userGreetCount())
        })
    })

})
