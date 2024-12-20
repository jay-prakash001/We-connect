import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location'
const BASE_URL = "https://weconnect-s060q7i6.b4a.run/"

const convertIsoToDdmmyyyy = (isoTimestamp) => {
  // Parse the ISO timestamp into a Date object
  const date = new Date(isoTimestamp);

  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  // Format as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}
const getTokens = async () => {
  let token = ""
  try {
    token = await AsyncStorage.getItem('accessToken')
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
      return { name, profileImg, phone, updatedAt: convertIsoToDdmmyyyy(updatedAt), createdAt: convertIsoToDdmmyyyy(createdAt) }
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
      //   const {
      //     // user: { name, profileImg, phone, createdAt, updatedAt },
      //     worker: {
      //       bio ='' ,
      //       location: { lat ='', long ='', city = '', state='', pin_code ='' },
      //       experience ='',
      //     },
      //   } = res.data.data;
      console.log(res.data.data.user)
      // console.log(res.data?.data)
      // Return only the required fields
      // let { name, profileImg, phone, createdAt, updatedAt } = {}

      // if (res.data?.data.user) {
      //   { name, profileImg, phone, createdAt, updatedAt } = res.data.data.user

      // }
      // if (res.data?.data.worker) {
      //   const {
      //     bio = '',
      //     location: { lat = '', long = '', city = '', state = '', pin_code = '' },
      //     experience = '',
      //   } = res.data.data.worker
      // }
      // return {
      //   name,
      //   photo: profileImg,
      //   phone,
      //   bio,
      //   location: {
      //     lat,
      //     long,
      //     city,
      //     state,
      //     pincode: pin_code,
      //   },
      //   experience,
      //   createdAt: convertIsoToDdmmyyyy(createdAt),
      //   updatedAt: convertIsoToDdmmyyyy(updatedAt)
      // };



      try {
        let name = '', profileImg = '', phone = '', createdAt = '', updatedAt = '';
        let bio = '', lat = '', long = '', city = '', state = '', pin_code = '', experience = '';

        if (res.data?.data?.user) {
          ({ name = '', profileImg = '', phone = '', createdAt = '', updatedAt = '' } = res.data.data.user);
        }

        if (res.data?.data?.worker) {
          ({
            bio = '',
            location: {
              lat = '', long = '', city = '', state = '', pin_code = ''
            } = {},
            experience = '',
          } = res.data.data.worker);
        }

        return {
          name,
          photo: profileImg,
          phone,
          bio,
          location: {
            lat,
            long,
            city,
            state,
            pincode: pin_code,
          },
          experience,
          createdAt: createdAt ? convertIsoToDdmmyyyy(createdAt) : '',
          updatedAt: updatedAt ? convertIsoToDdmmyyyy(updatedAt) : '',
        };
      } catch (error) {
        console.error("Error processing worker details:", error);
        return null; // Handle errors gracefully
      }

    } else {
      console.error("No data found in response:", res.data);
    }
  } catch (error) {
    console.error("Error fetching worker details:", error);
  }

  return null;
};

const setWorkerDetails = async (name, profileImg, lat, long, city, pin_code, state, bio, experience, accessToken = getTokens()) => {
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

const getLocation = async () => {

  const status = await Location.requestForegroundPermissionsAsync();

  if (status.status !== 'granted') {
    console.error('Permission not granted for location access.');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({});
  const lat = location.coords.latitude
  const long = location.coords.longitude


  const address = await Location.reverseGeocodeAsync({
    latitude: lat, longitude: long
  })


  return {
    lat,
    long,
    city: address[0].city,
    pincode: address[0].postalCode,
    state: address[0].formattedAddress

  }
}

const create_post = async (title, description, lat, long, city, state, pin_code, postImg, accessToken = getTokens()) => {
  console.log('called')
  const formData = new FormData();
  formData.append("title", title); // Key: "name", Value: name
  formData.append("description", description); // Key: "name", Value: name
  formData.append("lat", lat); // Key: "lat", Value: lat
  formData.append("long", long); // Key: "long", Value: long
  formData.append("city", city); // Key: "city", Value: city
  formData.append("state", state); // Key: "state", Value: state
  formData.append("pin_code", pin_code); // Key: "pin_code", Value: pin_code


  postImg.forEach((element, index) => {
    formData.append(`postImg`, {
      uri: element, // The local file path
      name: `post${index}.jpg`, // Unique filename for each image
      type: "image/jpeg", // MIME type
    });
  });
  // console.log(postImg)
  // return formData
  console.log(formData)
  try {
    const res = await axios.post(BASE_URL + "api/v1/post/create_post/", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("post creation Response:", res.data);
    return res.data
  } catch (error) {
    console.error("Error post creation failed  details:", error.response?.data || error);
  }

}


const create_post0 = async () => {
  const accessToken = await getTokens()
  const formData = new FormData();

  // Append form fields
  formData.append("title", "iron burn");
  formData.append("description", "water motor change");
  formData.append("lat", "21.5");
  formData.append("long", "45.3");
  formData.append("city", "raipur");
  formData.append("state", "cg");
  formData.append("pin_code", "493663");

  // Append image files
  formData.append("postImg", {
    uri: "http://res.cloudinary.com/dm7a2laej/image/upload/v1734223949/d64egygluxicrah1nihy.jpg", // The local file path
    name: "profile.jpg", // Desired filename
    type: "image/jpeg", // MIME type
  });

  try {
    const response = await axios.post(
      "https://weconnect-s060q7i6.b4a.run/api/v1/post/create_post/",
      formData,
      {
        headers: {
          // Automatically handles the boundary
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",

        },
      }
    );

    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

const getPostsNearWorker = async (lat, long, distance) => {
  try {
    const accessToken = getTokens()
    const payLoad = { lat: lat, long: long, distance: distance }
    const posts = await axios.post(BASE_URL + "api/v1/post/get_post_near_worker/", payLoad, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (posts.data?.data) {
      console.log(posts.data.data)

      return posts.data.data
    }
  } catch (error) {
    console.log('fetching posts error')
    console.log(error)
  }

}

const getPostById = async (id) => {
  try {
    const accessToken = await getTokens()
    const res = await axios.post(BASE_URL + 'api/v1/post/get_post_by_id/', {
      postId: id
    },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })


    if (res.data) {
      console.log(res.data.data)
      return res.data.data
    }
  } catch (error) {
    console.log(error)
  }
  return null
}
const setScreen = async (route) => {
  await AsyncStorage.setItem('home', route)
}

const getScreen = async () => {
  const route = await AsyncStorage.getItem('home')
  console.log('xxxxxxxxxxxxxx')
  console.log(route)
  return route
}

const create_approach = async (postId, content) => {
  const accessToken = await getTokens()
  try {
    const res = await axios.post(BASE_URL + 'api/v1/approach/create_approach/', {
      postId, content
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log(res.data)
    return res
  } catch (error) {
    console.log(error)
  }
}

export { BASE_URL, getTokens, getUserDetails, getWorkerDetails, setWorkerDetails, getLocation, create_post, getPostsNearWorker, setScreen, getScreen, getPostById, create_approach }
