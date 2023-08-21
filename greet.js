export default function Greetings() {

  var nameHolder = "";
  var nameList = [];
  var languageHolder = "";

  function setName(name) {
    if (valid(name) && name !== "") {
      nameHolder = name;
    } else {
      nameHolder = ""
    }

  }


  function setLanguage(language) {
    if (language !== "") {
      languageHolder = language;
    } else {
      noGreetLanguage();
    }


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

  function greet() {
    if (nameHolder !== "" && languageHolder !== "") {
      if (!nameList.includes(nameHolder)) {
        nameList.push(nameHolder);
      }

      if (languageHolder == "english") {
        return greetInEnglish()

      } else if (languageHolder == "sepedi") {
        return greetInSepedi()

      } else if (languageHolder == "isixhosa") {
        return greetInIsixhosa()
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