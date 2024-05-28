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

// 20 lines startGame function

function startGame() {
    showQuestion();
}

















// 20 lines for showQuestion function

function showQuestion() {
    const question = quizQuestions[0].question;
    questionElement.innerHTML = `<h4>${question}</h4>`;
}

















// 20 lines of nextQuestion function



















// 20 lines endGame function



















// 20 lines submitAnswer function



















// 20 lines for increment function



















// 20 lines of decrement function



















// addEventListeners 

startGameElement.addEventListener("click", function() {
    startGame();
})


