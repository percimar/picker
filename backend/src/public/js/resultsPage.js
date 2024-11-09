(async function onload() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const pickerId = urlSearchParams.get('pickerId');

  // Get Picker Data
  const getPickerDataResponse = await getPickerData(pickerId);
  const picker = await getPickerDataResponse.json();

  const resultsTable = document.getElementById('resultsTable');
  picker.things
    .sort((a, b) => b.score - a.score)
    .forEach(({ name, score }, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${idx + 1}</td><td>${name}</td><td>${score}</td>`;
      resultsTable.appendChild(tr);
    });
})();
