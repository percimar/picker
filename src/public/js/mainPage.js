const createPicker = async () => {
  const stringData = document.getElementById('textBox').value;
  const things = stringData.split('\n').filter((string) => !!string);
  const saveResponse = await saveThings(things);
  const { resultsLink, voterLink } = await saveResponse.json();

  const existingVoterButton = document.getElementById('voterButton');
  if (!existingVoterButton) {
    const voterLinkDiv = document.getElementById('voterLink');
    const voterButton = document.createElement('button');
    voterButton.id = 'voterButton';
    voterButton.innerHTML = 'Go to voter page!';
    voterButton.onclick = () => {
      window.location.href = voterLink;
    };
    voterLinkDiv.appendChild(voterButton);
  }

  const existingResultsButton = document.getElementById('resultsButton');
  if (!existingResultsButton) {
    const resultsLinkDiv = document.getElementById('resultsLink');
    const resultsButton = document.createElement('button');
    resultsButton.id = 'resultsButton';
    resultsButton.innerHTML = 'Go to results page!';
    resultsButton.onclick = () => {
      window.location.href = resultsLink;
    };
    resultsLinkDiv.appendChild(resultsButton);
  }
};

const voterButton = document.getElementById('voterPage');
voterButton.addEventListener('click', createPicker);
