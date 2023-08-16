import assert from "assert";
import Greetings from "../greet.js";

describe("Greetings", function () {
    let greetInstance;
    beforeEach(function () {
        greetInstance = Greetings();
    })

    describe("SetName", function () {
        it("Should be able to set a name", function () {
            greetInstance.setName("Jimmy")
            assert.equal("Jimmy", greetInstance.getName())
        })
        it("Should be able to set a name", function () {
            greetInstance.setName("Jimmy34")
            assert.equal("", greetInstance.getName())
        })
    })
    describe("Valid", function () {
        it("Should return true for  a valid name", function () {

            assert.equal(true, greetInstance.valid("Tom"))
        })
    })
    describe("Language", function () {
        it("Should be able to greet in Sepedi", function () {
            greetInstance.setName("Bongs")
            assert.equal("Thobela Bongs", greetInstance.greetInSepedi())
        })
        it("Should be able to greet in English", function () {
            greetInstance.setName("Bongs")
            assert.equal("Hello Bongs", greetInstance.greetInEnglish())
        })
        it("Should be able to greet in IsiXhosa", function () {
            greetInstance.setName("Bongs")
            assert.equal("Molo Bongs", greetInstance.greetInIsixhosa())
        })
    })
    describe("Counter", function () {
        it("Should be able to count one name greeted", function () {
            greetInstance.setName("Bells");
            assert.equal(1, greetInstance.count())
        })
        it("Should be able to count more than one name greeted", function () {
            greetInstance.setName("Siwe");
            greetInstance.setName("Billy");
            assert.equal(2, greetInstance.count())

        })
        it("Should not count the same name twice", function () {
            greetInstance.setName("Billy");
            greetInstance.setName("Billy");
            assert.equal(1, greetInstance.count())

        })

    })
    describe("Inavalid names", function () {
        it("Should reurn an error message for invalid names", function () {
            greetInstance.setName("@2344")
            assert.equal("Please enter a valid name", greetInstance.invalid())
        })

    })
    
    describe("No Language", function () {
        it("Should return an erroe message if no language is selected", function () {
            greetInstance.setName("Bongs")
            assert.equal("Please select a language", greetInstance.noGreetLanguage())
        })
    })

})