// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to various elements on the page
    const questionElement = document.getElementById("question-box");
    const currentMoneyElement = document.getElementById("current-money");
    const volumeToggleElement = document.getElementById("volume-toggle");
    const answerA = document.getElementById('btnA');
    const answerB = document.getElementById('btnB');
    const answerC = document.getElementById('btnC');
    const answerD = document.getElementById('btnD');
    const startGameElement = document.getElementById("start-game");
    const submitAnswerElement = document.getElementById("submit-answer");
    const nextQuestionElement = document.getElementById("next-question");
    const instructionsElement = document.getElementById("instructions");

    // Define the array of quiz questions
    const quizQuestions = [
        // easy questions, 1-3
        {
            question: "What is the name of the wizarding school that Harry Potter attends?",
            options: ["Code Institute: School of Magical Programming", "Hogwarts School of Witchcraft and Wizardry", "Merlin's Academy", "Salem School of Magic"],
            correctAnswer: "Hogwarts School of Witchcraft and Wizardry"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Jane Austin", "Charles Dickins", "William Shakespeare", "Elon Musk"],
            correctAnswer: "William Shakespeare"
        },
        {
            question: "What is the chemical symbol for water",
            options: ["CO²", "O²", "H²O", "U-235"],
            correctAnswer: "H²O"
        },
        // medium questions, 4-6
        {
            question: "Which athlete is known as 'The Greatest' and considered one of the most significant and celebrated sports figures of the 20th century?",
            options: ["Michael Jordan", "Serena Williams", "Muhammad Ali", "Usain Bolt"],
            correctAnswer: "Muhammad Ali"
        },
        {
            question: "Which company developed the Windows operating system?",
            options: ["Apple", "Microsoft", "Google", "IBM"],
            correctAnswer: "Microsoft"
        },
        {
            question: "Which is the best Premier League team?",
            options: ["Aaaaaaaaaarsenal", "Shity Leeds", "Tottenshit", "Man Idiot"],
            correctAnswer: "Aaaaaaaaaarsenal"
        },
        // hard questions, 7-9
        {
            question: "In which country did the pineapple originate?",
            options: ["Brazil", "Hawaii", "Philippines", "Mexico"],
            correctAnswer: "Brazil"
        },
        {
            question: "What is the smallest ocean in the world?",
            options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Arctic Ocean"],
            correctAnswer: "Arctic Ocean"
        },
        {
            question: "Which mammal is the only animal capable of flight backwards?",
            options: ["Bat", "Hummingbird", "Flying fox", "Pterosaur"],
            correctAnswer: "Hummingbird"
        },
        // impossible question, 10
        {
            question: "How much wood could a woodchuck chuck, if a woodchuck could chuck wood?",
            options: ["What?", "As much wood as a woodchuck could chuck", "If a woodchuck could chuck wood, would he wood chuck?", "As much wood as a woodchuck could chuck, if a woodchuck could chuck wood."],
            correctAnswer: "As much wood as a woodchuck could chuck, if a woodchuck could chuck wood."
        }
    ];

    // Initialize variables for current question index and correct answer
    let currentIndex = 0;
    let correctAnswer = ''; // Initialize correctAnswer variable
    let totalMoney = "1,000,000"; // Initialize total money

    // Function to update the displayed total money
    function updateTotalMoney() {
        currentMoneyElement.innerHTML = `Total money: £${totalMoney.toLocaleString()}`;
    }

    // Function to start the game
    function startGame() {
        startGameElement.style.visibility = 'hidden'; // Hide the start game button when the start game button is clicked
        nextQuestionElement.style.visibility = 'hidden'; // Hide the next question button when the start game button is clicked 
        currentIndex = 0; // Reset the current question index to start with question 1 again
        totalMoney = 1000000; // Reset total money
        updateTotalMoney(); // Update the displayed total money
        showQuestion(); // Show the first question
    }

    // Function to show the current question
    function showQuestion() {
        nextQuestionElement.innerHTML = "Next Question"; // change the restart button back to Next Question
        if (currentIndex < quizQuestions.length) { // Check if there are more questions
            let currentQuestion = quizQuestions[currentIndex];
            questionElement.innerText = currentQuestion.question; // Display the current question
            // Display the current answer options
            answerA.innerHTML = currentQuestion.options[0];
            answerB.innerHTML = currentQuestion.options[1];
            answerC.innerHTML = currentQuestion.options[2];
            answerD.innerHTML = currentQuestion.options[3];
            correctAnswer = currentQuestion.correctAnswer; // Update the correct answer variable
            resetMoneyOutputs(); // Reset the money placed on the answers back to 0 for the next question
        } else {
            endGame(); // End the game if there are no more questions
        }
    }

    // Function to move to the next question
    function nextQuestion() {
        updateTotalMoney(); // Update the money from the money placed on the answers and display it to the total money 
        currentIndex++; // Move to the next question
        nextQuestionElement.style.visibility = 'hidden'; // Hide the next question button so user only has option to click submit answer
        if (currentIndex < quizQuestions.length) { // Check if there are more questions.
            showQuestion(); // Show the next question
        } else {
            endGame(); // End the game if there are no more questions
        }
    }

    // Function to end the game
    function endGame() {
        if (totalMoney <= "0") { // Check if the player has no money left
            questionElement.innerHTML = "You lose! You have no money left."; // Display losing message
            nextQuestionElement.innerHTML = "Restart"; // Change next question button to restart button
            nextQuestionElement.addEventListener("click", restartGame); // Add event listener for restart
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset current question index to start with question 1 again
        totalMoney = "1,000,000"; // Reset total money
        updateTotalMoney(); // Update the displayed total money, which is the 1,000,000 which the user lost in the previous game
        startGame(); // Restart the game from question 1 again
        nextQuestionElement.removeEventListener("click", restartGame); // Remove event listener for restart which was placed on it in endGame function
    }

    // Function to submit the selected answer
    function submitAnswer() {
        let moneyAValue = parseInt(moneyA.innerText) || 0; // this is to convert the money integer (number) placed on the answer to a string. // and default to 0 if the conversion results in NaN (e.g., if the text is not a number or is empty).
        let moneyBValue = parseInt(moneyB.innerText) || 0;
        let moneyCValue = parseInt(moneyC.innerText) || 0;
        let moneyDValue = parseInt(moneyD.innerText) || 0;
        nextQuestionElement.style.visibility = 'visible'; // Show the next question button

        // Check if the selected answer is correct and return the money to total
        if (answerA.innerText === correctAnswer && moneyAValue > 0) {
            totalMoney += moneyAValue;
        } else {
            moneyA.innerText = "DROPPED!"; // Reset the money for the wrong answer to 0
        }
        if (answerB.innerText === correctAnswer && moneyBValue > 0) {
            totalMoney += moneyBValue;
        } else {
            moneyB.innerText = "DROPPED!";
        }
        if (answerC.innerText === correctAnswer && moneyCValue > 0) {
            totalMoney += moneyCValue;
        } else {
            moneyC.innerText = "DROPPED!";
        }
        if (answerD.innerText === correctAnswer && moneyDValue > 0) {
            totalMoney += moneyDValue;
        } else {
            moneyD.innerText = "DROPPED!";
        }

        updateTotalMoney(); // Update the displayed total money from the money placed on anwer to total money 

        // Check if total money is zero after the answer is submitted and it's incorrect
        if (totalMoney <= 0) {
            endGame(); // End the game if the player has no money left
        }
    }

    // Function to increment the money for a selected answer
    function increment(id) {
        let element = document.getElementById(id);
        let currentValue = parseInt(element.innerText) || 0;
        if (totalMoney >= 100000) { // Check if there is enough money to increment
            currentValue += 100000; // Increment by 100,000
            totalMoney -= 100000; // Deduct 100,000 from total money
            element.innerText = currentValue; // Update the displayed value
            updateTotalMoney(); // Update the displayed total money
        }
    }

    // Function to decrement the money for a selected answer
    function decrement(id) {
        // Find the HTML element with the specified ID (moneyA, etc which is the moeny stored in the answer) and store a reference to it in the 'element' variable.
        let element = document.getElementById(id); 
        // Get the text content of the element, convert it to an integer, and default to 0 if the conversion results in NaN.
        let currentValue = parseInt(element.innerText) || 0;
        if (currentValue >= 100000) { // Check if there is enough money to decrement
            currentValue -= 100000; // Decrement by 100,000
            totalMoney += 100000; // Add 100,000 to total money
            element.innerText = currentValue; // Update the displayed value
            updateTotalMoney(); // Update the displayed total money
        }
    }

    // Function to reset the money outputs for all answer options
    function resetMoneyOutputs() {
        moneyA.innerText = "0";
        moneyB.innerText = "0";
        moneyC.innerText = "0";
        moneyD.innerText = "0";
    }

    // Add event listeners for game controls
    startGameElement.addEventListener("click", function() {
        startGame();
    });

    nextQuestionElement.addEventListener("click", function() {
        nextQuestion();
    });

    submitAnswerElement.addEventListener("click", function() {
        submitAnswer();
    });

nextQuestionElement.addEventListener("click", function(){
    nextQuestion()
})

submitAnswerElement.addEventListener("click", function(){
    submitAnswer()
})

// Expose increment and decrement functions to the global scope
window.increment = increment;
window.decrement = decrement;

// Music Icons Toggler

// document.addEventListener('DOMContentLoaded', (event) => {
//     const musicToggleOn = document.getElementById('music-toggle-on');
//     const musicToggleOff = document.getElementById('music-toggle-off');

//     musicToggleOn.addEventListener('click', () => {
//         musicToggleOn.style.display = 'none';
//         musicToggleOff.style.display = 'inline'; // or 'block' if it needs to be block-level
//     });

//     musicToggleOff.addEventListener('click', () => {
//         musicToggleOff.style.display = 'none';
//         musicToggleOn.style.display = 'inline'; // or 'block' if it needs to be block-level
//     });
// });

});
