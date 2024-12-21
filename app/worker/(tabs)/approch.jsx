import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { convertIsoToDdmmyyyy, fetch_approachesWorker } from '../../../constants/utils';

export default function approch() {
  const navigation = useNavigation();
  const router = useRouter()
  const [approaches, setApproaches] = useState([{
    _id: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    post: [{ title: '', imagesUrl: [''] }],
    clientDetails:[{
      name:'',
      profileImg:''
    }]
  }])


  const getApproaches = async () => {

    const res = await fetch_approachesWorker()
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    setApproaches(res)
    // console.log(approaches)
  }
  useEffect
    (() => {
      getApproaches()
      navigation.setOptions({
        headerShown: false
      })
    }, [])
const navigate = (id)=>{
  router.push({pathname:'worker/chat', params:{id : id}})
}

  const Approach = ({ approach }) => {
    return (
      <TouchableOpacity style={styles.approach} onPress={()=>navigate(approach._id)}>
        <Image
          source={{ uri: approach.post[0].imagesUrl[0] }}
          style={styles.img}
        />

        <View style={styles.approachBar}>

          <Text style={styles.boldText}>{approach.post[0].title.toUpperCase()}</Text>


          <Text style={styles.boldText}>
            {approach.content}
          </Text>
          <Text style={styles.text}>
            {convertIsoToDdmmyyyy(approach.createdAt)}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }
  return (
    <FlatList style={styles.list}
      data={approaches}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <Approach approach={item} />}
    />

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  list: {

    width: '100%',
    height: '100%',
    // borderRadius: 10,
    // borderColor: 'red',
    backgroundColor: '#EEE0FF',
    // borderWidth: 1,
    padding: 5
  },
  approach: {
    width: '100%',
    // height: 60,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C494FF',
    elevation: 5,
    marginVertical: 5,
    flex: 1,
    flexDirection:'row',
    alignItems:'flex-start',
    backgroundColor: '#C494FF'
    // alignItems:'center'
  },
  approachBar: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'semibold'
  },
  text: {
    fontSize: 10,
    fontWeight: 'thin'
  },
  postBar: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    // justifyContent:'flex-start',
    alignItems: 'center'
  },
  img: {
    width: 100,
    height: 100,
    borderRadius:10,marginRight:20
  }
})