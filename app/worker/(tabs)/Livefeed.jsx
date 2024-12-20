import { View, Text, FlatList, ScrollView,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { getLocation, getPostsNearWorker } from '../../../constants/utils';
import {generateRandomLightColor} from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
export default function Livefeed() {
  const router = useRouter()
  const [distance, setDistance] = useState(20)
  const [posts, setPosts] = useState([
    {
      _id: "",
      title: "",
      description: "",
      location: {
        lat: 0,
        long: 0,
        city: "",
        pin_code:0 ,
        state: "",
        _id: "",
        coordinates: [
          0,
          0
        ]
      },
      imagesUrl: [""],
      client: [
        {
          name: "",
          profileImg:"",
          phone: 0
        }
      ],
      isOpen: false,
      approaches: [],
      createdAt: "",
      updatedAt: ""
    }
  ])
  const navigation = useNavigation();
  const getPosts = async () => {
    const location = await getLocation()
    const res = await getPostsNearWorker(location.lat, location.long, distance)

    setPosts(res)
  }
  useEffect
    (() => {
      navigation.setOptions({
        headerShown: false
      })
      getPosts()
      console.log(posts)
    }, [])

    
    const navigateToPost = (post)=>{

     
      router.push({
        pathname: '/worker/post',  // Correctly specify the full path
        params: { postId : post._id },           // Pass 'post' as a key-value pair in 'params'
      });
    }
const ImageGallery = ({ images }) => {
  return (
    <FlatList
      data={images}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
      )}
      keyExtractor={(item, index) => index.toString()}
      
    />
  );
};
  const Post = ({ post }) => {

    return (
      <TouchableOpacity onPress={()=>navigateToPost(post)}>

      <View style ={[styles.card,{backgroundColor:generateRandomLightColor()}]}>
        <View style={styles.postHeader}>
          <View style = {styles.clientBar}>

          <Image
          source={{uri:post.client[0].profileImg}}
          style= {styles.clientProfileImg}
          />
          <Text>{post.client[0].name}</Text>
        </View>
          </View>

          <Text style ={
            styles.heading
          }>{post.title}</Text>
          <Text>{post.description}</Text>
          <Text>{post.location.state}</Text>

          <ImageGallery
          images={post.imagesUrl}
          />
      </View>
      </TouchableOpacity>

    )
  }

  return (

    <View style = {styles.container}>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>


  )
}

const styles = StyleSheet.create({
container:{
  // borderWidth:1,
  // borderColor:'red',
  // margin:10,
  // padding:10,
  // width:'100%',
  height:'100%',
},
card: {
  margin: 10,
  borderRadius: 10,
  backgroundColor: generateRandomLightColor(),
  padding: 10,
  shadowOffset: { width: 0, height: 2 },   
  elevation: 5, // Android elevation
},

image: {    
  width: 120,
  height: 120,
  borderRadius: 8,
  marginRight: 8,
},
postHeader:{

},
clientProfileImg:{
  width:50,
  height:50,
  borderRadius:25,
  marginRight:10
},
clientBar:{
  flex:1,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'flex-start',
  width:'100%',
  
},
heading:{
  fontSize:20,

}

})