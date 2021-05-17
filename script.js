window.addEventListener("DOMContentLoaded", () => {
    const elements = ["rock", "paper", "scissors"];
    let roundNumber = 0;
    let playerScore = 0;
    let computerScore = 0;
    const roundResultTime = 3000;

    const roundResultContainer = document.getElementById(
        "round-result-container"
    );

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
                setTimeout(() => {
                    showFinalResult(playerScore, computerScore);
                    askPlayAgain();
                }, roundResultTime);
            }
        }
    }

    function printSelection(span) {
        span.classList.add("active");
        setTimeout(() => {
            span.classList.remove("active");
        }, roundResultTime);
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

        switch (winner) {
            case null:
                break;
            case playerSelection:
                playerScore += 1;
                message += " You win!";
                break;
            case computerSelection:
                computerScore += 1;
                message += " You loose!";
                break;
            default:
                break;
        }

        return message;
    }

    function printRoundResult(checkedResult) {
        roundResultContainer.textContent = checkedResult;

        const playerScoreDiv = document.getElementById("player-score");
        playerScoreDiv.innerText = playerScore;

        const computerScoreDiv = document.getElementById("computer-score");
        computerScoreDiv.innerText = computerScore;

        setTimeout(() => {
            roundResultContainer.textContent = "";
        }, roundResultTime);
    }

    function showFinalResult(playerScore, computerScore) {
        roundResultContainer.textContent = "";
        const gameWinner = document.getElementById("game-winner");

        gameWinner.classList.remove("hidden");

        let winner;
        if (playerScore > computerScore) {
            winner = "YOU!";
        } else if (playerScore < computerScore) {
            winner = "COMPUTER!";
        } else if (playerScore === computerScore) {
            winner = "NOBODY! PLAY AGAIN";
        }

        gameWinner.textContent = `WINNER: ${winner}`;
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
                const body = document.getElementsByTagName("body")[0];

                const byeDiv = document.createElement("div");
                byeDiv.innerText = "Bye!";
                byeDiv.classList.add("bye");

                body.innerHTML = "";
                body.appendChild(byeDiv);
            }
        });
    }

    playGame();
});
