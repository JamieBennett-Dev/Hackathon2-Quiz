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

let currentIndex = 0;
let correctAnswer = ''; // Initialize correctAnswer variable
let totalMoney = "1,000,000";



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
    let moneyAValue = parseInt(moneyA.innerText) || 0;
    let moneyBValue = parseInt(moneyB.innerText) || 0;
    let moneyCValue = parseInt(moneyC.innerText) || 0;
    let moneyDValue = parseInt(moneyD.innerText) || 0;
    nextQuestionElement.style.visibility = 'visible';


    // Check if no money has been allocated to any answer
    if (moneyAValue === 0 && moneyBValue === 0 && moneyCValue === 0 && moneyDValue === 0) {
        alert("Please allocate money to at least one answer before submitting.");
        return; // Exit the function early if no money is allocated
    }

// If the correct answer is clicked, return the money to total
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
        
        updateTotalMoney();

        // Check if total money is zero after the answer is submitted and it's incorrect
        if (totalMoney <= 0) {
            endGame();
        }
};

// 20 lines increment and decrement functions
function increment(id) {
    let element = document.getElementById(id);
    let currentValue = parseInt(element.innerText) || 0;
    if (totalMoney >= 100000) {
        currentValue += 100000;
        totalMoney -= 100000;
        element.innerText = currentValue;
        updateTotalMoney();
    }
}

function decrement(id) {
    let element = document.getElementById(id);
    let currentValue = parseInt(element.innerText) || 0;
    if (currentValue >= 100000) {
        currentValue -= 100000;
        totalMoney += 100000;
        element.innerText = currentValue;
        updateTotalMoney();
    }
}


function resetMoneyOutputs() {
    moneyA.innerText = "0";
    moneyB.innerText = "0";
    moneyC.innerText = "0";
    moneyD.innerText = "0";
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

// Instructions Pop Up

function instructionsPopUp()  {
    let myText = `
Aim: Player starts with £1000000 and must answer 8 muliple choice questions to keep as much money as possible.

1. Click Start.
2. Choose how to divide the cash.
3. Click Submit answer.
4. Click Next Question.
5. Repeat until player runs out of money or completes all questions.

    `;
    alert (myText);
  }
    


