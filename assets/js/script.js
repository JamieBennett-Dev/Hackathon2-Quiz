document.addEventListener('DOMContentLoaded', () => {
// 15 lines for getElement code

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
const timeLeftElement = document.getElementById("time-left");



// 50 lines for question array and objects
const quizQuestions = [
    // easy questions, 1-3
    {
        question: "What is the smallest prime number?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2"
    },
    {
        question: "Chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Pb"],
        correctAnswer: "Au"
    },
    {
        question: "What is Einstein's theory?",
        options: ["Relativity", "Evolution", "Quantum", "Gravity"],
        correctAnswer: "Relativity"
    },
    // medium questions, 4-6
    {
        question: "What is the currency of Japan?",
        options: ["Yen", "Yuan", "Euro", "Yen"],
        correctAnswer: "Yen"
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Alexander Graham Bell"],
        correctAnswer: "Alexander Graham Bell"
    },
    {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: "Canberra"
    },
    // hard questions, 7-9
    {
        question: "In Greek mythology, who was the goddess of wisdom?",
        options: ["Athena", "Aphrodite", "Hera", "Artemis"],
        correctAnswer: "Athena" 
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correctAnswer: "Mercury" 
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert", "Antarctica", "Arabian Desert", "Gobi Desert"],
        correctAnswer: "Antarctica" 
    },
    // impossible question, 10
    {
        question: "How much wood could a woodchuck chuck, if a woodchuck could chuck wood?",
        options: ["What?", "As much wood as a woodchuck could chuck", "If a woodchuck could chuck wood, would he wood chuck?", "As much wood as a woodchuck could chuck, if a woodchuck could chuck wood."],
        correctAnswer: "As much wood as a woodchuck could chuck, if a woodchuck could chuck wood." 
    }
];

let currentIndex = 0;
let correctAnswer = ''; // Initialize correctAnswer variable
let totalMoney = 1000000;



function formatMoney(amount) {
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(0) + 'M';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + 'k';
    } else {
        return amount.toString();
    }
}

function parseMoney(str) {
    if (str.endsWith('M')) {
        return parseFloat(str.replace('M', '')) * 1000000;
    } else if (str.endsWith('k')) {
        return parseFloat(str.replace('k', '')) * 1000;
    } else {
        return parseFloat(str);
    }
}

function updateTotalMoney() {
    currentMoneyElement.innerHTML = `Total money: £${totalMoney.toLocaleString()}`;
}


// 20 lines startGame function
function startGame () {
    startGameElement.style.visibility = 'hidden';
    nextQuestionElement.style.visibility = 'hidden';
    currentIndex = 0;
    totalMoney = 1000000; // Reset total money
    updateTotalMoney()
    showQuestion();    
}


// 20 lines for showQuestion function
function showQuestion () {
    nextQuestionElement.innerHTML = "Next Question";
    if (currentIndex < quizQuestions.length){
        let currentQuestion = quizQuestions[currentIndex];
        questionElement.innerText = currentQuestion.question;
        // Display current answers
        answerA.innerHTML = currentQuestion.options[0];
        answerB.innerHTML = currentQuestion.options[1];
        answerC.innerHTML = currentQuestion.options[2];
        answerD.innerHTML = currentQuestion.options[3];
        correctAnswer = currentQuestion.correctAnswer; // Update correctAnswer variable 
        resetMoneyOutputs();
        startTimer();
    } else endGame();
}


