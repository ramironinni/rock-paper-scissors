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
        if (playerElement === 1 && computerElement === 0) {
            return ["Paper beats rock. You win!", true];
        } else if (playerElement === 0 && computerElement === 2) {
            return ["Rock beats scissors. You win!", true];
        } else if (playerElement === 2 && computerElement === 1) {
            return ["Scissors beats paper. You win!", true];
        } else if (playerElement === 0 && computerElement === 1) {
            return ["Paper beats rock. You loose!", false];
        } else if (playerElement === 2 && computerElement === 0) {
            return ["Rock beats scissors. You loose!", false];
        } else if (playerElement === 1 && computerElement === 2) {
            return ["Scissors beats paper. You loose!", false];
        } else if (playerElement === computerElement) {
            return ["We have a tie! Try again.", null];
        }
    }

        
    // Create a function called game(). Use the previous function inside of this one to play a 5 round game
    // that keeps score and reports a winner or loser at the end.
    function playGame(){
        let userScore = 0;
        let computerScore = 0;

        for (let i = 0; i < 5; i++) {
            let playerAnswer = prompt("Rock, paper or scissors?");

            while(playerAnswer === null || playerAnswer === "" ) {
                playerAnswer = prompt("Please, choose an option. Rock, paper or scissors?");
            }

            const resultData = playRound(playerAnswer, computerPlay());
            const resultMessage = resultData[0];
            const userWin = resultData[1];

            if(userWin){
                userScore += 1;
            } else if(userWin === false){
                computerScore += 1;
            }

            const roundMessage = `${resultMessage} User score: ${userScore}. Computer score: ${computerScore}`;
            console.log(roundMessage);

            if(i === 4){
                showFinalResult(userScore, computerScore);
            }
        }
    }

    function showFinalResult(userScore, computerScore) {
        let winner;
        if(userScore > computerScore){
            winner = "YOU!";
        } else if (userScore < computerScore){
            winner = "COMPUTER!";
        } else if(userScore === computerScore){
            winner = "NOBODY! PLAY AGAIN";
        }

        console.log(`
        ********************************
        Final score
        >> User score: ${userScore}
        >> Computer score: ${computerScore}
        WINNER: ${winner}
        ********************************`);
    }

    playGame()

})
