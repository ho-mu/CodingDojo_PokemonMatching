var cardHTMLList = [];
var totalCardCount = 0;

function attach_handlers(){
    $('.card').unbind('click');
    $('.card').click(function(){
       $(this).children().toggle(); 
    });
}

function isPresent(arr,value){
    for(var i=0; i<arr.length; i++){
        if(arr[i] == value){
            return true;
        }else{
            return false;
        }
    }
}

function insertAt(arr,value,index){
    for(var i=arr.length-1; i>=index; i--){
        arr[i+1]=arr[i];
    }
    arr[index] = value;
}

function randomizeCardLocation(cardHTMLList,cardHTML){
    // Randomize the location of a new card
    var indexList = [];
    var randomIndex = Math.floor(Math.random()*(cardHTMLList.length+1));
    insertAt(cardHTMLList, cardHTML, randomIndex);
}

function checkCardCount(){
    console.log("checking count " + cardHTMLList.length);
    if(cardHTMLList.length == totalCardCount){
        for(var i=0; i<cardHTMLList.length; i++){
            $('#gameBoard').append(cardHTMLList[i]);
            attach_handlers();
        }
    }
}

// Generate the cards for the game board
function generateGameboard(numberOfCards){
    console.log("Creating game board with " + numberOfCards + " cards");
    for(var i=1; i<=numberOfCards/2; i++){
        // Find a new pokemon index to add to the board
        var indexList = [];
        var rand = Math.floor(Math.random()*151)+1;
        while(isPresent(indexList,rand)){
            rand = Math.floor(Math.rand()*151)+1;
        }
        indexList.push(rand);
        console.log("Pokemon # " + rand + " will be added.");

        // Get the pokemon name to be added
        $.get('http://pokeapi.co/api/v2/pokemon/' + rand, function(data){
            var pokemon = data.name;
            console.log("Got pokemon " + pokemon);

            // Create the new card HTML
            var cardHTML = "<div class='card cardSize" + numberOfCards + "'>" + 
                "<img class='cardSize" + numberOfCards + " cardFront' src='./images/pokemon.jpg'>" + 
                "<img class='cardSize" + numberOfCards + " cardBack' src='./images/" + pokemon + ".jpg' data-name='" + pokemon + "'></div>"

            // Randomize the location of 2 new cards
            randomizeCardLocation(cardHTMLList,cardHTML);
            randomizeCardLocation(cardHTMLList,cardHTML);
            checkCardCount();
        });
    }
}

// Generate the hands to hold player matches.
function generatePlayerHands(numberOfPlayers){

}

//Use this line to create a link to download an image
//$('#images').append('<a href="https://img.pokemondb.net/artwork/' + data.name + '.jpg" download="' + data.name + '.jpg">' + data.name + '</a>');

$(document).ready(function(){
    console.log("ready");

    var pokemon = {};
    
    $('form').submit(function(){
        console.log('starting game');
        var numberOfPlayers = $('select[name=numberOfPlayers]').val();
        var numberOfCards = $('select[name=numberOfCards]').val();
        totalCardCount = numberOfCards;
        console.log(numberOfPlayers + " players");
        console.log(numberOfCards + " cards");

        //check the number of cards, set the css for the gameboard cards
        generateGameboard(numberOfCards);

        //check the number of players, create the same number of hands on the right
        generatePlayerHands(numberOfPlayers);

        return false;
    });

});