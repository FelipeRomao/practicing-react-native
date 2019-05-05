import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            senha : '',
            addTask : '',
            list : [],
            uid : ''
        }

        firebase.initializeApp(config);

        firebase.auth().signOut()

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                let state = this.state
                state.uid = user.uid

                this.setState(state)
                
                firebase.database().ref('usuarios').child(user.uid).once('value')
                .then((snapshot) => {
                    let nome = snapshot.val().nome
                    alert('Seja bem vindo(a), ' + nome)
                })

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

        this.logar = this.logar.bind(this)
        this.addUserTask = this.addUserTask.bind(this)
    }

    logar() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
        .catch((error) => {
            alert(error.message)
        })
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
                <Text style={styles.h1}>Faça seu login</Text>
                
                <View style={styles.addAreaTask}> 
                    <Text style={styles.text}>E-mail:</Text>
                    <TextInput onChangeText={(email) => this.setState({email})} style={styles.input}
                    placeholder='Digite seu e-mail'
                    placeholderTextColor='#999'
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    autoCorrect={false} />

                    <Text style={styles.text}>Senha:</Text>
                    <TextInput onChangeText={(senha) => this.setState({senha})} style={styles.input}
                    placeholder='Digite sua senha' secureTextEntry={true} 
                    placeholderTextColor='#999'
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    autoCorrect={false} />

                    <TouchableOpacity onPress={this.logar} style={styles.button}>      
                        <Text style={styles.buttonText}>Fazer login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.addAreaTask}>
                    <Text style={styles.text}>Inserir tarefa:</Text>
                    <TextInput onChangeText={(addTask) => this.setState({addTask})} style={styles.input}
                    placeholder='Digite sua tarefa' value={this.state.addTask} 
                    placeholderTextColor='#999'
                    underlineColorAndroid='transparent'
                    autoCapitalize='none'
                    autoCorrect={false} />

                    <TouchableOpacity onPress={this.addUserTask} style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar Tarefa</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.listTaks} 
                    data={this.state.list}
                    renderItem={ ({item}) => <Text>{item.titulo}</Text> }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'stretch'
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
    
      h1 : {
        fontSize : 20,
        fontWeight : 'bold',
        marginTop : 10,
        color : '#1E90FF',
        alignSelf : 'center'
      },

      addAreaTask : {
          borderWidth : 2,
          borderColor : '#1E90FF',
          padding : 10,
          marginTop: 20,
          marginLeft: 5,
          marginRight: 5
      },

      button : {
        height : 48,
        borderRadius : 4,
        paddingHorizontal : 20,
        backgroundColor : '#1E90FF',
        justifyContent : 'center',
        alignItems : 'center'
      },

      buttonText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : '#FFF'
      },

      listTaks : {
          padding : 10,
          marginTop : 20,
          backgroundColor : '#CCCCCC',
          marginLeft : 5,
          marginRight : 5,
          marginBottom : 20,
          borderWidth : 2,
          borderColor : '#1E90FF',
          borderRadius : 4
      }
})