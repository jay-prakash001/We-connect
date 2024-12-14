import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://weconnect-s060q7i6.b4a.run/"


const getTokens = async () => {
  let token = ""
  try {
     token =  await AsyncStorage.getItem('accessToken')
    console.log(token)
    return token


  } catch (error) {
    console.log(error)
  }
  return token
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

const getWorkerDetails = async (accessToken = getTokens()) => {

  try {
    const res = await axios.get(BASE_URL + "/api/v1/user/get_worker_details/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.data?.data) {
      const {
        user: { name, profileImg },
        worker: {
          bio,
          location: { lat, long, city, state, pin_code },
          experience,
        },
      } = res.data.data;
      console.log(name)
      console.log('')
      // console.log(res.data?.data)
      // Return only the required fields
      return {
        name,
        photo: profileImg,
        bio,
        location: {
          lat,
          long,
          city,
          state,
          pincode: pin_code,
        },
        experience,
      };
    } else {
      console.error("No data found in response:", res.data);
    }
  } catch (error) {
    console.error("Error fetching worker details:", error);
  }

  return null;
};

const setWorkerDetails = async (name, profileImg, lat, long, city, pin_code, state, bio,experience, accessToken = getTokens())=>{
  console.log(name, accessToken);

  const formData = new FormData();

  formData.append("name", name); // Key: "name", Value: name
  formData.append("profileImg", {
    uri: profileImg, // The local file path
    name: "profile.jpg", // Desired filename
    type: "image/jpeg", // MIME type
  }); // Key: "profileImg", Value: { uri, name, type }
  formData.append("lat", lat); // Key: "lat", Value: lat
  formData.append("long", long); // Key: "long", Value: long
  formData.append("city", city); // Key: "city", Value: city
  formData.append("state", state); // Key: "state", Value: state
  formData.append("pin_code", pin_code); // Key: "pin_code", Value: pin_code
  formData.append("bio", bio); // Key: "bio", Value: bio
  formData.append("experience", experience); // Key: "experience", Value: experience

      try {
      const res = await axios.patch(BASE_URL + "/api/v1/user/create_worker/", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Update Response:", res.data);
      return res.data
    } catch (error) {
      console.error("Error updating user details:", error.response || error);
    }
  };
export { BASE_URL, getTokens, getUserDetails,getWorkerDetails,setWorkerDetails }
