import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://weconnect-s060q7i6.b4a.run/"


const getTokens = async () => {
  try {
    const token = await AsyncStorage.getItem(BASE_URL)
    return await AsyncStorage.getItem('accessToken')


  } catch (error) {
    console.log(error)
  }
  return null
}
const getUserDetails = async (accessToken = getTokens()) => {
  // https://weconnect-s060q7i6.b4a.run/api/v1/user/get_user_details/

  try {
    const res = await axios.get(BASE_URL + "/api/v1/user/get_user_details/", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    if (res.data?.data) {
      const { name, profileImg, phone } = res.data.data;
      const { createdAt, updatedAt } = res.data.data
      return { name, profileImg, phone, updatedAt, createdAt }
    } else {
      console.error("No data found in response:", res.data);
    }


  } catch (error) {
    console.log(error)
  }

  return null
}

export { BASE_URL, getTokens, getUserDetails }
