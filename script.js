window.addEventListener("DOMContentLoaded", () => {
    
    // Create a variable called elements for the list of elements
    const elements = ["rock", "paper", "scissors"];
    
    // Create a function that will randomly return one of the elements from the list
    function computerPlay(){
        // Select randomly an element form the elements
        const randomElement = Math.floor(Math.random() * elements.length);

        // return the value
        return randomElement;
    }

    // Create a function that plays a single round of Rock Paper Scissors
    // It takes two parameters (playerSelection, computerSelection)
    // and then return a string that declares the winner of the round
    

    function playRound(playerSelection, computerSelection){
        const computerElement = computerSelection;

        const playerSanitized = playerSelection.trim().toLowerCase();

        let playerElement;
        switch (playerSanitized) {
            case "rock":
                playerElement = 0;
                break;
            case "paper":
                playerElement = 1;
                break;
            case "scissors":
                playerElement = 2;
                break;        
            default:
                playerElement = null;
                break;
        }

        // compare results and send message
        const result = checkResults(playerElement, computerElement)
        return result;

    }    
    
    function checkResults(playerElement, computerElement){
        
    }

        
        // Create a function called game(). Use the previous function inside of this one to play a 5 round game
        // that keeps score and reports a winner or loser at the end.
    function game(){
        
    }

    game()

})
