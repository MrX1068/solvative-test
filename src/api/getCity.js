export const getCity = async (searchTerm, limit, offset) => {
  const url = `${process.env.REACT_APP_API_URL}?namePrefix=${searchTerm}&limit=${limit}&offset=${offset}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      "x-rapidapi-host": process.env.REACT_APP_API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
};
