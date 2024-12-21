import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter, useSearchParams } from 'expo-router/build/hooks'
import ImageGallery from '../../components/ImageGallery'
import { create_approach, getPostById } from '../../constants/utils'
import { useNavigation } from 'expo-router'
const post = () => {

  const router = useRouter()
  const navigation = useNavigation()
  const { postId } = useGlobalSearchParams()
  const [content, setContent] = useState('')
  const [post, setPostDetails] = useState({
    "__v": 0,
    "_id": "",
    "approaches": [],
    "client": {
      "__v": 0,
      "_id": "",
      "createdAt": "",
      "name": "",
      "phone": null,
      "profileImg": "",
      "refreshToken": "",
      "updatedAt": ""
    },
    "createdAt": "",
    "description": "",
    "imagesUrl": [],
    "isOpen": false,
    "location": {
      "_id": "",
      "city": "",
      "coordinates": [null, null],
      "lat": null,
      "long": null,
      "pin_code": null,
      "state": ""
    },
    "title": "",
    "updatedAt": ""
  }
  )


  // console.log(postId)

  useEffect(() => {
    const getPostDetails = async () => {
      const res = await getPostById(postId)

      setPostDetails(res)
    }
    console.log('xxxxxxxxxxxxxxxx')
    console.log(post)

    getPostDetails()
    navigation.setOptions({
      headerShown: false

    })
  }, [])
  const sendApproach = () => {
    const res = create_approach(post._id, content)
  }
  {/* {"__v": 0, "_id": "67638132f245b89b8bba0b70", "approaches": [], "client": {"__v": 0, "_id": "676368d33f9eacbb637c293b", "createdAt": "2024-12-19T00:29:07.099Z", "name": "jayprakash", "phone": 6264974771, "profileImg": "http://res.cloudinary.com/dm7a2laej/image/upload/v1734568671/g5fnvhqgndozfba8p6oo.png", "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6NjI2NDk3NDc3MSwiaWF0IjoxNzM0NjkyNzMwLCJleHAiOjE3NDg1MTY3MzB9.4-XspQ-YrhvxXIGDtlJFTrdXvEAxqGy0GM1YcySxVsY", "updatedAt": "2024-12-20T11:05:30.156Z"}, "createdAt": "2024-12-19T02:13:06.098Z", "description": "Aet", "imagesUrl": ["http://res.cloudinary.com/dm7a2laej/image/upload/v1734574385/riyzzavjnn77ec64wbvv.jpg", "http://res.cloudinary.com/dm7a2laej/image/upload/v1734574385/zwe6writtw1f6cpil5lj.jpg", "http://res.cloudinary.com/dm7a2laej/image/upload/v1734574385/lytwzirc5pc8kt4tnjtn.png", "http://res.cloudinary.com/dm7a2laej/image/upload/v1734574385/a2uenv2dxeyhkponohz4.jpg"], "isOpen": true, "location": {"_id": "67638132f245b89b8bba0b71", "city": "Raipur", "coordinates": [81.6160094, 21.2321845], "lat": 21.2321845, "long": 81.6160094, "pin_code": 492013, "state": "6JJ8+V94, Ashwani Nagar, Lakhe Nagar, Raipur, Chhattisgarh 492013, India"}, "title": "Hello", "updatedAt": "2024-12-19T02:13:06.098Z"}*/ }
  return (
    < View style={styles.container} >
      <View style={styles.clientBar}>

        <Image
          source={{ uri: post.client.profileImg }}
          style={styles.clientProfileImg}
        />
        <Text>{post.client.name.toUpperCase()}</Text>
      </View>
      <Text style={styles.heading}>
        {post.title}
      </Text>
      <Text style={styles.desc}>
        {post.description}
      </Text>
      <Text style={styles.text}>Total Approaches :
        {post.approaches.length}
      </Text>
      <View style={styles.imgContainer}>

        <ImageGallery
          images={post.imagesUrl}

        />

      </View>
      <View style={styles.approach}>
        <TextInput style={styles.input}
          value={content}
          onChangeText={setContent}
        />
        <Button
          title='submit'
          onPress={sendApproach}
        />
      </View>

    </View >

  )
}

export default post

const styles = StyleSheet.create({


  container: {
    width: '100%',
    height: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderRadius:50
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  desc: {
    fontSize: 20,
    fontWeight: 'light'
  },
  text: {
    fontSize: 16,
    fontWeight: 'thin'
  },
  clientProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10
  },
  clientBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    // padding: 10,
    maxHeight: 50, // Set a specific height
    backgroundColor: '#eee',
    elevation: 10,
    borderRadius: 50
  },
  imgContainer: {
    // height: '40%',
    width: '100%',
    // backgroundColor: 'red',
    padding: 10,
    // elevation:10
  },
  postImg: {
    height: 200,
    width: 200
  },
  approach: {
    width: '100%',
    maxHeight: 80,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: 'red',
    borderWidth: 1
  },
  input: {
    borderWidth: 1,
    width: '100%'
  }

})