var map = L.map('map').setView([50.8503, 4.3517], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> bijdragers'
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
  { location: 'Duitsland', question: "Welke rivier stroomt door Berlijn?", answer: "Spree" },
  { location: 'Italië', question: "Welke beroemde toren staat in Pisa?", answer: "Toren van Pisa" },
  { location: 'Nederland', question: "Welke stad staat bekend om zijn grachten?", answer: "Amsterdam" }
];

locations.forEach(function(location) {
  var marker = L.marker(location.coordinates).addTo(map).bindPopup(location.name);
  marker.on('click', function(e) {
    handleQuiz(location.name);
  });
});

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map).bindPopup("Je bent hier").openPopup();
  L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({ setView: true, maxZoom: 16 });

function handleQuiz(locationName) {
  var quizItem = quizData.find(item => item.location === locationName);
  if (!quizItem) return;

  var answer = prompt(quizItem.question);
  if (answer !== null) {
    var correctAnswer = quizItem.answer.toLowerCase().trim();
    var givenAnswer = answer.toLowerCase().trim();
    var isCorrect = correctAnswer === givenAnswer;

    if (isCorrect) {
      alert("Correct!");
    } else {
      alert("Onjuist. Het juiste antwoord is: " + quizItem.answer);
    }
  }
}
