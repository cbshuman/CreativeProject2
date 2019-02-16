let creatures = 0;
let instants = 0;
let enchantments = 0
let artifacts = 0;
let planeswalkers = 0;
let lands = 0;
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

	console.log(cardType);

	switch(cardType[0])
		{
		case "Creature":
			creatures += count;
			break;
		case "Instant":
			instants += count;
			break;
		case "Sorcery":
			instants += count;
			break;
		case "Enchantment":
			enchantments +=  count;
			break;
		case "Artifact":
			artifacts +=  count;
			break;
		case "Planeswalker":
			planeswalkers +=  count;
			break;
		case "Land":
			lands +=  count;
			break;
		default:
			break;
		}

	//console.log("Card count: " + count + "/" + cardCount);
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
	let cleanDeck = [];
	let foundCard = false;

	for(let i = 0; i < deck.length; i++)
		{
		console.log(cardId + "/" + deck[i].id + "/" + foundCard);
		if(deck[i].id === cardId && foundCard === false)
			{
			foundCard = true;
			card = deck[i];
			}
		else
			{
			cleanDeck.push(deck[i]);
			}
		}

	deck = cleanDeck;
	/*
	deck.forEach(function(currentCard)
		{
		console.log(currentCard.name);
		if(currentCard.id === cardId)
			{
			card = currentCard;
			return;
			}
		});*/

	console.log(card + "/" + deck.length + "/" + cleanDeck.length + "/" + cardId);

	UpdateCardCount(card.types,false);
	}

let UpdateCardDisplay = function()
	{
	document.getElementById("count").innerHTML = "Card Count: " +  deck.length;
	document.getElementById("creatures").innerHTML = "Creatures: " + creatures;
	document.getElementById("instants").innerHTML = "Instants/Soceries: " + instants;
	document.getElementById("enchantments").innerHTML = "Enchantments: " + enchantments;
	document.getElementById("artifacts").innerHTML = "Artifacts: " + artifacts;
	document.getElementById("planeswalkers").innerHTML = "Planeswalkers: " + planeswalkers;
	document.getElementById("lands").innerHTML = "Lands: " + lands;
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
