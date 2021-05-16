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
                printSelection(playerSelectionSpan);

                const computerSelectionResult = computerSelection();
                const computerSelectionSpan = document.getElementById(
                    `computer-selection-${computerSelectionResult}`
                );

                printSelection(computerSelectionSpan);

                const playerSelectionNum =
                    convertPlayerSelectionToNum(playerSelectionId);

                const checkedResult = checkResult(
                    playerSelectionNum,
                    computerSelectionResult
                );

                printRoundResult(checkedResult);
            }

            if (roundNumber === 5) {
                showFinalResult(playerScore, computerScore);
                askPlayAgain();
            }
        }
    }

    function printSelection(span) {
        span.classList.add("active");
        setTimeout(() => {
            span.classList.remove("active");
        }, 1000);
    }

    function computerSelection() {
        const randomElement = Math.floor(Math.random() * elements.length);
        return randomElement;
    }

    function convertPlayerSelectionToNum(playerSelection) {
        let playerSelectionNum;
        switch (playerSelection) {
            case "player-selection-rock":
                playerSelectionNum = 0;
                break;
            case "player-selection-paper":
                playerSelectionNum = 1;
                break;
            case "player-selection-scissors":
                playerSelectionNum = 2;
                break;
            default:
                playerSelectionNum = null;
                break;
        }
        return playerSelectionNum;
    }

    function checkResult(playerSelection, computerSelection) {
        let message = null;
        let winner;
        let sum = playerSelection + computerSelection;

        if (playerSelection === computerSelection) {
            message = "You're tied! Try again";
            winner = null;
        } else {
            switch (sum) {
                case 1:
                    message = "Paper beats rock.";
                    winner = 1;
                    break;
                case 2:
                    message = "Rock beats scissors.";
                    winner = 0;
                    break;
                case 3:
                    message = "Scissors beats paper.";
                    winner = 2;
                    break;
                default:
                    message = "It seems there's a bug.";
                    break;
            }
        }

        if (winner === null) {
            message += "";
        } else if (playerSelection === winner) {
            playerScore += 1;
            message += " You win!";
        } else if (computerSelection === winner) {
            computerScore += 1;
            message += " You loose!";
        }
        return message;
    }

    function printRoundResult(result, playerScore, computerScore) {
        const roundResultContainer = document.getElementById(
            "round-result-container"
        );
        roundResultContainer.textContent = result;
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
