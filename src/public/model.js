const THINGS_KEY = 'things';
const PICKER_ID = '1234';

const saveThings = (things) =>
  localStorage.setItem(THINGS_KEY, JSON.stringify(things));
const getThings = () => JSON.parse(localStorage.getItem(THINGS_KEY));
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
var counter = 0;
const nextMovie = (something) => {
  const listOfMovies = localStorage.getItem('things');
  const screen = document.getElementById('pick');
  if (listOfMovies !== null) {
    const retrievedArray = JSON.parse(listOfMovies);
    screen.innerHTML = retrievedArray[counter].name;
    console.log(retrievedArray[counter].name);
    counter = counter + something;
    console.log(counter);
    return retrievedArray[counter].id;
  }
};
nextMovie(0);
const urlSearchParams = new URLSearchParams(window.location.search);
const pickerId = urlSearchParams.get('pickerId');
const like = document.getElementById('like');
like.addEventListener('click', (event) => {
  if (event.currentTarget.id === 'like') {
    id = nextMovie(1);
    submitVote(pickerId, id, event.currentTarget.id);
  } else {
    console.log('button not found');
  }
});
const dislike = document.getElementById('dislike');
dislike.addEventListener('click', (event) => {
  if (event.currentTarget.id === 'dislike') {
    id = nextMovie(1);
    submitVote(pickerId, id, event.currentTarget.id);
  } else {
    console.log('button not found');
  }
});
const skip = document.getElementById('skip');
skip.addEventListener('click', (event) => {
  if (event.currentTarget.id === 'skip') {
    id = nextMovie(1);
  } else {
    console.log('button not found');
  }
});
