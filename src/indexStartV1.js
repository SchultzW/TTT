// start with these global variables
const pSymbol="O";
const cSymbol="X";
var xIsNext = true;
var yIsNext=false;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

function init()
{
    document.getElementsByName("square")=handleClick;
    /*
    var squares=document.querySelectorAll('#square')//query document find all elements with ID square. why this isntead of get elements?
    for(var i;i<squares.length;i++)
    {
       squares[i].onclick=handleClick();
    }
    */
    // Add an onclick handler to all of the squares
    // The name attribute for all of the divs is square
    // Use the function handleClick to handle the event 
}

function handleClick() {

    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    var square=this.id;
    // Set the element in the squares array to the player's symbol
    squares[square]=pSymbol;
    // Update the inner html for this square in the UI
    document.getElementById(square).innerHTML(pSymbol);
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
    document.getElementById(square).onclick(function(){});
    // Update the variable xIsNext
    [xIsNext,yIsNext]=[yIsNext,xIsNext];

    // If calculateWinner returns true
    if(calculateWinner()==true)
    {
        highlightWinner();
        disableAll();
    }
    // highlight the winner and disable all of the squares
    // otherwise update the status in the UI to display the player

}

function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}

//
function highlightWinner() {

    for(var index in winningLine)
    {
        getElementById[index].style.color='red';
    }
    // Update the status in the UI to display the winner
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    // Disable all of the squares
}

function disableAll() {

    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
    var squares=document.querySelectorAll('#square')//query document find all elements with ID square. why this isntead of get elements?
    for(var i;i<squares.length;i++)
    {
       squares[i].onclick=function(){};
    }
}

function isNext()
{
    if(xIsNext==ture)
    {
        getElementById("Status").innerHTML="Next Player: X";
    }
    else
    getElementById("Status").innerHTML="Next Player: Y";
}
window.onload=init;
// When the page has finished loading, call the function init    