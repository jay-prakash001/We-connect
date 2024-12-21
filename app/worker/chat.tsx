import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { getChats, sendChat } from '@/constants/utils'
import Ionicons from '@expo/vector-icons/Ionicons';

const Chat = () => {
  const [chats, setChats] = useState([{
    __v: 0,
    _id: "",
    approach: "",
    content: "",
    createdAt: "",
    isSender: true,
  }])
  const { id } = useGlobalSearchParams()
  const [content, setContent] = useState('')
  const fetchChats = async () => {
    const res = await getChats(id)

    console.log('chats')
    // console.log(res)
    setChats(res)
    console.log(chats)
  }

  const send = async () => {
    const res = sendChat(content, id)
    console.log(res)
    setContent('')
    await fetchChats()
  }
  useEffect(() => {

    fetchChats()
  }, [])

  const Chat = ({ chat }) => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: chat.isSender ? 'flex-end' : 'flex-start',
      }}>

        <View style={[styles.chat, {
          borderBottomLeftRadius: chat.isSender ? 20 : 0,
          borderBottomRightRadius: chat.isSender ? 0 : 20,
          // justifyContent: chat.isSender ? 'flex-start' : 'flex-end',


        }]}>
          <Text>{chat.content}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>

      <FlatList
        data={chats}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Chat chat={item} />}
      />
      <View style={styles.chatArea}>

        <TextInput style={styles.input}
          value={content}
          onChangeText={setContent}
        />
        <TouchableOpacity onPress={send}>
          {/* <Ionicons name="hand-right-sharp" size={30} color={color} /> */}
          <Ionicons name="send" size={40} color={'gray'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({

  container: {
    // width:'100%',
    // maxWidth:'100%',
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 10
  },
  chat: {
    maxWidth: '80%',
    minWidth:'30%',
    backgroundColor: 'red',
    // marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
    padding: 10,

  },
  chatArea: {
    width: '100%',
    maxHeight: 80,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
    // height:80
  },

  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 50
  }
})