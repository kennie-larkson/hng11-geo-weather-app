import axios from "axios";

export async function currentWeather(
  location: string | undefined,
  key: string | undefined
) {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`
    );
    console.log(response.data.current.temp_c);
    return (response.data.current.temp_c as string) || undefined;
  } catch (error) {
    console.log(error);
  }
}
