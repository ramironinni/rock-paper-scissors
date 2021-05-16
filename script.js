window.addEventListener("DOMContentLoaded", () => {
    const elements = ["rock", "paper", "scissors"];
    let roundNumber = 0;
    let playerScore = 0;
    let computerScore = 0;

    function playGame() {
        const playerSelectionContainer = document.getElementById(
            "player-selection-container"
        );

        playerSelectionContainer.addEventListener("click", processSelection);
    }

    function processSelection(e) {
        const playerSelectionSpan = e.target;
        const playerSelectionId = e.target.id;

        if (playerSelectionId !== this.id) {
            roundNumber += 1;
            if (roundNumber <= 5) {
                showSelection(playerSelectionSpan);

                const computerSelectionResult = computerSelection();
                const computerSelectionSpan = document.getElementById(
                    `computer-selection-${computerSelectionResult}`
                );

                showSelection(computerSelectionSpan);

                const result = playRound(
                    playerSelectionId,
                    computerSelectionResult
                );
                const roundResult = showRoundResult(
                    result,
                    playerScore,
                    computerScore
                );

                playerScore = roundResult.playerScore;
                computerScore = roundResult.computerScore;

                const roundResultMessage = document.createElement("p");
                roundResultMessage.innerText = roundResult.message;

                const roundResultContainer = document.getElementById(
                    "round-result-container"
                );
                roundResultContainer.appendChild(roundResultMessage);
            }

            if (roundNumber === 5) {
                showFinalResult(playerScore, computerScore);
                askPlayAgain();
            }
        }
    }

    function showSelection(span) {
        span.classList.add("active");
        setTimeout(() => {
            span.classList.remove("active");
        }, 1000);
    }

    function computerSelection() {
        const randomElement = Math.floor(Math.random() * elements.length);
        return randomElement;
    }

    function playRound(playerSelection, computerSelection) {
        computerSelection;

        let playerElement;
        switch (playerSelection) {
            case "player-selection-rock":
                playerElement = 0;
                break;
            case "player-selection-paper":
                playerElement = 1;
                break;
            case "player-selection-scissors":
                playerElement = 2;
                break;
            default:
                playerElement = null;
                break;
        }

        const result = checkResults(playerElement, computerSelection);
        return result;
    }

    function checkResults(playerSelection, computerSelection) {
        const result = {
            message: null,
            playerWin: false,
        };

        if (playerSelection === computerSelection) {
            result.message = "You're tied! Try again";
            result.playerWin = null;
            return result;
        }

        let sum = playerSelection + computerSelection;

        switch (sum) {
            case 1:
                result.message = "Paper beats rock.";
                if (playerSelection === 1) {
                    result.playerWin = true;
                }
                break;
            case 2:
                result.message = "Rock beats scissors.";
                if (playerSelection === 0) {
                    result.playerWin = true;
                }
                break;
            case 3:
                result.message = "Scissors beats paper.";
                if (playerSelection === 2) {
                    result.playerWin = true;
                }
                break;
            default:
                result.message = "It seems there's a bug.";
                break;
        }

        return result;
    }

    function showRoundResult(result, playerScore, computerScore) {
        if (result.playerWin) {
            playerScore += 1;
            result.message += " You win!";
        } else if (result.playerWin === false) {
            computerScore += 1;
            result.message += " You loose!";
        }

        const message = `${result.message} Player score: ${playerScore}. Computer score: ${computerScore}`;
        const roundResult = {
            message,
            playerScore: playerScore,
            computerScore,
        };
        return roundResult;
    }

    function showFinalResult(playerScore, computerScore) {
        const finalScore = document.getElementById("final-score");

        let winner;
        if (playerScore > computerScore) {
            winner = "YOU!";
        } else if (playerScore < computerScore) {
            winner = "COMPUTER!";
        } else if (playerScore === computerScore) {
            winner = "NOBODY! PLAY AGAIN";
        }

        finalScore.textContent = `
        Final score
        >> Player score: ${playerScore}
        >> Computer score: ${computerScore}
        WINNER: ${winner}`;
    }

    function askPlayAgain() {
        const playAgainContainer = document.getElementById(
            "play-again-container"
        );
        playAgainContainer.classList.remove("hidden");
        playAgainContainer.addEventListener("click", (e) => {
            if (e.target.id === "btn-again-yes") {
                window.location.reload();
            }
            if (e.target.id === "btn-again-no") {
                console.log("BYE");
            }
        });
    }

    playGame();
});
