const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const selectElement = document.getElementById('feeling');

selectElement.addEventListener("change", async function() {
    if (selectElement.value == "null") {
        quoteEl.innerHTML = "Please select a category in the menu box :)";
    } else {
    const selectedCategory = selectElement.value;
    const quote = await retrieveQuote(selectedCategory);
    }
}); //detects for changes in the value of the combobox 

async function retrieveQuote(category) {

    const apiKey = 'hceaD1FCkv1HqUOA8YyOQsGBs6RLxKM5OkBIlS22';
    const url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const quoteToRet = data[0].quote; 
            return quoteToRet;
        } else {
            return "Rate limit reached for API Ninjas: Quotes. Please try again later.";
        }
    } catch (error) {
        console.error(error);
        return "An error occurred while fetching the quote. Please try again.";
    }
} //retrieveQuote

async function yodafyQuote(quote) {
    const modifiedQuote = quote.replace(/ /g, '%20');
    const url = `https://api.funtranslations.com/translate/yoda.json?text=${modifiedQuote}`;
    
    try {
        const response = await fetch(url);
        if (response.ok) {
            const yodaData = await response.json();
            const yodaQuote = yodaData.contents.translated;
            return yodaQuote;
        } else {
            return 'Rate limit reached for Yoda translator API. Please try again later.';
        }
    } catch (error) {
        console.error(error);
        return 'An error occurred while processing the request.';
    }
}


btnEl.addEventListener("click", async function() {
    if (selectElement.value == "null") {
        quoteEl.innerHTML = "Please select a category in the menu box :)";
    } else {
    const selectedCategory = selectElement.value; //gets category from combo box
    const quote = await retrieveQuote(selectedCategory); //gets quote based on category
    const yodaQuote = await yodafyQuote(quote);
    quoteEl.innerHTML = "Original quote: " + quote + "<br><br>Yodafied wisdom: " + yodaQuote + "<br><br>";
    }
}); //once button has been clicked
