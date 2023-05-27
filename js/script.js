const questions = [
  {
    question: "Who are the 4th Generation Leaders?",
    answers: [
      { text: "BTS", correct: false},
      { text: "Stray Kids", correct: false},
      { text: "One Direction", correct: false},
      { text: "ATEEZ", correct: true}
    ]
  },
  {
    question: "How many members are in ATEEZ?",
    answers: [
      { text: "7 as ENHYPEN", correct: false},
      { text: "8 as ATEEZ", correct: true},
      { text: "5 as TXT", correct: false},
      { text: "6 as MONSTA X", correct: false}
    ]
  },
  {
    question: "Who is the leader of ATEEZ?",
    answers: [
      { text: "Hongjoong", correct: false},
      { text: "Mingi", correct: false},
      { text: "Wooyoung", correct: false},
      { text: "Wrong, he's called « Captain »", correct: true}
    ]
  },
  {
    question: "How much do ATEEZ members have to give Hongjoong if they call him 'Leader' instead of 'Captain'?",
    answers: [
      { text: "50,000 ₩", correct: true},
      { text: "100,000 ₩", correct: false},
      { text: "25,000 ₩", correct: false},
      { text: "There is no such thing lol", correct: false}
    ]
  },
  {
    question: "It is known that Seonghwa is an all-rounder and can do anything, but still there is something he cannot do.",
    answers: [
      { text: "Cook very well", correct: false},
      { text: "Sing while having nosebleeds", correct: false},
      { text: "Sit cross-legged", correct: true},
      { text: "He really can do anything", correct: false}
    ]
  },
  {
    question: "What is Yunho's favorite color?",
    answers: [
      { text: "Dark Blue and Cement", correct: false},
      { text: "Blue, because that's the color of his microphone", correct: false},
      { text: "White, because he originally wanted a white microphone", correct: false},
      { text: "All the colors", correct: true}
    ]
  },
  {
    question: "In which ATEEZ song does Yeosang have the most lines?",
    answers: [
      { text: "About 27.3 seconds in 'Dreamers'", correct: true},
      { text: "About 23.5 seconds in 'Say My Name'", correct: false},
      { text: "About 21.2 seconds in 'Cyberpunk'", correct: false},
      { text: "Bold of you to assume he really has lines", correct: false}
    ]
  },
  {
    question: "How old was grandpa San?",
    answers: [
      { text: "75", correct: false},
      { text: "64", correct: false},
      { text: "82", correct: true},
      { text: "Same age as San, next question", correct: false}
    ]
  },
  {
    question: "What is Mingi's greatest talent?",
    answers: [
      { text: "Rapping really fast", correct: false},
      { text: "Never lying", correct: true},
      { text: "Eating mint chocolate ice cream", correct: false},
      { text: "Sleeping", correct: false}
    ]
  },
  {
    question: "Wooyoung has many hobbies, but most of all he loves to:",
    answers: [
      { text: "Kiss the members", correct: false},
      { text: "Bully Seonghwa", correct: true},
      { text: "Collect idol friends like pokemon", correct: false},
      { text: "When Hongjoong treats him badly", correct: false}
    ]
  },
  {
    question: "How many apples has Jongho split in half, with his bare hands, so far?",
    answers: [
      { text: "10", correct: false},
      { text: "14", correct: false},
      { text: "24 and a watermelon", correct: false},
      { text: "A lot and still counting", correct: true}
    ]
  }
];


const questionElement = document.getElementById('question');
const answerElements = document.querySelector('.quiz-options');
const checkButton = document.getElementById('check-answer');
const playAgainBtn = document.getElementById('play-again');
const streamBtn = document.getElementById('stream');
const correctScore = document.getElementById('correct-score');
const totalQuestion = document.getElementById('total-question');
const _result = document.getElementById('result');

let correctAnswer = "";
let currentQuestionIndex = 0, score = askedCount = 0, total = 11;

const soundSelection = new Audio();
soundSelection.src = "sounds/selection.wav";