// 20 lines of nextQustion function
function nextQuestion() {
        // Remove existing animation classes before applying new ones
        answerA.classList.remove('correct-answer', 'wrong-answer');
        answerB.classList.remove('correct-answer', 'wrong-answer');
        answerC.classList.remove('correct-answer', 'wrong-answer');
        answerD.classList.remove('correct-answer', 'wrong-answer');
    submitAnswerElement.style.visibility = 'visible';
    updateTotalMoney();
    currentIndex++;
    nextQuestionElement.style.visibility = 'hidden';
    if (currentIndex < quizQuestions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// 20 lines endGame function
function endGame () {
    if (totalMoney <= "0") {
        questionElement.innerHTML = "You lose! You have no money left.";
        nextQuestionElement.innerHTML = "Restart";
        nextQuestionElement.addEventListener("click", restartGame); // Add event listener for restart
    }
}

function restartGame() {
    currentIndex = 0; // Reset currentIndex
    totalMoney = "1,000,000"; // Reset total money
    updateTotalMoney(); // Update total money display
    submitAnswerElement.style.visibility = "visible";
    startGame(); // Restart the game
    nextQuestionElement.removeEventListener("click", restartGame); // remove event listener for restart
}


// 20 lines submitAnswer function
function submitAnswer() {
    clearInterval(timer); // Stop the timer when answer is submitted
    let moneyAValue = parseMoney(moneyA.innerText) || 0;
    let moneyBValue = parseMoney(moneyB.innerText) || 0;
    let moneyCValue = parseMoney(moneyC.innerText) || 0;
    let moneyDValue = parseMoney(moneyD.innerText) || 0;
    nextQuestionElement.style.visibility = 'visible';


    // Check if no money has been allocated to any answer
    if (moneyAValue === 0 && moneyBValue === 0 && moneyCValue === 0 && moneyDValue === 0) {
        alert("Please allocate money to at least one answer before submitting.");
        return; // Exit the function early if no money is allocated
    }


    // Highlight correct answer regardless of money allocation
    if (answerA.innerText === correctAnswer) {
        answerA.classList.add('correct-answer');
    } else {
        answerA.classList.add('wrong-answer');
    }
    if (answerB.innerText === correctAnswer) {
        answerB.classList.add('correct-answer');
    } else {
        answerB.classList.add('wrong-answer');
    }
    if (answerC.innerText === correctAnswer) {
        answerC.classList.add('correct-answer');
    } else {
        answerC.classList.add('wrong-answer');
    }
    if (answerD.innerText === correctAnswer) {
        answerD.classList.add('correct-answer');
    } else {
        answerD.classList.add('wrong-answer');
    }

    // Update total money and reset the wrong answer money
    if (answerA.innerText === correctAnswer) {
        totalMoney += moneyAValue;
    } else {
        moneyA.innerText = "DROPPED!"; // Reset the money for the wrong answer to 0
    }
    if (answerB.innerText === correctAnswer) {
        totalMoney += moneyBValue;
    } else {
        moneyB.innerText = "DROPPED!";
    }
    if (answerC.innerText === correctAnswer) {
        totalMoney += moneyCValue;
    } else {
        moneyC.innerText = "DROPPED!";
    }
    if (answerD.innerText === correctAnswer) {
        totalMoney += moneyDValue;
    } else {
        moneyD.innerText = "DROPPED!";
    }
    submitAnswerElement.style.visibility = 'hidden';
        
        updateTotalMoney();

        // Check if total money is zero after the answer is submitted and it's incorrect
        if (totalMoney <= 0) {
            endGame();
        }
};

// 20 lines increment and decrement functions
function increment(id) {
    let element = document.getElementById(id);
    let currentValue = parseMoney(element.innerText) || 0;
    if (totalMoney >= 100000) {
        currentValue += 100000;
        totalMoney -= 100000;
        element.innerText = formatMoney(currentValue)
        updateTotalMoney();
    }
}

function decrement(id) {
    let element = document.getElementById(id);
    let currentValue = parseMoney(element.innerText) || 0;
    if (currentValue >= 100000) {
        currentValue -= 100000;
        totalMoney += 100000;
        element.innerText = formatMoney(currentValue);
        updateTotalMoney();
    }
}


function resetMoneyOutputs() {
    moneyA.innerText = "£0";
    moneyB.innerText = "£0";
    moneyC.innerText = "£0";
    moneyD.innerText = "£0";
}

function startTimer() {
    timeLeft = 30; // Set the timer to 30 seconds for each question
    timeLeftElement.innerText = timeLeft; // Display the initial time
    clearInterval(timer); // Clear any existing timer to avoid multiple intervals running simultaneously
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Handle the case when the time is up (e.g., automatically move to the next question)
            nextQuestionElement.style.visibility = 'visible';
            nextQuestionElement.innerHTML = "Restart";
            submitAnswerElement.style.visibility = "hidden";
            questionElement.innerHTML = "You ran out of time! You lose.";
            nextQuestionElement.addEventListener("click", restartGame); // Add event listener for restart
            endGame();
        }
    }, 1000);
}

// addEventListeners 

startGameElement.addEventListener("click", function(){
    startGame();
})

nextQuestionElement.addEventListener("click", function(){
    nextQuestion()
})

submitAnswerElement.addEventListener("click", function(){
    submitAnswer()
})


window.increment = increment;
window.decrement = decrement;
});

// Music Icons Toggler

document.addEventListener('DOMContentLoaded', (event) => {
    const musicToggleOn = document.getElementById('music-toggle-on');
    const musicToggleOff = document.getElementById('music-toggle-off');

    musicToggleOn.addEventListener('click', () => {
        musicToggleOn.style.display = 'none';
        musicToggleOff.style.display = 'inline'; // or 'block' if it needs to be block-level
    });

    musicToggleOff.addEventListener('click', () => {
        musicToggleOff.style.display = 'none';
        musicToggleOn.style.display = 'inline'; // or 'block' if it needs to be block-level
    });
});

// Numbers with correct commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Modal

document.getElementById('instructions').addEventListener('click', function() {
    document.getElementById('modal-container').style.display = 'flex';
});

document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('modal-container').style.display = 'none';
});




