const subjectSelection = document.getElementById("subject-selection");
const quizBox = document.getElementById("quiz-box");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");
const nextButton = document.getElementById("next-btn");

let currentQIndex = 0;
let score = 0;
let questions = [];

const subjectQuestions = {
  html: [
    {
      Question: "Which HTML element is used to create a hyperlink?",
      answers: [
        { text: "<link>", correct: false },
        { text: "<href>", correct: false },
        { text: "<a>", correct: true },
        { text: "<hyperlink>", correct: false },
      ],
    },
    {
      Question:"Who is the father of HTML?",
      answers: [
        { text: "Rasmus Lerdorf",correct: false},
        { text: "Tim Berners-Lee",correct: true},
        { text: "Brendan Eich",correct: false},
        { text: "Sergey Brin",correct: false},
      ],
    },
    {
      Question:"which tag is used to display an image in HTML?",
      answers:[
        { text: "<image>",correct: false},
        { text: "<src>",correct: false},
        { text: "<img>",correct:true},
        { text: "<pic>",correct: false},
      ],
    },
    {
      Question:" What is the default value for border style in HTML?",
      answers:[
        { text: "soild",correct:true},
        { text: "dotted",correct:false},
        { text: "double",correct:false},
        { text: "wave",correct:false},
      ],
    },
    {
      Question:"Which tag is used to insert table row?",
      answers:[
        { text: "<td>",correct: false },
        { text: "<create row>",correct: false},
        { text: "<tr>",correct: true},
        { text: "<table>",correct: false},
      ],
    },
  ],
  css: [
    {
      Question: "Which property is used to change text color?",
      answers: [
        { text: "font-color", correct: false },
        { text: "text-color", correct: false },
        { text: "color", correct: true },
        { text: "text-style", correct: false },
      ],
    },
    {
      Question:"which HTML tag is used to link an external CSS file?",
      answers: [
         { text: "<style>",correct: false},
         { text: "<script>",correct: false},
         { text: "<css>",correct: false},
         { text: "<link>",correct: true},
      ],
    },
     {
      Question:"How do you change the background color of an element in CSS?",
      answers:[
        { text: "color:background;",correct:false},
        { txet: "bg-color:red;",correct:false},
        { text: "background-color:red;",correct:true},
        { text: "background:text-color:red;",correct:false},          
      ]
     },
     {
      Question:"Which property is used to change the text color of an element?",
      answers:[
        { text: "text-color",correct:false},
        { txet: "font-color",correct:false},
        { text: "color",correct:true},
        { text: "foreground-color",correct:false},          
      ]
     },
     {
      Question:"How do you select an element with the id 'main'?",
      answers:[
        { text: "#main",correct:true},
        { txet: ".main",correct:false},
        { text: "main",correct:false},
        { text: "*main",correct:false},          
      ]
     },
  ],
  js: [
    {
      Question: "Which symbol is used for comments in JavaScript?",
      answers: [
        { text: "//", correct: true },
        { text: "/*", correct: false },
        { text: "<!--", correct: false },
        { text: "#", correct: false },
      ],
    },
    {
      Question: "The 'var' and 'function' are Known as ___________.",
      answers:[
        { text: "Data types",correct:false},
        { texet: "Keywords",correct:true},
        { text: "Prototpes",correct:false},
        { text: "Declaration",correct:false},
      ],
    },
  ],
};

function selectSubject(subject) {
  questions = subjectQuestions[subject];
  subjectSelection.classList.add("hide");
  quizBox.classList.remove("hide");
  startQuiz();
}

function startQuiz() {
  score = 0;
  currentQIndex = 0;
  resultDiv.classList.add("hide");
  restartButton.classList.add("hide");
  nextButton.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.Question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = answer.correct;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer before proceeding.");
    return;
  }

  const isCorrect = selected.value === "true";
  if (isCorrect) {
    score++;
  }

  currentQIndex++;
  if (currentQIndex < questions.length) {
    setNextQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = 'Your final score is: ' + score + ' out of ' + questions.length;

  if (score !== questions.length) {
    restartButton.classList.remove("hide");
  }
}

restartButton.addEventListener("click", () => {
  questionContainer.style.display = "flex";
  startQuiz();
});
