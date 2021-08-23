
const form = document.querySelector('form');        //Retrieves the form node
const para = document.querySelector('p');           //Retreieves the paragraph node
let finalString = "";                               //The final string to be displayed

const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven",
    "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];                   //one's constants

const tens = [null, null, "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];           //ten's constants

form.addEventListener('keydown', () => {
    if (form.form.value == 0) {
        form.form.value = "";
    }
})
form.addEventListener('submit', e => {              //eventlistener on submitting the form
    //prevent default action
    e.preventDefault();
    //displays the speaker button
    document.querySelector('svg').style.display="inline";
    const city = form.form.value;                   //retrieves the form value
    form.form.value = "";
    if (city.length > 4) {
        para.innerHTML = "Out of the scope";          //error if the value is greater than 9999
    }
    else {
        if (city.length == 1) {                     
            para.innerHTML = ones[city];
        } else if (city.length == 2) {
            if (city.charAt(0) == 1)
                para.innerHTML = ones[city];
            else {
                if (city.charAt(1) == 0)
                    para.innerHTML = tens[city.charAt(0)];
                else
                    para.innerHTML = tens[city.charAt(0)] + " " + ones[city.charAt(1)];
            }
        }
        else {
            for (i = 0; i < city.length; i++)
                convertWord(city.charAt(i), city.substring(i).length, city);
            finalString = "";
        }
    }

})

function convertWord(letter, len, city) {
    if (len == 4) {
        finalString += ones[letter] + " thousand";
    }
    else if (len == 3) {
        if (letter != 0)
            finalString += " " + ones[letter] + " hundred";
    }
    else if (len == 2) {
        if (letter == 0) {
            if (city.charAt(city.length - 1) != 0)
                finalString += " and " + ones[city.charAt(city.length - 1)];
        }
        else if (letter == 1) {
            finalString += " and " + ones[city.substring(city.length - 2)];
        }
        else {
            if (city.charAt(city.length - 1) == 0)
                finalString += " and " + tens[letter];
            else
                finalString += " and " + tens[letter] + " " + ones[city.charAt(city.length - 1)];
        }
    }
    para.innerHTML = finalString.charAt(0).toUpperCase() + finalString.slice(1)+" Rupees only";
}
var t1 = performance.now()
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

let speech = new SpeechSynthesisUtterance();

document.querySelector("svg").addEventListener("click", () => {
    speech.text = para.innerHTML;
    window.speechSynthesis.speak(speech);
  });


 