const questions = [
    {
        question: "If you had a free day with no obligations, what would you most likely spend it doing?",
        options: [
            "Experimenting or learning something new on your own",
            "Working on a group project or planning an event",
            "Discussing social issues or current events",
            "Writing, drawing, or exploring a new book"
        ]
    },
    {
        question: "Which of these activities would you enjoy most at a school event?",
        options: [
            "Presenting a science fair project or explaining a concept",
            "Organizing and leading the event",
            "Participating in a debate or discussion group",
            "Performing on stage, writing a piece, or displaying art"
        ]
    },
    {
        question: "If you could spend an afternoon with someone inspiring, who would you choose?",
        options: [
            "A scientist who made a groundbreaking discovery",
            "A successful entrepreneur or business leader",
            "A public speaker who advocates for social change",
            "An artist, writer, or historian"
        ]
    },
    {
        question: "When you're faced with a difficult problem, how do you typically approach it?",
        options: [
            "Break it down step-by-step and experiment with solutions",
            "Look at it practically and prioritize an efficient outcome",
            "Analyze the underlying causes and discuss it with others",
            "Think creatively and try to look at it from different perspectives"
        ]
    },
    {
        question: "How do you feel about rules and systems?",
        options: [
            "I appreciate them when they're logical and structured",
            "I follow them but also look for ways to improve or optimize",
            "I question them and consider if they're fair to everyone",
            "I like flexibility and prefer systems that allow for creative freedom"
        ]
    },
    {
        question: "In a group project, what role do you naturally take on?",
        options: [
            "Researcher – I like gathering data and making sure everything is accurate",
            "Leader – I prefer managing tasks and ensuring the team stays on track",
            "Strategist – I enjoy debating ideas and analyzing different perspectives",
            "Creator – I focus on making the project engaging and aesthetically pleasing"
        ]
    },
    {
        question: "What do you hope to achieve in your future career?",
        options: [
            "Contribute to new discoveries or innovations that benefit society",
            "Build something meaningful, whether a company or a community",
            "Advocate for change and help others see the bigger picture",
            "Express myself and influence culture or understanding through my work"
        ]
    },
    {
        question: "What does success mean to you?",
        options: [
            "Pushing the boundaries of knowledge and discovery",
            "Building a stable career with tangible achievements",
            "Making a difference and having an impact on society",
            "Creating something memorable and leaving a legacy"
        ]
    }
];

let currentQuestion = 0;
const questionContainer = document.getElementById('questionContainer');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const resultElement = document.getElementById('result');

function showQuestion(index) {
    questionContainer.innerHTML = '';
    const questionBox = document.createElement('div');
    questionBox.className = 'question-box';

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = questions[index].question;
    questionBox.appendChild(questionElement);

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    questions[index].options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(optionElement, optionIndex);
        optionsElement.appendChild(optionElement);
    });

    questionBox.appendChild(optionsElement);
    questionContainer.appendChild(questionBox);

    setTimeout(() => {
        questionBox.classList.add('active');
    }, 10);

    updateButtons();
}

function selectOption(optionElement, optionIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    optionElement.classList.add('selected');
    questions[currentQuestion].selectedOption = optionIndex;
}

function updateButtons() {
    prevButton.style.display = currentQuestion > 0 ? 'block' : 'none';
    nextButton.style.display = currentQuestion < questions.length - 1 ? 'block' : 'none';
    submitButton.style.display = currentQuestion === questions.length - 1 ? 'block' : 'none';
}

prevButton.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
});

submitButton.addEventListener('click', calculateResults);

function calculateResults() {
    let scienceCount = 0;
    let managementCount = 0;
    let lawCount = 0;
    let humanitiesCount = 0;

    questions.forEach(question => {
        switch(question.selectedOption) {
            case 0:
                scienceCount++;
                break;
            case 1:
                managementCount++;
                break;
            case 2:
                lawCount++;
                break;
            case 3:
                humanitiesCount++;
                break;
        }
    });

    let result = '';
    if (scienceCount >= managementCount && scienceCount >= lawCount && scienceCount >= humanitiesCount) {
        result = "Based on your responses, we recommend the Science stream for you!";
    } else if (managementCount >= scienceCount && managementCount >= lawCount && managementCount >= humanitiesCount) {
        result = "Based on your responses, we recommend the Management stream for you!";
    } else if (lawCount >= scienceCount && lawCount >= managementCount && lawCount >= humanitiesCount) {
        result = "Based on your responses, we recommend the Law stream for you!";
    } else {
        result = "Based on your responses, we recommend the Humanities stream for you!";
    }

    resultElement.textContent = result;
    questionContainer.style.display = 'none';
    document.querySelector('.button-container').style.display = 'none';
}

showQuestion(currentQuestion);