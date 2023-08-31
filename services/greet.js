export default function Greetings(Greetdb) {
    var nameHolder = "";
    var nameList = [];
    var languageHolder = "";
    function setName(name) {
        if (valid(name)) {
            nameHolder = name;
        }
    }
    function setLanguage(language) {
        if (language == "") {
            noGreetLanguage();
        } 
        languageHolder = language;
    }
    function getName() {
        return nameHolder;
    }
    function getLanguage() {
        return languageHolder;
    }
    function valid(name) {
        const validRegex = /^[a-zA-Z]+$/
        if (!validRegex.test(name)) {
            invalid();
            return false;
        } else {
            return true;
        }
    }
    function greetInSepedi() {
        return "Thobela " + nameHolder

    }
    function greetInEnglish() {
        return "Hello " + nameHolder
    }
    function greetInIsixhosa() {
        return "Molo " + nameHolder
    }
    async function greet() {
        if (nameHolder !== "" && languageHolder !== "") {
            if (languageHolder == "english") {
                return greetInEnglish()
            } else if (languageHolder == "sepedi") {
                return greetInSepedi()
            } else if (languageHolder == "isixhosa") {
                return greetInIsixhosa()
            }
            if (!nameList.includes(nameHolder)) {
                nameList.push(nameHolder);
            }
           
        }
    }
    function count() {
        return nameList.length
    }
    function greeter() {
        return nameList
    }
    function reset() {
        nameList = []
        nameHolder = ""
        languageHolder = ""
    }
    function invalid() {
        return "Please enter a valid name"
    }
    function noGreetLanguage() {
        return "Please select a language"
    }
    return {
        setName,
        getName,
        valid,
        greetInSepedi,
        greetInEnglish,
        greetInIsixhosa,
        count,
        invalid,
        noGreetLanguage,
        greet,
        setLanguage,
        reset,
        getLanguage,
        greeter
    }
}