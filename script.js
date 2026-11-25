const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpening = mobileMenu.classList.contains("hidden");

        mobileMenu.classList.toggle("hidden");
        mobileMenu.classList.toggle("flex", isOpening);

        menuBtn.innerHTML = isOpening ? "✕" : "☰";

        menuBtn.setAttribute("aria-expanded", String(isOpening));

    });

    // Close menu after clicking a link
    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");

            menuBtn.innerHTML = "☰";

            menuBtn.setAttribute("aria-expanded", "false");

        });

    });

}

// Dynamic Footer Year

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

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

if (timelineContainer) {

    timelineData.forEach((event, index) => {

        const card = document.createElement("article");

        card.className = `
      bg-white p-6 rounded-xl shadow-md
      border-t-4 border-green-700
      hover:-translate-y-2 hover:shadow-xl
      transition duration-300
    `;

        const number = document.createElement("div");

        number.className = `
      w-12 h-12 bg-red-100 text-red-600
      rounded-full flex items-center justify-center
      font-bold text-xl mb-4
    `;

        number.textContent = index + 1;

        const date = document.createElement("h2");

        date.className = "text-green-800 font-bold text-lg";
        date.textContent = event.date;

        const title = document.createElement("h3");

        title.className = "text-xl font-bold mt-3 mb-2";
        title.textContent = event.title;

        const description = document.createElement("p");

        description.className = "text-gray-600 leading-7";
        description.textContent = event.description;

        card.append(number, date, title, description);

        timelineContainer.appendChild(card);

    });

}

// Liberation War Quiz

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


// Quiz HTML Elements

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("questionNumber");


// Run Quiz Only When Quiz Elements Exist

if (
    questionElement &&
    optionsElement &&
    resultElement &&
    nextBtn &&
    scoreElement &&
    questionNumber
) {

    let currentQuestion = 0;
    let totalScore = 0;
    let answered = false;
    let quizFinished = false;

    // Load Question

    function loadQuestion() {

        answered = false;
        quizFinished = false;

        const currentQuiz = quizData[currentQuestion];

        questionElement.textContent = currentQuiz.question;

        questionNumber.textContent =
            `Question ${currentQuestion + 1} / ${quizData.length}`;

        scoreElement.textContent = `Score: ${totalScore}`;

        resultElement.textContent = "";
        resultElement.className = "mt-6 font-bold";

        optionsElement.innerHTML = "";

        nextBtn.textContent = "Next Question →";
        nextBtn.disabled = true;


        // Show Options

        currentQuiz.options.forEach((option, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.textContent = option;

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

        if (answered || quizFinished) return;

        answered = true;

        const correctAnswer = quizData[currentQuestion].answer;

        const allOptions = optionsElement.querySelectorAll("button");


        allOptions.forEach((button, index) => {

            button.disabled = true;

            // Correct Answer

            if (index === correctAnswer) {

                button.classList.remove("border-gray-200");

                button.classList.add(
                    "bg-green-100",
                    "border-green-600",
                    "text-green-800"
                );

            }

            // Wrong Selected Answer

            else if (index === selectedIndex) {

                button.classList.remove("border-gray-200");

                button.classList.add(
                    "bg-red-100",
                    "border-red-600",
                    "text-red-800"
                );

            }

        });


        // Show Result

        if (selectedIndex === correctAnswer) {

            totalScore++;

            resultElement.textContent = "Correct Answer! 🎉";

            resultElement.className =
                "mt-6 font-bold text-green-600";

        } else {

            resultElement.textContent =
                "Wrong Answer! The correct answer is highlighted.";

            resultElement.className =
                "mt-6 font-bold text-red-600";

        }


        scoreElement.textContent = `Score: ${totalScore}`;

        nextBtn.disabled = false;


        if (currentQuestion === quizData.length - 1) {

            nextBtn.textContent = "See Final Result";

        }

    }

    // Final Result

    function showFinalResult() {

        quizFinished = true;

        questionNumber.textContent = "Quiz Completed!";

        questionElement.textContent =
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


        resultElement.textContent = message;

        resultElement.className =
            "mt-6 font-bold text-green-700";

        nextBtn.textContent = "Play Again";

        nextBtn.disabled = false;

    }
    // Next Question / Play Again

    nextBtn.addEventListener("click", () => {

        // Restart Quiz

        if (quizFinished) {

            currentQuestion = 0;
            totalScore = 0;

            loadQuestion();

            return;

        }

        if (!answered) return;

        currentQuestion++;

        if (currentQuestion < quizData.length) {

            loadQuestion();

        } else {

            showFinalResult();

        }

    });

    // Start Quiz

    loadQuestion();

}
