import axios from "axios";

const API_V1_ENDPOINT = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/";
const API_V2_ENDPOINT = "https://sky-scrapper.p.rapidapi.com/api/v2/flights/";

const AIRPORTS_API_URL = `${API_V1_ENDPOINT}flights/searchAirport?query=new&locale=en-US`; // Define the endpoint constant

// const AIRLINES_API_URL = "http://api.aviationstack.com/v1/airlines"; // AviationStack API endpoint

export const fetchAirportsData = async () => {
  return await axios.get(
    AIRPORTS_API_URL, // Use the constant here
    {
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_API_KEY, // Replace with your RapidAPI key
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    }
  );
};

// export const fetchPopularAirlines = async (userLocation) => {
//   try {
//     const response = await axios.get(AIRLINES_API_URL, {
//       params: {
//         access_key: process.env.REACT_APP_AVIATIONSTACK_API_KEY, // Your AviationStack API key
//         // You can add more parameters if needed
//       },
//     });
//     return response.data; // Return the list of airlines
//   } catch (error) {
//     console.error("Error fetching popular airlines:", error);
//     return [];
//   }
// };

export const fetchNearestAirports = async (lat, lng) => {
  try {
    const response = await axios.get(`${API_V1_ENDPOINT}getNearByAirports`, {
      params: { lat, lng },
      headers: {
        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY, // Replace with your actual RapidAPI key
      },
    });
    return response.data; // Adjust based on the API response structure
  } catch (error) {
    console.error("Error fetching nearest airports:", error);
    return []; // Return an empty array on error
  }
};

export const fetchFlights = async (
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  cabinClass,
  adults,
  sortBy,
  currency
) => {
  const options = {
    method: "GET",
    url: `${API_V2_ENDPOINT}searchFlights`,
    params: {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      cabinClass,
      adults,
      sortBy,
      currency,
      market: "en-US",
      countryCode: "US",
    },
    headers: {
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
};

// New function to search airports
export const searchAirports = async (query) => {
  const options = {
    method: "GET",
    url: `${API_V1_ENDPOINT}searchAirport`,
    params: {
      query,
      locale: "en-US",
    },
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_API_KEY,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error searching airports:", error);
    throw error; // Rethrow the error for handling in the calling component
  }
};
