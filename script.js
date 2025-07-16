// WordGarden main script (structure only - logic to be filled)
let currentWords = [];
let currentStudent = "";
let currentLevel = "";
let currentSet = 1;
let quizData = {};
let passwordRequired = false;

function findStudent() {
  const name = document.getElementById("nameInput").value.trim();
  const info = studentData[name];
  const resultsDiv = document.getElementById("nameResults");
  resultsDiv.innerHTML = "";

  if (!info) {
    resultsDiv.innerHTML = `<p>❌ 이름을 찾을 수 없습니다.</p>`;
    return;
  }

  currentStudent = name;
  currentLevel = info.category;
  document.getElementById("setSelection").style.display = "block";
}

function selectSet(setNumber) {
  currentSet = setNumber;
  const previous = JSON.parse(localStorage.getItem(currentStudent + "_set" + currentSet)) || null;
  if (previous) {
    document.getElementById("passwordPrompt").style.display = "block";
  } else {
    startQuiz();
  }
}

function checkPassword() {
  const pw = document.getElementById("passwordInput").value;
  if (pw === "0000") {
    startQuiz();
  } else {
    alert("비밀번호가 틀렸습니다.");
  }
}

function startQuiz() {
  document.getElementById("name-selection").style.display = "none";
  document.getElementById("setSelection").style.display = "none";
  document.getElementById("passwordPrompt").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  const allWords = wordList[currentLevel];
  const startIndex = (currentSet - 1) * 30;
  currentWords = allWords.slice(startIndex, startIndex + 30);

  const quizForm = document.getElementById("quizForm");
  quizForm.innerHTML = "";

  currentWords.forEach((item, idx) => {
    quizForm.innerHTML += `
      <div class="question">
        <label>${idx + 1}. ${item.word}</label><br>
        <input type="text" id="q${idx}" autocomplete="off" />
      </div>
    `;
  });
}

function normalize(str) {
  return str.replace(/\s+/g, "").toLowerCase();
}

function submitQuiz() {
  let score = 0;
  const results = [];
  currentWords.forEach((item, idx) => {
    const userAnswer = document.getElementById("q${idx}").value.trim();
    const correctAnswer = item.meaning.split(',')[0];
    const isCorrect = normalize(userAnswer) === normalize(correctAnswer);
    if (isCorrect) score++;
    results.push(userAnswer);
  });

  const record = {
    name: currentStudent,
    level: currentLevel,
    set: currentSet,
    score: score,
    date: new Date().toISOString().slice(0, 10),
    answers: results
  };

  localStorage.setItem(currentStudent + "_set" + currentSet, JSON.stringify(record));

  alert(`시험 완료! 점수: ${score} / 30`);

  exportToExcel(record);
}

function exportToExcel(record) {
  // SheetJS 또는 서버 전송 로직 위치
  console.log("엑셀 내보내기 준비:", record);
}
