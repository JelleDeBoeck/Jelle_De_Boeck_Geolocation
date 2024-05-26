var map = L.map('map').setView([50.8503, 4.3517], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var locations = [
  { name: 'België', coordinates: [50.8503, 4.3517] },
  { name: 'Frankrijk', coordinates: [46.603354, 1.888334] },
  { name: 'Duitsland', coordinates: [51.1657, 10.4515] },
  { name: 'Italië', coordinates: [41.8719, 12.5674] },
  { name: 'Nederland', coordinates: [52.1326, 5.2913] }
];

var quizData = [
  { location: 'België', question: "Wat is de hoofdstad van België?", answer: "Brussel" },
  { location: 'Frankrijk', question: "Wat is de grootste stad in Frankrijk?", answer: "Parijs" },
  { location: 'Duitsland', question: "In welke maand vindt het Oktoberfest plaats?", answer: "september" },
  { location: 'Italië', question: "Hoe heet de beroemde schilder van de Mona Lisa?", answer: "Leonardo da Vinci" },
  { location: 'Nederland', question: "Welke artiest ging dit jaar voor Nederland naar het Eurovisie Songfestival?", answer: "Joost Klein" }
];

locations.forEach(function(location) {
  var marker = L.marker(location.coordinates).addTo(map).bindPopup(location.name);
  marker.on('click', function(e) {
    openQuizPopup(location.name);
  });
});

function openQuizPopup(locationName) {
  var quizItem = quizData.find(item => item.location === locationName);
  if (!quizItem) return;

  var quizPopup = document.getElementById('quiz-popup');
  quizPopup.style.display = 'block';

  var quizQuestion = document.getElementById('quiz-question');
  quizQuestion.textContent = quizItem.question;

  var quizResponse = document.getElementById('quiz-response');
  quizResponse.textContent = '';

  var quizAnswerInput = document.getElementById('quiz-answer');
  quizAnswerInput.value = '';
}

function closeQuizPopup() {
  var quizPopup = document.getElementById('quiz-popup');
  quizPopup.style.display = 'none';
}

function checkQuizAnswer() {
  var quizAnswer = document.getElementById('quiz-answer').value.toLowerCase().trim();
  var quizQuestion = document.getElementById('quiz-question').textContent;
  var quizItem = quizData.find(item => item.question === quizQuestion);
  if (!quizItem) return;

  var correctAnswer = quizItem.answer.toLowerCase().trim();
  var quizResponse = document.getElementById('quiz-response');

  if (quizAnswer === correctAnswer) {
    quizResponse.textContent = 'Correct!';
  } else {
    quizResponse.textContent = 'Onjuist. Het juiste antwoord is: ' + quizItem.answer;
  }
}
