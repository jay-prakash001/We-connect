const  BASE_URL = "https://weconnect-s060q7i6.b4a.run/" 


const getTokens = async () => {
    try {

      const aT = await AsyncStorage.getItem('accessToken')
     return aT


    } catch (error) {
      console.log(error)
    }
    return null
  }


  export {BASE_URL, getTokens}
