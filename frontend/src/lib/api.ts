const basePath = import.meta.env.VITE_BACKEND_URL;

export type CreatePickerResponse = {
  id: number;
  voterLink: string;
  resultsLink: string;
};

export const createPicker = async (
  things: string[],
): Promise<CreatePickerResponse> => {
  const response = await fetch(`${basePath}/picker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ things }),
  });
  return response.json();
};

export const getThings = (pickerId: string) =>
  fetch(`${basePath}/picker/${pickerId}`);

export const submitVote = (pickerId: string, thingId: string, vote: string) =>
  fetch(`${basePath}/picker/${pickerId}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ thingId, vote }),
  });

export const getPickerData = (pickerId: string) =>
  fetch(`${basePath}/picker/${pickerId}`);
