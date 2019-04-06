// start with these global variables
const oSymbol="O";
const xSymbol="X";
var xIsNext = true;
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
    //document.getElementsByName("square")=handleClick;   
    var squares=document.querySelectorAll('.square')//query document find all elements with ID square. why this isntead of get elements?
    for(var i=0;i<squares.length;i++)
    {
       squares[i].onclick=handleClick;
       
    }
    document.getElementById('resetBtn').onclick=resetBoard;
    

    // Add an onclick handler to all of the squares
    // The name attribute for all of the divs is square
    // Use the function handleClick to handle the event 
}

function handleClick() {

    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    var square=this.id;
    // Set the element in the squares array to the player's symbol
    if(xIsNext==true)
    {
        squares[square]=oSymbol;
        document.getElementById(square).innerHTML=oSymbol;
        document.getElementById(square).onclick=function(){};
        document.getElementById("status").innerHTML="Next Player: O";
        xIsNext=false;
    }
    /*else
    {
        squares[square]=xSymbol;
        document.getElementById(square).innerHTML=xSymbol;
        document.getElementById(square).onclick=function(){};
        document.getElementById("status").innerHTML="Next Player: O";
        xIsNext=true;
    }
    */
    // Update the inner html for this square in the UI
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function 
    // Update the variable xIsNext
    // If calculateWinner returns true
    if(calculateWinner()==true)
    {
        highlightWinner();
        disableAll();
    }
    else if(calculateTie()==true)
    {

        disableAll();
        document.getElementById("status").innerHTML="It's a Tie"
    }
    else
    {
        makeComputerMove();
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
    
    /*
    for(var index of winningLine)
    {
        console.log(index);
        document.getElementById[index].style.color='red';
    }
    */
    for(var i=0;i<winningLine.length;i++)
    {

        var index=winningLine[i];
        document.getElementById(index).style.color='red';
        
        
    }
    
    document.getElementById("status").innerHTML="Winner is: "+winner;
    // Update the status in the UI to display the winner
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    // Disable all of the squares
}

function disableAll() {

    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
    console.log("ran disable");
    var squares=document.querySelectorAll('.square')//query document find all elements with ID square. why this isntead of get elements?
    for(var i;i<squares.length;i++)
    {
        console.log("ran disable loop");
       squares[i].onclick=function(){};
    }
    
}
function makeComputerMove()
{
    var min=0;
    var max=9;
    var random =Math.floor(Math.random() * (+max - +min)) + +min;
    if(document.getElementById(random).innerHTML!="X"&&document.getElementById(random).innerHTML!="O")
    {
        squares[random]=xSymbol;
        document.getElementById(random).innerHTML=xSymbol;
        document.getElementById(random).onclick=function(){};
        document.getElementById("status").innerHTML="Next Player: X";
        xIsNext=true;
    }
    else
    {
        makeComputerMove();
    }
    calculateTie();
    if(calculateWinner()==true)
    {
        highlightWinner();
        disableAll();
    }
}
function calculateTie()
{
    var count=0;
    for(var i=0;i<squares.length;i++)
    {
      if(document.getElementById(i).innerHTML=='X' ||document.getElementById(i).innerHTML =='O')
      {
          count++;
      }       
    }
    if(count==9)
    {
        return true;
    }
    else return false;
}
function resetBoard()
{
    squares=[];
    squares = Array(9).fill(null);
    xIsNext = true;
    winningLine=[];
    for(var i=0;i<squares.length;i++)
    {
        document.getElementById(i).innerHTML="&nbsp;";
        document.getElementById(i).style.color='black';
    }
   
    
    init();
}
window.onload=init;
// When the page has finished loading, call the function init    