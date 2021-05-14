window.addEventListener("DOMContentLoaded", () => {
    
    const elements = ["rock", "paper", "scissors"];

    playGame()
    
    function computerPlay(){
        const randomElement = Math.floor(Math.random() * elements.length);
        return randomElement;
    }

    function playRound(playerSelection, computerSelection){
        const computerElement = computerSelection;

        let playerElement;
        switch (playerSelection) {
            case "btn-rock":
                playerElement = 0;
                break;
            case "btn-paper":
                playerElement = 1;
                break;
            case "btn-scissors":
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
            playerWin: false
        };
        
        if (playerElement === computerElement) {
            result.message = "You're tied! Try again";
            result.playerWin = null;
            return result;
        }

        let sum = playerElement + computerElement;

        switch (sum) {
            case 1:
                result.message = "Paper beats rock."
                if (playerElement === 1) {
                    result.playerWin = true;                
                }
                break;
            case 2:
                result.message = "Rock beats scissors."
                if (playerElement === 0) {
                    result.playerWin = true;                
                }
                break;
            case 3:
                result.message = "Scissors beats paper."
                if (playerElement === 2) {
                    result.playerWin = true;                
                }
                break;        
            default:
                result.message = "It seems there's a bug."
                break;
        }      
        
        return result;
    }
        
    
    function playGame(){
        const roundResultContainer = document.getElementById("round-result-container");
        roundResultContainer.innerText = "";

        const finalScore = document.getElementById("final-score");
        finalScore.textContent = "";
        
        let playerScore = 0;
        let computerScore = 0;
        let round = 0;

        const btnContainer = document.getElementById("player-selection-container");


        btnContainer.addEventListener("click", (e) => {
            round += 1;
            if (round <= 5) {
                
                const playerSelection = e.target.id;            
                
                const result = playRound(playerSelection, computerPlay());
                const roundResult = showRoundResult(result, playerScore, computerScore);
                
                playerScore = roundResult.playerScore;
                computerScore = roundResult.computerScore;
                
                const roundResultMessage = document.createElement("p");
                roundResultMessage.innerText = roundResult.message;
                roundResultContainer.appendChild(roundResultMessage);
            }
        
            if (round === 5) {
                showFinalResult(playerScore, computerScore);
                askPlayAgain();
            }            
        })
    }

    function showRoundResult(result, playerScore, computerScore){
            if(result.playerWin){
                playerScore += 1;
                result.message += " You win!"
            } else if(result.playerWin === false){
                computerScore += 1;
                result.message += " You loose!"
            }

            const message = `${result.message} Player score: ${playerScore}. Computer score: ${computerScore}`;
            const roundResult = {
                message,
                playerScore: playerScore,
                computerScore
            }
            return roundResult;
    }

    function showFinalResult(playerScore, computerScore) {
        const finalScore = document.getElementById("final-score");

        let winner;
        if(playerScore > computerScore){
            winner = "YOU!";
        } else if (playerScore < computerScore){
            winner = "COMPUTER!";
        } else if(playerScore === computerScore){
            winner = "NOBODY! PLAY AGAIN";
        }

        finalScore.textContent = `
        Final score
        >> Player score: ${playerScore}
        >> Computer score: ${computerScore}
        WINNER: ${winner}`;
    }

    function askPlayAgain(){
        const playAgainContainer = document.getElementById("play-again-container");
        playAgainContainer.classList.remove("hidden");
        playAgainContainer.addEventListener("click", (e) => {
            if (e.target.id === "btn-again-yes") {
                playAgainContainer.classList.add("hidden")
                playGame();
            }
            if (e.target.id === "btn-again-no") {
                console.log("BYE")
            }
        } )
    }
})
