// Create a class called TTT
class TTT
{
    /*
        Add a constructor that 
        -   defines and initializes all letiables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
   constructor()
   {
    this.oSymbol="O";
    this.xSymbol="X";
    this.xIsNext = true;
    this.winner = null;
    this.squares = Array(9).fill(null);
    this.winningLine = Array();
    this.lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        ];
        this.calculateWinner = this.calculateWinner.bind(this);
        this.init=this.init.bind(this);
        this.highlightWinner=this.highlightWinner.bind(this);
        this.disableAll=this.disableAll.bind(this);
        this.makeComputerMove=this.makeComputerMove.bind(this);
        this.calculateTie=this.calculateTie.bind(this);
        this.resetBoard=this.resetBoard.bind(this);
        
        let resetBtn=document.getElementById('resetBtn');
        resetBtn.onclick=this.resetBoard; 
        this.init();    
   }
   init()
   {
    let board=document.querySelectorAll('.square');
        for(let i=0;i<board.length;i++)
        {
           //squares[i].onclick=handleClick;
           board[i].onclick=this.handleClick.bind(this,i);
           
           
        }
   }
   handleClick(i) 
   {

    /*
    HandleClick
    -   add a parameter i rather than getting i from this
        -   this now refers to the class not the square
    -   remove the local variable i
    -   add a local variiable to refer to the clicked square
        -   remember that squares have an integer id 0 - 8
    */
       let clickedSquare=i;           
       if(this.xIsNext==true)
       {
           this.squares[clickedSquare]=this.oSymbol;
           document.getElementById(clickedSquare).innerHTML=this.oSymbol;
           document.getElementById(clickedSquare).onclick=function(){};
           document.getElementById("status").innerHTML="Next Player: O";
           this.xIsNext=false;
       }
       /*else
       {
           squares[square]=xSymbol;
           document.getElementById(square).innerHTML=xSymbol;
           document.getElementById(square).onclick=function(){};
           document.getElementById("status").innerHTML="Next Player: O";
           xIsNext=true;
       }*/       
       if(this.calculateWinner()==true)
       {
           this.highlightWinner();
           this.disableAll();
       }
       else if(this.calculateTie()==true)
       {
   
           this.disableAll();
           document.getElementById("status").innerHTML="It's a Tie"
       }
       else
       {
           this.makeComputerMove();
       }       
   }
    calculateWinner() 
    {
        for (let i = 0; i < this.lines.length; i++) {
            let a = this.lines[i][0];
            let b = this.lines[i][1];
            let c = this.lines[i][2];       
            if (this.squares[a] && 
            this.squares[a] === this.squares[b] && 
            this.squares[a] === this.squares[c]) {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }
    highlightWinner() 
    { 
        for(let i=0;i<this.winningLine.length;i++)
        {
            let index=this.winningLine[i];
            document.getElementById(index).style.color='red';       
        }
        document.getElementById("status").innerHTML="Winner is: "+this.winner;
        // Update the status in the UI to display the winner
        // Iterate through the winningLine array.  It contains the indices of the winning squares
        //      get the next square using the current index in the winningLine array as the id
        //      add the class red to the square
        // Disable all of the squares
    }
    disableAll() 
    {

        // Set the onclick handler for all squares to function that does nothing
        // The id of the square is a number 0 - 8
        let squares=document.querySelectorAll('.square')//query document find all elements with ID square. why this isntead of get elements?
        for(let i;i<squares.length;i++)
        {
            console.log("ran disable loop");
           squares[i].onclick=function(){};
        }
        
    }
    makeComputerMove()
    {
        let min=0;
        let max=9;
        let random =Math.floor(Math.random() * (+max - +min)) + +min;
        if(document.getElementById(random).innerHTML!="X"&&document.getElementById(random).innerHTML!="O")
        {
            this.squares[random]=this.xSymbol;
            document.getElementById(random).innerHTML=this.xSymbol;
            document.getElementById(random).onclick=function(){};
            document.getElementById("status").innerHTML="Next Player: X";
            this.xIsNext=true;
        }
        else
        {
            this.makeComputerMove();
        }
        this.calculateTie();
        if(this.calculateWinner()==true)
        {
            this.highlightWinner();
            this.disableAll();
        }
    }
    calculateTie()
    {
        let count=0;
        for(let i=0;i<this.squares.length;i++)
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
     resetBoard()
    {
        this.squares=[];
        this.squares = Array(9).fill(null);
        this.xIsNext = true;
        this.winningLine=[];
        for(let i=0;i<this.squares.length;i++)
        {
            document.getElementById(i).innerHTML="&nbsp;";
            document.getElementById(i).style.color='black';
        }
    
        
        this.init();
    }
   
    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change var to let or const for local letiables
        -   add this to all method calls
     
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);

        CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line

        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local letiable i
        -   add a local letiable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
}

// declare a letiable ttt
let ttt;
window.onload=()=>{ttt=new TTT()};

// add an onload handler to the window that assigns ttt to a TTT