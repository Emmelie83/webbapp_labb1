

let submitButton = document.getElementById("submit_button");
let formContainer = document.getElementById("form_container");
let outputTextField = document.getElementById("output_text_field");
let errorMessageField = document.getElementById("subscribe_error_message");
let errorMessage;

submitButton.addEventListener("click", (event) => {
	event.preventDefault();
	outputText();
});

function outputText() {
	errorMessage = "";
	let fname = getFname();
	let mail = getMail();

	if (fname === false || mail === false) {
		errorMessageField.innerText = errorMessage;
		return;
	}

	const outputText = `Hej ${fname}, 
        tack för att du väljer att prenumerera på vårt nyhetsbrev. En verifieringslänk har skickats till din mejladress ${mail}. Klicka på länken i mejlet för att bekräfta din prenumeration.`;
	formContainer.style.display = "none";
	outputTextField.style.display = "block";
	outputTextField.innerText = outputText;
}

function hasInvalidChars(input) {
	const invalidPattern = /[<>]|script/gi;
	return invalidPattern.test(input);
}

function isValidEmailAddress(input) {
        const validPattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return validPattern.test(input);
}

function getFname() {
	let fname = document.getElementById("fname").value;
	if (fname.trim() === "") {
		errorMessage += "Du måste ange ditt förnamn. ";
		return false;
	}
	if (hasInvalidChars(fname)) {
		errorMessage +=
			"Förnamnet får inte innehålla ogiltiga tecken som <, >, eller 'script'. ";
		return false;
	}
	return fname;
}

function getMail() {
	let mail = document.getElementById("mail").value;
	if (mail.trim() === "") {
		errorMessage += "Du måste ange din mejladress. ";
		return false;
	}
	if (!isValidEmailAddress(mail)) {
		errorMessage +=
			"Du måste ange en giltig mejladress. ";
		return false;
	}
	return mail;
}
