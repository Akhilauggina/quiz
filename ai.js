function toggleMenu() {
    const menu = document.getElementById("myMenu");
    menu.classList.toggle("active");
}


const questions = [
    {
        question: "What does AI stand for?",
        answers: ["Artificial Intelligence", "Automated Information", "Advanced Input", "Applied Intelligence"],
        correct: "Artificial Intelligence"
    },
    {
        question: "Which of these is a common application of AI?",
        answers: ["Washing dishes", "Self-driving cars", "Folding laundry", "Mowing the lawn"],
        correct: "Self-driving cars"
    },
    {
        question: "What is machine learning?",
        answers: ["A type of computer hardware", "A way for computers to learn from data without explicit programming", "A programming language", "A type of robot"],
        correct: "A way for computers to learn from data without explicit programming"
    },
    {
        question: "What is a neural network?",
        answers: ["A network of computers", "A type of mathematical model inspired by the human brain", "A social network", "A type of internet connection"],
        correct: "A type of mathematical model inspired by the human brain"
    },
    {
        question: "Which of these is an example of AI in everyday life?",
        answers: ["A light switch", "A calculator", "A spam filter in email", "A hammer"],
        correct: "A spam filter in email"
    },
    {
        question: "What is the goal of AI?",
        answers: ["To replace all human jobs", "To create machines that can perform tasks that typically require human intelligence", "To build robots that look exactly like humans", "To control the world"],
        correct: "To create machines that can perform tasks that typically require human intelligence"
    },
    {
        question: "What is a chatbot?",
        answers: ["A robot that can walk and talk", "A computer program designed to simulate conversation with human users", "A type of computer virus", "A device that translates languages in real-time"],
        correct: "A computer program designed to simulate conversation with human users"
    },
    {
        question: "Which of these is a potential benefit of AI?",
        answers: ["Increased efficiency and productivity", "Job losses", "Machines taking over the world", "Increased pollution"],
        correct: "Increased efficiency and productivity"
    },
    {
        question: "What is data in the context of AI?",
        answers: ["Physical objects", "Information used to train AI models", "Computer hardware", "Electricity"],
        correct: "Information used to train AI models"
    },
    {
        question: "10.What is the difference between AI and robots?",
        answers: ["They are the same thing", "AI is the intelligence, while robots are the physical machines that can be controlled by AI", "Robots are more intelligent than AI", "AI is only used in science fiction"],
        correct: "AI is the intelligence, while robots are the physical machines that can be controlled by AI"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 600;
 // 10 minutes in seconds
 let answered=false;

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');
const backButton = document.getElementById('back-btn');
const submitButton = document.getElementById('submit-btn');
const timerElement = document.getElementById('time');
const scoreboard = document.getElementById('scoreboard');
const scoreElement = document.getElementById('score');
const complimentElement = document.getElementById('compliment');

function shuffleQuestions(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array; // Important: Return the shuffled array
}
let shuffledQuestions = shuffleQuestions([...questions]);







function startTimer() {
    const timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}
function showQuestion(index) {
    if (index >= shuffledQuestions.length) {
        submitQuiz(); // Handle the case where all questions have been shown
        return;
    }

    questionElement.innerText = shuffledQuestions[index].question;
    answersElement.innerHTML = '';
    answered = false;

    shuffledQuestions[index].answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, shuffledQuestions[index].correct));
        answersElement.appendChild(button);
    });

    updateNavigationButtons();
}

function selectAnswer(button, correctAnswer) {
    if (answered) return; // Prevent changing answer

    answered = true; // Set the flag to true

    if (button.innerText === correctAnswer) {
        score++;
        button.classList.add('correct'); // Add a class for styling
    } else {
        button.classList.add('incorrect'); // Add a class for styling
    }

    nextButton.style.display = 'inline-block';

    // Immediate Feedback (using setTimeout to remove the class after 1 second)
    setTimeout(() => {
        button.classList.remove('correct');
        button.classList.remove('incorrect');
    }, 1000);
}

function updateNavigationButtons() {
    backButton.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    nextButton.style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
});

backButton.addEventListener('click', () => {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
});

submitButton.addEventListener('click', submitQuiz);

function submitQuiz() {
    scoreboard.style.display = 'block';
    scoreElement.innerText = score;
    complimentElement.innerText = score > 7 ? "Excellent!" : score > 4 ? "Good job!" : "Better luck next time!";
    document.getElementById('question-container').style.display = 'none';
    nextButton.style.display = 'none';
    backButton.style.display = 'none';
    submitButton.style.display = 'none';
}

showQuestion(currentQuestionIndex);
startTimer();
