const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const urlSearchParams = new URLSearchParams(window.location.search);
const pickerId = urlSearchParams.get('pickerId');

(async function onload() {
  // Get Picker Data
  const getPickerDataResponse = await getPickerData(pickerId);
  const picker = await getPickerDataResponse.json();
  const things = shuffleArray(picker.things);

  // Initialize State
  const state = { currentIdx: null };

  // State getters and mutators
  const getCurrentThing = () => things[state.currentIdx];
  const getNextThing = () => {
    if (state.currentIdx === null) {
      state.currentIdx = 0;
    } else {
      state.currentIdx += 1;
    }
    return getCurrentThing();
  };

  const displayNextThing = () => {
    const nextThing = getNextThing();
    const screen = document.getElementById('pick');

    if (nextThing) {
      screen.innerHTML = nextThing.name;
    } else {
      screen.innerHTML = `That's all, thanks for voting! <a href="/results.html?pickerId=${picker.id}">Results</a>`;
      document.getElementById('like').disabled = true;
      document.getElementById('dislike').disabled = true;
      document.getElementById('skip').disabled = true;
    }
  };

  // Setup event listeners
  const like = document.getElementById('like');
  like.addEventListener('click', () => {
    submitVote(pickerId, getCurrentThing().id, 'like');
    displayNextThing();
  });

  const dislike = document.getElementById('dislike');
  dislike.addEventListener('click', () => {
    submitVote(pickerId, getCurrentThing().id, 'dislike');
    displayNextThing();
  });

  const skip = document.getElementById('skip');
  skip.addEventListener('click', displayNextThing);

  // Show first thing
  displayNextThing();
})();
