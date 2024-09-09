
const climberQuotes = [
    { name: "Chris Sharma", quote: "The best part of climbing is when it all clicks and gravity ceases to exist." },
    { name: "Wolfgang Güllich", quote: "In climbing you are always faced with new problems in which you must perform using intuitive movements, and then later analyze them to figure out why they work, and then learn from them." },
    { name: "Tommy Caldwell", quote: "Stand at the base and look up at 3,000 feet of blankness. It just looks like there’s no way you can climb it. That’s what you seek as a climber. You want to find something that looks absurd and figure out how to do it." },
    { name: "Alex Lowe", quote: "The best climber in the world is the one having the most fun!" },
    { name: "Sir Martin Conway", quote: "A man does not climb a mountain without bringing some of it away with him and leaving something of himself upon it." },
    { name: "Ron Kauk", quote: "Climbing here saved my life from the confines of materialistic illusion that we’re taught as children in school. The way I see it, there are two worlds: there’s the world where nothing is sacred except money, and the other world where everything is sacred." },
    { name: "Lynn Hill", quote: "It goes, boys!" },
    { name: "Anatoli Boukreev", quote: "Mountains are not stadiums where I satisfy my ambition to achieve, they are the cathedrals where I practice my religion." },
    { name: "Barry Blanchard", quote: "It doesn’t have to be fun to be fun." },
    { name: "John Muir", quote: "You are not in the mountains. The mountains are in you." },
    { name: "Greg Child", quote: "Somewhere between the bottom of the climb and the summit is the answer to the mystery why we climb." },
    { name: "Margaret Young", quote: "Climbing is as close as we can come to flying." },
    { name: "Catherine Destivelle", quote: "Without a rope there is no fear because to fall is unthinkable." },
    { name: "Ben Moon", quote: "The only substitute for strength is more strength." },
    { name: "Dean Potter", quote: "I don't have a lot of pressure on myself to be successful. I'm more of an artist. I just try to make myself more a part of the most beautiful painting as possible. And enjoy it." },
    { name: "Adam Ondra", quote: "Success is not about how great you are, but how humble and dedicated you are to becoming great." },
    { name: "Hermann Buhl", quote: "Mountains have a way of dealing with overconfidence." },
    { name: "Emily Harrington", quote: "We should be less afraid to be afraid." },
    { name: "Alex Honnold", quote: "I’ve done a lot of thinking about fear. For me the crucial question is not how to climb without fear―that’s impossible―but how to deal with it when it creeps into your nerve endings." },
    { name: "Jon Krakauer", quote: "Getting to the top of any given mountain was considered much less important than how one got there: prestige was earned by tackling the most unforgiving routes with minimal equipment, in the boldest style imaginable." },
    { name: "Lynn Hill", quote: "When people say, 'It can't be done,' or 'You don't have what it takes,' it makes the task all the more interesting." },
    { name: "Jim Bridwell", quote: "Doubt is the enemy of success." },
    { name: "John Bachar", quote: "I accept the consequences of all that I do. No matter what we do with our lives, our bodies are temporary. We're all going to die, and I'd rather die climbing than doing anything else." },
    { name: "Peter Croft", quote: "For me an adventure is something that I can take an active part in but that I don't have total control over." },
    { name: "John Gill", quote: "Bouldering isn't really a sport. It's a climbing activity with metaphysical, mystical, and philosophical overtones." },
    { name: "Unknown", quote: "When in doubt, run it out." }
];

function isWebStorageSupported() {
    return typeof (Storage) !== "undefined";
}

function displaySavedClimberQuote() {
    let foundClimber = false;

    for (let i = 0; i < localStorage.length; i++) {
        const savedClimberName = localStorage.key(i);
        const savedClimberQuote = localStorage.getItem(savedClimberName);

        if (isClimberInQuotes(savedClimberName) && savedClimberQuote) {
            displayClimberQuote(savedClimberName, savedClimberQuote);
            foundClimber = true;
            break;
        }
    }

    if (!foundClimber) {
        displayClimberQuote("Unknown", "When in doubt, run it out.");
    }
}

function isClimberInQuotes(climberName) {
    return climberQuotes.some(c => c.name === climberName);
}

function displayClimberQuote(name, quote) {
    document.getElementById('climber_quote').innerText = quote;
    document.getElementById('chosen_name').innerText = name;
}

function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        clearLocalStorage();

        const climberNameInput = getClimberInput();
        if (hasInvalidChars(climberNameInput)) {
            displayErrorMessage("Input får inte innehålla ogiltiga tecken som <, >, eller 'script'.");
            return;
        }

        const climber = findClimber(climberNameInput);

        if (climber) {
            saveClimberToLocalStorage(climber);
            displayErrorMessage('');
            displayClimberQuote(climber.name, climber.quote);
        } else {
            displayErrorMessage("Kunde tyvärr inte hitta något citat för en klättrare med detta namn.");
        }

        clearClimberInput();
    }
}

function clearLocalStorage() {
    localStorage.clear();
}

function getClimberInput() {
    return document.getElementById('climber_name').value.trim();
}

function clearClimberInput() {
    document.getElementById('climber_name').value = '';
}

function displayErrorMessage(message) {
    document.getElementById('quote_error_message').innerText = message;
}


function hasInvalidChars(input) {
    const invalidPattern = /[<>]|script/gi;
    return invalidPattern.test(input);
}

function findClimber(climberNameInput) {
    return climberQuotes.find(c => c.name.toLowerCase() === climberNameInput.toLowerCase());
}

function saveClimberToLocalStorage(climber) {
    localStorage.setItem(climber.name, climber.quote);
}


document.getElementById('climber_name').addEventListener('keydown', handleEnterKeyPress);

if (isWebStorageSupported()) {
    window.onload = displaySavedClimberQuote;
} else {
    displayErrorMessage("Din webbläsare stödjer tyvärr inte att information lagras i Local Storage");
}
