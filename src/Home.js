import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'

import firebase from './FirebaseConnection'

export default class Home extends Component {
    static navigationOptions = {
        title : 'Home',
        header : null
    }
    
    constructor(props) {
        super(props)
        this.state = {
            nome : this.props.navigation.state.params.nome,
            addTask : '',
            list : [],
            uid : ''
        }

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                let state = this.state
                state.uid = user.uid

                this.setState(state)
               
                firebase.database().ref('todo').child(user.uid).on('value', (snapshot) => {
                   let state = this.state
                   state.list = []

                   snapshot.forEach((childItem) => {
                       state.list.push({
                            titulo : childItem.val().titulo,
                            key : childItem.key
                       })
                   })

                   this.setState(state)
               })
            }
        })

        this.addUserTask = this.addUserTask.bind(this)
    }

     addUserTask() {
        if(this.state.uid != '' && this.state.addTask != '') {
            let todo = firebase.database().ref('todo').child(this.state.uid)
            let key = todo.push().key

            todo.child(key).set({
                titulo : this.state.addTask
            })
        }
    }
    
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.arreaText}>Olá, <Text style={styles.userName}>{this.state.nome}</Text></Text>

                <View style={styles.addAreaTask}>
                    <Text style={styles.text}>Inserir tarefa:</Text>
                    <TextInput onChangeText={(addTask) => this.setState({addTask})} style={styles.input}
                    placeholder='Digite sua tarefa' 
                    placeholderTextColor='#999'
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    autoCorrect={false} 
                    value={this.state.addTask}
                    clearButtonMode='always'
                    />

                    <TouchableOpacity onPress={this.addUserTask} style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={styles.listTaks} 
                    data={this.state.list}
                    renderItem={ ({item}) => <Text>* {item.titulo}</Text> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginTop : 10
    },

    input : {
        height : 45,
        borderWidth : 1,
        borderColor : '#DDD',
        borderRadius : 5,
        paddingHorizontal : 20,
        marginBottom : 20
      },
    
      text : {
        fontSize : 16,
        fontWeight : 'bold',
        marginRight : 220 ,
        marginBottom : 7,
        alignSelf : 'center'
      },

      addAreaTask : {
          padding : 10,
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          marginBottom : 20
      },

      button : {
        height : 48,
        borderRadius : 20,
        paddingHorizontal : 20,
        backgroundColor : '#FF7F50',
        justifyContent : 'center',
        alignItems : 'center'
      },

      buttonText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#FFF'
      },

      listTaks : {
        borderWidth : 2,
        borderColor : '#FF7F50',
        borderRadius : 4,
        padding : 10,
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 20
      },

      userName : {
          fontWeight : 'bold',
          color : '#FF7F50'
      },

      arreaText : {
          marginLeft : 20
      }
})