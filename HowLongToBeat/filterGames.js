function validPrompt(textForPrompt) {
    const promptReply = Number(prompt(textForPrompt));
    /* Check if the prompt is valid */
    if (!promptReply || promptReply === "NaN") {
        alert("Not a valid input.");
        return null;
    }
    return promptReply;
};

/* Get Games list */
const gamesList = Array.from(document.querySelectorAll("tbody.spreadsheet")).map((game) => {
    return {
        gameName: game.childNodes[0].childNodes[0].childNodes[0].textContent,
        date: game.childNodes[0].childNodes[1].textContent,
        score: game.childNodes[0].childNodes[2].textContent,
        element: game
    }
});

/* Show all the games if this script is being run multiple times */
gamesList.forEach((game) => {
    game.element.style.display = "";
});

/* Get the filter type */
const filterType = validPrompt("Filter you want to apply:\n1. Year.\n2. Score");

/* Apply the filter */
let filteredList = null;
let excludedElements = null;
if (filterType === 1) {
    const year = validPrompt("Year you want to get:");
    filteredList = gamesList.filter((game) => {return game.date.includes(year)}).reverse();
    excludedElements = gamesList.filter((game) => {return !game.date.includes(year)});
} else if (filterType === 2) {
    const score = validPrompt("Score you want to get:");
    filteredList = gamesList.filter((game) => {return game.score.split('/')[0] == score});
    excludedElements = gamesList.filter((game) => {return game.score.split('/')[0] != score});
} else {
    alert("Not a valid input.");
};

/* Print the filteredList in a cool way */
let printList = `Filtered list (${filteredList.length} games):\n`;
filteredList.forEach((game, index) => {
    printList += `${index + 1} => ${game.gameName}\n\t\t${game.score}\n\t\t${game.date}\n`;
});
console.log(printList);

/* Hide the excluded elements */
excludedElements.forEach((game) => {
    game.element.style.display = "none";
});