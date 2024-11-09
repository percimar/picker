// TODO: get from .env after incorporating build tool (webpack?)
const basePath =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1'
    : `https://asmar.dev/picker/api/v1`;

const saveThings = (things) =>
  fetch(`${basePath}/picker`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ things }),
  });
const getThings = (pickerId) => fetch(`${basePath}/picker/${pickerId}`);

const submitVote = (pickerId, thingId, vote) =>
  fetch(`${basePath}/picker/${pickerId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ thingId, vote }),
  });

const getPickerData = (pickerId) => fetch(`${basePath}/picker/${pickerId}`);
