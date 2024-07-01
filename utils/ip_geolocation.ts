import axios from "axios";

export async function getGeolocation(
  clientIp: string | undefined,
  key: string | undefined
) {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/ip.json?key=${key}&q=${clientIp}`
    );
    //console.log(response.data);
    return (response.data.city as string) || undefined;
  } catch (error) {
    console.log(error);
  }
}
