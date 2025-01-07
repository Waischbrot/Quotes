const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const modeToggleButton = document.getElementById('mode-toggle');

async function getRandomQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        
        // Überprüf, ob Request erfolgreich war
        if (!response.ok) {
            throw new Error(`Fehler! Status: ${response.status}`);
        }

        const data = await response.json();
        const { quote: text, author: author } = data; // Zugriff auf das erste Element des Arrays
        return { text, author };
    } catch (error) {
        console.error('Fehler beim Abrufen des Zitats:', error);
        return { text: 'Ein Fehler ist aufgetreten.', author: 'Unbekannt' }; // Fallback-Zitat
        //Warum geht die scheiße nicht?
    }
}

async function displayQuote() {
    const { text, author } = await getRandomQuote(); // await hier hinzufügen
    quoteElement.textContent = text;
    authorElement.textContent = `- ${author}`;
}

newQuoteButton.addEventListener('click', () => {
    displayQuote();
    newQuoteButton.classList.add('shake');
    setTimeout(() => newQuoteButton.classList.remove('shake'), 500);
});

modeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

// First Zitat
displayQuote();
