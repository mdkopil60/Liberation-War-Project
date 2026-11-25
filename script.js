
// ===============================
// Mobile Menu
// ===============================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    menuBtn.innerHTML = mobileMenu.classList.contains("hidden")
        ? "☰"
        : "✕";
});

// Close menu after clicking a link

const mobileLinks = mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuBtn.innerHTML = "☰";
    });
});


// ===============================
// Liberation War Timeline
// ===============================

const timelineData = [
    {
        date: "7 March 1971",
        title: "Historic Speech",
        description: "Sheikh Mujibur Rahman delivered his historic speech at the Racecourse Ground."
    },
    {
        date: "25 March 1971",
        title: "Operation Searchlight",
        description: "The Pakistan Army launched a brutal military operation in Dhaka."
    },
    {
        date: "26 March 1971",
        title: "Independence Day",
        description: "Bangladesh declared its independence and began its Liberation War."
    },
    {
        date: "17 April 1971",
        title: "Mujibnagar Government",
        description: "The provisional government of Bangladesh was formally sworn in."
    },
    {
        date: "16 December 1971",
        title: "Victory Day",
        description: "Bangladesh achieved victory after nine months of Liberation War."
    }
];

const timelineContainer = document.getElementById("timelineContainer");

timelineData.forEach((event, index) => {

    const card = document.createElement("div");

    card.className = `
        bg-white p-6 rounded-xl shadow-md
        border-t-4 border-green-700
        hover:-translate-y-2 hover:shadow-xl
        transition duration-300
    `;

    card.innerHTML = `
        <div class="w-12 h-12 bg-red-100 text-red-600
            rounded-full flex items-center justify-center
            font-bold text-xl mb-4">
            ${index + 1}
        </div>

        <h3 class="text-green-800 font-bold text-lg">
            ${event.date}
        </h3>

        <h4 class="text-xl font-bold mt-3 mb-2">
            ${event.title}
        </h4>

        <p class="text-gray-600 leading-7">
            ${event.description}
        </p>
    `;

    timelineContainer.appendChild(card);

});


// ===============================
// Liberation War Quiz
// ===============================

const quizData = [

    {
        question: "When did Bangladesh declare its independence?",
        options: [
            "21 February 1952",
            "26 March 1971",
            "16 December 1971",
            "7 March 1971"
        ],
        answer: 1
    },

    {
        question: "When is Victory Day celebrated in Bangladesh?",
        options: [
            "26 March",
            "21 February",
            "16 December",
            "17 April"
        ],
        answer: 2
    },

    {
        question: "How many months did the Liberation War last?",
        options: [
            "3 Months",
            "6 Months",
            "9 Months",
            "12 Months"
        ],
        answer: 2
    },

    {
        question: "Who was the Commander-in-Chief of Bangladesh Forces?",
        options: [
            "M. A. G. Osmani",
            "Tajuddin Ahmad",
            "Sheikh Mujibur Rahman",
            "Maulana Bhashani"
        ],
        answer: 0
    },

    {
        question: "When was the Mujibnagar Government sworn in?",
        options: [
            "7 March 1971",
            "17 April 1971",
            "26 March 1971",
            "16 December 1971"
        ],
        answer: 1
    }

];

let currentQuestion = 0;
let totalScore = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("questionNumber");


// Show Question

function loadQuestion() {

    answered = false;

    const currentQuiz = quizData[currentQuestion];

    questionElement.innerText = currentQuiz.question;

    questionNumber.innerText =
        `Question ${currentQuestion + 1} / ${quizData.length}`;

    scoreElement.innerText = `Score: ${totalScore}`;

    resultElement.innerText = "";

    optionsElement.innerHTML = "";

    nextBtn.innerText = "Next Question →";
    nextBtn.disabled = true;
    nextBtn.classList.add("opacity-50", "cursor-not-allowed");

    currentQuiz.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.innerText = option;

        button.className = `
            w-full p-4 rounded-lg border-2 border-gray-200
            text-left font-medium
            hover:bg-green-50 hover:border-green-600
            transition duration-200
        `;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsElement.appendChild(button);

    });

}


// Check Answer

function checkAnswer(selectedIndex) {

    if (answered) return;

    answered = true;

    const correctAnswer = quizData[currentQuestion].answer;

    const allOptions = optionsElement.querySelectorAll("button");

    allOptions.forEach((button, index) => {

        button.disabled = true;

        if (index === correctAnswer) {

            button.classList.remove("border-gray-200");
            button.classList.add(
                "bg-green-100",
                "border-green-600",
                "text-green-800"
            );

        } else if (index === selectedIndex) {

            button.classList.remove("border-gray-200");
            button.classList.add(
                "bg-red-100",
                "border-red-600",
                "text-red-800"
            );

        }

    });

    if (selectedIndex === correctAnswer) {

        totalScore++;

        resultElement.innerText = "Correct Answer! 🎉";

        resultElement.className =
            "mt-6 font-bold text-green-600";

    } else {

        resultElement.innerText = "Wrong Answer! Try Again.";

        resultElement.className =
            "mt-6 font-bold text-red-600";

    }

    scoreElement.innerText = `Score: ${totalScore}`;

    nextBtn.disabled = false;
    nextBtn.classList.remove("opacity-50", "cursor-not-allowed");

    if (currentQuestion === quizData.length - 1) {
        nextBtn.innerText = "See Final Result";
    }

}


// Next Question

nextBtn.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showFinalResult();

    }

});


// Final Result

function showFinalResult() {

    questionNumber.innerText = "Quiz Completed!";

    questionElement.innerText =
        `Your Final Score: ${totalScore} / ${quizData.length}`;

    optionsElement.innerHTML = "";

    let message = "";

    if (totalScore === quizData.length) {

        message = "Excellent! You are a Liberation War Expert! 🏆";

    } else if (totalScore >= 3) {

        message = "Great Job! Keep Learning! 👏";

    } else {

        message = "Keep Practicing! Learn More About 1971. ❤️";

    }

    resultElement.innerText = message;

    resultElement.className =
        "mt-6 font-bold text-green-700";

    nextBtn.innerText = "Play Again";

    nextBtn.disabled = false;

    nextBtn.classList.remove(
        "opacity-50",
        "cursor-not-allowed"
    );

    nextBtn.onclick = () => {

        currentQuestion = 0;
        totalScore = 0;

        nextBtn.onclick = null;

        loadQuestion();

    };

}


// Start Quiz

loadQuestion();
