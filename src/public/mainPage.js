const THINGS_KEY = 'things';
const PICKER_ID = '1234';

const saveThings = (things) =>
  localStorage.setItem(THINGS_KEY, JSON.stringify(things));
const getThings = () => JSON.parse(localStorage.getItem(THINGS_KEY));
const createPicker = () => {
  const stringData = document.getElementById('textBox').value;
  const things = stringData.split('\n');
  saveThings(things.map((name, id) => ({ id, name, score: 0 })));
  function ensureButtons() {
    const existingVoterButton = document.getElementById('voterButton');
    const existingResultsButton = document.getElementById('resultsButton');

    if (!existingVoterButton) {
      const voterLink = document.getElementById('voterLink');
      const voterButton = document.createElement('button');
      voterButton.id = 'voterButton';
      voterButton.innerHTML = 'Go to voter page!';
      voterButton.onclick = () => {
        window.location.href = `/vote.html?pickerId=${PICKER_ID}`;
      };
      voterLink.appendChild(voterButton);
    }

    if (!existingResultsButton) {
      const resultsLink = document.getElementById('resultsLink');
      const resultsButton = document.createElement('button');
      resultsButton.id = 'resultsButton';
      resultsButton.innerHTML = 'Go to results page!';
      resultsButton.onclick = () => {
        window.location.href = `/results?pickerId=${PICKER_ID}`;
      };
      resultsLink.appendChild(resultsButton);
    }
  }

  ensureButtons();
};
const voterButton = document.getElementById('voterPage');
voterButton.addEventListener('click', createPicker);
// vote can be "like" or "dislike"
const submitVote = (pickerId, thingId, vote) => {
  if (!thingId && thingId !== 0)
    throw `thingId is mandatory, cannot be ${thingId}`;

  if (vote !== 'like' && vote !== 'dislike')
    throw `Vote must be 'like' or 'dislike', cannot be ${vote}`;

  const things = getThings(pickerId);
  const thing = things.find(({ id }) => id === thingId);
  if (!thing) throw `Thing with ID '${thingId}' not found.`;

  if (vote === 'like') {
    thing.score += 1;
  } else if (vote === 'dislike') {
    thing.score -= 1;
  }

  const newThings = [...things.filter(({ id }) => id !== thingId), thing];
  saveThings(pickerId, newThings);
};

const getPickerData = (pickerId) => {
  return { things: getThings(pickerId) };
};
