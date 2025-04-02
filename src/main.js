import '../sass/style.scss';

const URL = "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json";
const containerDiv = document.getElementById("renderBox");
const getQuote = async () => {
    try {
        const data = await fetch(URL);
        const quotes = await data.json();
        const randomQuote = await quotes[Math.floor(Math.random() * quotes.length)];
        console.log(randomQuote);
        return randomQuote;
    } catch (error) {
        console.log("Error fetching:", error);
        return;
    }
}


const renderQuote = (quote) => {
    containerDiv.textContent = '';
    const pAuthor = document.createElement("p");
    pAuthor.classList.add("author");
    pAuthor.textContent = quote.author;
    containerDiv.appendChild(pAuthor);
    const listTags = document.createElement("ul");
    listTags.classList.add("main__tags");
    quote.tags.map((tag) => {
        let newLi = document.createElement("li");
        newLi.classList.add("tag");
        newLi.textContent = tag;
        listTags.appendChild(newLi);
    });
    containerDiv.appendChild(listTags);
    const pQuote = document.createElement("p");
    pQuote.classList.add("quote");
    pQuote.textContent =`"${quote.quote}"`;
    containerDiv.appendChild(pQuote);
    const refreshButton = document.createElement("button");
    refreshButton.classList.add("left");
    refreshButton.title = "refresh";
    refreshButton.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
    refreshButton.addEventListener("click", () => {
        getQuote().then((rQ) => {
            renderQuote(rQ);
        })
    });
    containerDiv.appendChild(refreshButton);
    const copyButton = document.createElement("button");
    copyButton.classList.add("right");
    copyButton.title = "copy to clipboard";
    copyButton.innerHTML = '<i class="fa-solid fa-clipboard"></i>';
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(quote.quote).then(() => {
            alert("Quote copied to clipboard!");
        }).catch((err) => {
            console.error("Failed to copy text: ", err);
        });
    });
    containerDiv.appendChild(copyButton);
}

getQuote().then((rQ) => {
    renderQuote(rQ);
});


