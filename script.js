window.addEventListener("DOMContentLoaded", () => {
    
    const elements = ["rock", "paper", "scissors"];
    
    function computerPlay(){
        const randomElement = Math.floor(Math.random() * elements.length);
        return randomElement;
    }

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

        const result = checkResults(playerElement, computerElement)
        return result;
    }    
    
    function checkResults(playerElement, computerElement){
        const result = {
            message: null,
            userWin: false
        };
        
        if (playerElement === computerElement) {
            result.message = "You're tied! Try again";
            result.userWin = null;
            return result;
        }

        let sum = playerElement + computerElement;

        switch (sum) {
            case 1:
                result.message = "Paper beats rock."
                if (playerElement === 1) {
                    result.userWin = true;                
                }
                break;
            case 2:
                result.message = "Rock beats scissors."
                if (playerElement === 0) {
                    result.userWin = true;                
                }
                break;
            case 3:
                result.message = "Scissors beats paper."
                if (playerElement === 2) {
                    result.userWin = true;                
                }
                break;        
            default:
                result.message = "It seems there's a bug."
                break;
        }      
        
        return result;
    }
        
    
    function playGame(){
        let userScore = 0;
        let computerScore = 0;

        for (let i = 0; i < 5; i++) {
            let playerAnswer = prompt("Rock, paper or scissors?");

            while(playerAnswer === null || playerAnswer === "" ) {
                playerAnswer = prompt("Please, choose an option. Rock, paper or scissors?");
            }

            const result = playRound(playerAnswer, computerPlay());

            if(result.userWin){
                userScore += 1;
                result.message += " You win!"
            } else if(result.userWin === false){
                computerScore += 1;
                result.message += " You loose!"
            }

            const roundMessage = `${result.message} User score: ${userScore}. Computer score: ${computerScore}`;
            console.log(roundMessage);
        }

        showFinalResult(userScore, computerScore);
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
