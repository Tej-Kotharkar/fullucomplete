// Initialize player names and scores
let player1Name = localStorage.getItem("player1_name") || "Player 1";
let player2Name = localStorage.getItem("player2_name") || "Player 2";
let player1Score = 0;
let player2Score = 0;

// Variables to track whose turn it is and the current question
let currentPlayerTurn = 1; // Start with Player 1
let currentNumber1 = 0;
let currentNumber2 = 0;

// Display initial player names and scores
document.getElementById("player1_name").innerHTML = `${player1Name}:`;
document.getElementById("player2_name").innerHTML = `${player2Name}:`;
document.getElementById("player1_score").innerHTML = player1Score;
document.getElementById("player2_score").innerHTML = player2Score;

// Function to get the name of the current player whose turn it is
function getCurrentPlayerName() {
    return currentPlayerTurn === 1 ? player1Name : player2Name;
}

// Function to ask a question
function askQuestion() {
    // Get the numbers from the input fields
    const num1Input = document.getElementById("number1");
    const num2Input = document.getElementById("number2");
    
    currentNumber1 = parseInt(num1Input.value, 10);
    currentNumber2 = parseInt(num2Input.value, 10);
    
    // Clear the input fields
    num1Input.value = "";
    num2Input.value = "";
    
    // Get the output div and clear its content
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    
    // Create a paragraph element for the question
    const questionParagraph = document.createElement("p");
    questionParagraph.textContent = `${getCurrentPlayerName()} asks: What is ${currentNumber1} * ${currentNumber2}?`;
    
    // Append the question to the output div
    outputDiv.appendChild(questionParagraph);
    
    // Create an input element for the answer
    const answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.id = "answerInput";
    answerInput.placeholder = "Enter your answer";
    answerInput.className = "form-control";
    
    // Create the "Check" button
    const checkButton = document.createElement("button");
    checkButton.textContent = "Check";
    checkButton.className = "btn btn-info";
    checkButton.style.marginTop = "10px";
    
    // Attach an event listener to the button to call the checkAnswer() function when clicked
    checkButton.addEventListener("click", checkAnswer);
    
    // Append the answer input and check button to the output div
    outputDiv.appendChild(answerInput);
    outputDiv.appendChild(checkButton);
}

// Function to check the player's answer
function checkAnswer() {
    // Get the player's answer
    const answerInput = document.getElementById("answerInput");
    const playerAnswer = parseInt(answerInput.value, 10);
    
    // Calculate the correct answer
    const correctAnswer = currentNumber1 * currentNumber2;
    
    // Get feedback div and clear previous content
    const feedbackDiv = document.getElementById("player_feedback");
    feedbackDiv.innerHTML = "";
    
    // Check the player's answer and provide feedback
    if (playerAnswer === correctAnswer) {
        feedbackDiv.textContent = `${getCurrentPlayerName()} got it right!`;
        // Update the score of the current player
        if (currentPlayerTurn === 1) {
            player1Score++;
            document.getElementById("player1_score").textContent = player1Score;
        } else {
            player2Score++;
            document.getElementById("player2_score").textContent = player2Score;
        }
    } else {
        feedbackDiv.textContent = `${getCurrentPlayerName()} got it wrong! Correct answer is ${correctAnswer}.`;
    }
    
    // Switch the turn to the other player
    currentPlayerTurn = currentPlayerTurn === 1 ? 2 : 1;
    answerInput.value = "";

}