// event listeners
function eventListeners(){
  checkButton.addEventListener('click', checkAnswer);
  playAgainBtn.addEventListener('click', restartQuiz);
  streamBtn.addEventListener('click', linkStream);
}

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
  eventListeners();
  totalQuestion.textContent = total;
  correctScore.textContent = score;

  currentQuestionIndex = 0;
})

function startQuiz(){
  currentQuestionIndex = 0;
  showQuestion();
}

function showQuestion(){
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const li = document.createElement("li");
    li.innerHTML = answer.text;
    li.classList.add("ans");
    answerElements.appendChild(li);
    if(answer.correct){
      correctAnswer = answer.text;
      li.dataset.correct = answer.correct;
    }
  });
  selectOption();
}

function selectOption(){
  answerElements.querySelectorAll('li').forEach((option) => {
    option.addEventListener('click', () =>{
      playSound("sounds/selected.wav");
      if(answerElements.querySelector('.selected')){
        const activeOption = answerElements.querySelector('.selected');
        activeOption.classList.remove('selected');
      }
      option.classList.add('selected');
    });
  });
  checkButton.style.display = "block";
}

function checkAnswer(){
  checkButton.disabled = true;
  if(answerElements.querySelector('.selected')) {
      let selectedAnswer = answerElements.querySelector('.selected').textContent;
      if(selectedAnswer.trim() === HTMLDecode(correctAnswer)){
        score++;
        playSound("sounds/correct-answer.wav");
        _result.innerHTML = `<p><i class="fas fa-check"></i>Correct</p>`;
      } else {
        playSound("sounds/wrong-answer.wav");
        _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect</p> <p><small><b>Correct Answer: </b>${correctAnswer}</small></p>`;
      }
      checkCount();
      checkButton.style.display = "none";
  } else {
    playSound("sounds/error.wav");
    _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option</p>`
    checkButton.disabled = false;
  }
}

function playSound(sound){
  let soundPlayer = new Audio(sound);
  soundPlayer.play();
}
function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

function HTMLDecode(textString){
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function checkCount(){
  askedCount++;
  setCount();
  if(askedCount > total){
    showScore();
  } else {
    setTimeout(() => {
      handleNextButton();
    }, 2500);
  }
}

function setCount(){
  totalQuestion.textContent = total;
  correctScore.textContent = score;
}

function resetState(){
  checkButton.disabled = false;
  _result.innerHTML = "";

  while(answerElements.firstChild){
    answerElements.removeChild(answerElements.firstChild);
  }
}

function showScore(){
  resetState();

  if(score == total) {
    _result.innerHTML = `<p>Wow, you're truly an ATINY. No comment</p>`;
  } else if(score < total && score >= 8) {
    _result.innerHTML = `<p>You do know ATEEZ very well. Good job and keep it up!</p>`;
  } else if(score < 8 && score >= 6){
    _result.innerHTML = `<p>Not bad, but you could do better. Pay more attention next time</p>`;
  } else if(score < 6 && score >= 4){
    _result.innerHTML = `<p>Your knowledge is quite limited. Time to learn some more!</p>`;
  } else if(score < 4 && score >= 1){
    _result.innerHTML = `<p>Your score is very disappointing. Watch ATEEZ content and you'll find the answers</p>`;
  } else {
    _result.innerHTML = `<p>You know nothing about ATEEZ. Why are you even here?</p>`;
  }

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  checkButton.style.display = "none";
  playAgainBtn.style.display = "block";
  streamBtn.style.display = "block";
}

function restartQuiz(){
  playSound("sounds/selected.wav");
  score = askedCount = 0;
  playAgainBtn.style.display ="none";
  streamBtn.style.display ="none";
  checkButton.style.display = "block";
  checkButton.disabled = false;
  setCount();
  startQuiz();
}

function linkStream(){
  playSound("sounds/selected.wav");
  //location.href = streamBtn.value;  // to open on the same page
  window.open(streamBtn.value, '_blank');   // to open a new tab
}

