const twitterButton = document.querySelector("#js-tweet");
const spinner = document.querySelector("#js-spinner");
const newQuoteButton = document.querySelector("#js-new-quote");
newQuoteButton.addEventListener("click", getQuote);
/** getQuote is the function to be performed after the "click"*/

const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

async function getQuote() {
  // remove the "hidden" class on the spinner
  spinner.classList.remove("hidden");
  // disable the quote button
  newQuoteButton.disabled = true;

  // The `try` block executes the statements within it as usual.
  // If an exception is thrown, the statements defined in
  // the `catch` block will be executed.
  try {
    const response = await fetch(endpoint)
    // If the response is not 200 OK...
    if (!response.ok) {
      // ...throw an error. This causes control flow
      // to skip to the `catch` block below.
      throw Error(response.statusText)
    }
    const json = await response.json();
    displayQuote(json.message);
    setTweetButton(json.message);
  } catch (err) {
    console.log(err)
    alert('Failed to fetch new quote');
  } finally {
    newQuoteButton.disabled = false;
    spinner.classList.add('hidden');
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  quoteText.textContent = quote;
}

function setTweetButton(quote) {
  twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - Donald Trump`);
  // ...backticks instead of single quotes. To insert the value of the quote parameter into Twitter’s share tweet URL. To achieve this, use template literals which allow the embedded expressions.
}
