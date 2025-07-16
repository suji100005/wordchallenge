function loadAllData() {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  const allData = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.includes("_set")) {
      const record = JSON.parse(localStorage.getItem(key));
      allData.push(record);
    }
  }

  if (allData.length === 0) {
    resultsDiv.innerHTML = "<p>📭 저장된 시험 결과가 없습니다.</p>";
    return;
  }

  allData.sort((a, b) => a.name.localeCompare(b.name));

  let output = "<table border='1' cellpadding='5'><tr><th>이름</th><th>레벨</th><th>세트</th><th>점수</th><th>날짜</th></tr>";
  allData.forEach(item => {
    output += `<tr>
      <td>${item.name}</td>
      <td>${item.level}</td>
      <td>${item.set}</td>
      <td>${item.score} / 30</td>
      <td>${item.date}</td>
    </tr>`;
  });
  output += "</table>";

  resultsDiv.innerHTML = output;
}
