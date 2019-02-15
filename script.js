let cardCount = 0;
let creatures = 0;
let deck = [];

let UpdateCardCount = function(cardType, isAdding)
	{
	let count;

	if(isAdding === true)
		{
		count = 1;
		}
	else
		{
		count = -1;
		}

	console.log("Type: " + cardType);
	switch(cardType)
		{
		case "Creature":
			creatures += count;
			break;
		case "Instant":
			console.log("This is an instant");
			break;
		default:
			break;
		}

	console.log("Card count: " + count + "/" + cardCount);

	cardCount += count;
	UpdateCardDisplay();
	}

let AddCardToDeck =  function(cardID)
	{
	const url = "https://api.magicthegathering.io/v1/cards?id=" + cardID;
	//console.log("Adding a card to the deck: " + cardID);
	fetch(url).then(function(response) { return response.json(); } ).then(function(json){ CreateNewCard(json, cardID) });
	}

let CreateNewCard = function(json, cardID)
	{
	console.log("Adding a card to the deck: " + json.cards[0].name);

	let card = json.cards[0];

	let newCardString = "<div id = '" + cardID + "' class = 'cardInfo'><a onclick='RemoveCard(\"" + cardID + "\")' href ='#'><h4>" + card.name + "</h4><hr>";
	newCardString += "<img src ='" + card.imageUrl + "' alt = '"+ card.text + "' title= '"+ card.text + "' ><br>";
	newCardString += card.types;
	newCardString += "</a></div>";

	document.getElementById("deck").innerHTML += newCardString;

	deck.push(card);

	UpdateCardCount(card.types,true);
	}

let RemoveCard = function(cardId)
	{
	var element = document.getElementById(cardId);
	element.parentNode.removeChild(element);

	let card;	

	deck.forEach(function(currentCard)
		{
		console.log(currentCard.name);
		if(currentCard.id === cardId)
			{
			card = currentCard;
			return;
			}
		});+

	console.log(card);

	UpdateCardCount(card.types,false);
	}

let UpdateCardDisplay = function()
	{
	document.getElementById("count").innerHTML = "Card Count: " + cardCount;
	document.getElementById("creatures").innerHTML = "Creatures: " + cardCount;
	}

let SetSearchResults = function(json)
	{
	//console.log(json);

	if(json.cards.length == 0)
		{
		document.getElementById("cardData").innerHTML = "No cards found . . . :(";
		return;
		}

	document.getElementById("cardData").innerHTML = "";

	json.cards.forEach(function(element)
		{
		//console.log("Adding card: " + element.name);
		let newCardString = "<div class = 'cardInfo'><a onclick='AddCardToDeck(\"" + element.id + "\")' href ='#'><h4>" + element.name + "</h4><hr>";
		newCardString += "<img src ='" + element.imageUrl + "' alt = '"+ element.text + "' ><br>";
		//newCardString += "<a href =''>Add</a>";
		newCardString += "</a></div>";

  		document.getElementById("cardData").innerHTML += newCardString; ;
		//document.getElementById("cardData").innerHTML += "<img src ='" + element.imageUrl + "'>";
		});
	}


let GetCard = function(event)
	{
	event.preventDefault();

	console.log("Called, looking for card. . .");

	let cardSearch = document.getElementById("cardSearchName").value;

	const url = "https://api.magicthegathering.io/v1/cards?name=" + cardSearch;
	fetch(url).then(function(response) { return response.json(); } ).then(function(json){ SetSearchResults(json) });
	}

document.getElementById("submitCard").addEventListener("click",GetCard);
