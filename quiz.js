function toggleMenu() {
    const menu = document.getElementById("myMenu");
    menu.classList.toggle("active");
}



const questions = {
    ai: [
        { question: "What is AI?", answers: ["Artificial Intelligence", "Automated Input", "Active Intelligence"], correct: "Artificial Intelligence" },
        { question: "Which language is commonly used for AI?", answers: ["Python", "C++", "HTML"], correct: "Python" }
    ],
    tech: [
        { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], correct: "Hyper Text Markup Language" },
        { question: "Which company developed the iPhone?", answers: ["Apple", "Microsoft", "Samsung"], correct: "Apple" }
    ],
    science: [
        { question: "What planet is known as the Red Planet?", answers: ["Mars", "Earth", "Jupiter"], correct: "Mars" },
        { question: "What is the chemical symbol for water?", answers: ["H2O", "O2", "CO2"], correct: "H2O" }
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const homeContainer = document.getElementById('home-container');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const scoreboard = document.getElementById('scoreboard');
const scoreElement = document.getElementById('score');
const complimentElement = document.getElementById('compliment');

document.querySelectorAll('.topic-btn').forEach(button => {
    button.addEventListener('click', () => {
        const topic = button.getAttribute('data-topic');
        currentQuestions = questions[topic];
        homeContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        showQuestion(currentQuestions[currentQuestionIndex]);
    });
});

function showQuestion(question) {
    questionElement.innerText = question.question;
    answersElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, question.correct));
        answersElement.appendChild(button);
    });
}

function selectAnswer(button, correctAnswer) {
    if (button.innerText === correctAnswer) {
        score++;
    }
    nextButton.style.display = 'inline-block';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
});

submitButton.addEventListener('click', () => {
    scoreboard.style.display = 'block';
    scoreElement.innerText = score;
    if (score === questions.length) {
        complimentElement.innerText = "Excellent!";
    } else if (score > 0) {
        complimentElement.innerText = "Good job!";
    } else {
        complimentElement.innerText = "Better luck next time!";
    }
    questionElement.style.display = 'none';
    answersElement.style.display = 'none';
    submitButton.style.display = 'none';
});

showQuestion(questions[currentQuestionIndex]);


