
const questions = [
  {
    question: "1. Który ptak jest najszybszy na świecie podczas lotu nurkowego?",
    answers: [
      "Orzeł przedni",
      "Sokół wędrowny",
      "Jerzyk zwyczajny",
      "Jaskółka dymówka"
    ],
    correct: 1,
    explanation: "Sokół wędrowny podczas nurkowania na zdobycz może przekraczać prędkość 300 km/h."
  },
  {
    question: "2. Który z tych ptaków jest największy na świecie?",
    answers: [
      "Trzewikodziób",
      "Kondor wielki",
      "Struś afrykański",
      "Albatros wędrowny"
    ],
    correct: 2,
    explanation: "Struś afrykański to największy i najcięższy żyjący współcześnie ptak."
  },
  {
    question: "3. Który ptak potrafi latać do tyłu?",
    answers: [
      "Koliber",
      "Dzięcioł",
      "Pliszka górska",
      "Sowa"
    ],
    correct: 0,
    explanation: "Kolibry potrafią zawisać w powietrzu i latać do tyłu dzięki wyjątkowej budowie skrzydeł."
  },
  {
    question: "4. Dlaczego flamingi mają różowe upierzenie?",
    answers: [
      "Ponieważ mają ukrwione pióra",
      "Dzięki specjalnym bakteriom na piórach",
      "Ponieważ rodzą się z piórami o różowym pigmencie",
      "Dzięki barwnikom w pożywieniu"
    ],
    correct: 3,
    explanation: "Karotenoidy obecne między innymi w algach i małych skorupiakach wpływają na różową barwę flamingów."
  },
  {
    question: "5. Który ptak nie potrafi latać i jest świetnym pływakiem?",
    answers: [
      "Maskonur",
      "Pingwin",
      "Albatros",
      "Kiwi"
    ],
    correct: 1,
    explanation: "Skrzydła pingwinów są przystosowane do pływania."
  },
  {
    question: "6. Który ptak odbywa wyjątkowo długie wędrówki między Arktyką a Antarktyką?",
    answers: [
      "Wróbel zwyczajny",
      "Sikora bogatka",
      "Rybitwa popielata",
      "Dudek"
    ],
    correct: 2,
    explanation: "Rybitwa popielata migruje między Arktyką a rejonami Antarktyki, pokonując ogromne odległości."
  },
  {
    question: "7. Który ptak ma nozdrza blisko końca dzioba?",
    answers: [
      "Kiwi",
      "Paw",
      "Kaczka krzyżówka",
      "Kukułka"
    ],
    correct: 0,
    explanation: "Kiwi ma nozdrza blisko końca długiego dzioba, co pomaga mu wykrywać pokarm w ziemi."
  },
  {
    question: "8. Który ptak potrafi rozpoznawać ludzkie twarze?",
    answers: [
      "Gołąb grzywacz",
      "Kruk",
      "Sójka",
      "Bażant"
    ],
    correct: 1,
    explanation: "Badania wskazują, że kruki potrafią rozpoznawać ludzkie twarze i zapamiętywać poszczególne osoby."
  },
  {
    question: "9. Który ptak ma oczy skierowane do przodu, co pomaga mu oceniać odległość podczas polowania?",
    answers: [
      "Sowa",
      "Gołąb",
      "Struś",
      "Flaming"
    ],
    correct: 0,
    explanation: "Oczy sów są skierowane do przodu, co zapewnia im dobre widzenie przestrzenne."
  },
  {
    question: "10. Który ptak słynie z największej rozpiętości skrzydeł spośród współcześnie żyjących ptaków?",
    answers: [
      "Bielik",
      "Pelikan kędzierzawy",
      "Kondor kalifornijski",
      "Albatros wędrowny"
    ],
    correct: 3,
    explanation: "Albatros wędrowny może mieć rozpiętość skrzydeł przekraczającą 3,5 metra."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
const quizContent = document.getElementById("quiz-content");


//Renderowanie quizu
function renderQuestion() {
  answered = false;

  const q = questions[currentQuestion];
  //Wyświetlenie pytania i odpowiedzi w html
  quizContent.innerHTML = `
    <div class="progress">
      Pytanie ${currentQuestion + 1} z ${questions.length}
    </div>

    <h3>${q.question}</h3>

    <div id="answers">
      ${q.answers.map((answer, index) => `
        <button class="answer" data-index="${index}">
          ${String.fromCharCode(65 + index)}. ${answer}
        </button>
      `).join("")}
    </div>
    <!-- rezerwacja miejsca na feedback po odpowiedzi --> 
    <div id="feedback" class="feedback"></div> 
    <div id="next-container"></div>
  `;

  document.querySelectorAll('.answer').forEach(button => {
    button.addEventListener("click", () => {
      checkAnswer(Number(button.dataset.index));
    });
  });
}

//s
function checkAnswer(selected) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll('.answer');
  const feedback = document.getElementById("feedback");

  buttons.forEach(button => {
    button.disabled = true;
  });

  buttons[q.correct].classList.add("correct");

  if (selected === q.correct) {
    score++;

    feedback.innerHTML = `
      <strong>Brawo! Dobra odpowiedź!</strong><br>
      ${q.explanation}
    `;
  } else {
    buttons[selected].classList.add("wrong");

    feedback.innerHTML = `
      <strong>Odpowiedź nieprawidłowa..</strong><br>
      Prawidłowa odpowiedź: ${q.answers[q.correct]}.<br>
      ${q.explanation}
    `;
  }

  const nextContainer = document.getElementById("next-container");

  nextContainer.innerHTML = `
    <button class="main-button" id="next-question">
      ${
        currentQuestion === questions.length - 1 ? "Zobacz wynik" : "Następne pytanie ->"
      }
    </button>
  `;

  document.getElementById("next-question").addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  });
}

function showResult() {
  const percentage = Math.round((score / questions.length) * 100);

  let message;

  if (score === questions.length) { //tutaj chronimy się przed błędem  jesli dodamy pytania to się nie zepsuje
    message = "Gratulacje! Znasz wiele ciekawostek o ptakach! :3";
  } else if (score >= questions.length * 0.7) {
    message = "Świetny wynik! Wiesz naprawdę dużo o ptakach!";
  } else if (score >= questions.length * 0.4) {
    message = "Całkiem nieźle Ci poszło!";
  } else {
    message = "Nie martw się! Spróbuj ponownie!";
  }

  // Wyświetlenie wyniu quizu w html
  quizContent.innerHTML = `
    <div class="result">
      <h3>To już wszystkie pytania!</h3>
      <p class="score">${score} / ${questions.length} punktów</p>
      <p>Twój wynik: ${percentage}%</p>
      <p>${message}</p>

      <button class="main-button" id="restart-quiz">
        Zagraj ponownie
      </button>
    </div>
  `;

  document.getElementById("restart-quiz").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    renderQuestion();
  });
}

renderQuestion();
