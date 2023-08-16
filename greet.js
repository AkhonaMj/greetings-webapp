export default function Greetings() {

  var nameHolder = "";
  var nameList = [];
  var languageHolder = "";

  function setName(name) {
    if (valid(name))
      nameHolder = name;
    if (!nameList.includes(name)) {
      nameList.push(name);
    }
  }
  function setLanguage(language) {
    languageHolder = language;
  }
  function getName() {
    return nameHolder;
  }



  function valid(name) {
    const validRegex = /^[a-zA-Z]+$/
    return validRegex.test(name);
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
    if (languageHolder == "english") {
      return greetInEnglish()

    } else if (languageHolder == "sepedi") {
      return greetInSepedi()

    } else if (languageHolder == "isixhosa") {
      return greetInIsixhosa()
    }
  }

  function counter() {
    return nameList.length
  }
  function invalid() {
    if (!valid) {
    }
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
    counter,
    invalid,
    noGreetLanguage,
    greet,
    setLanguage
  }
}