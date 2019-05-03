import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native'

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
                
                <Text style={styles.text}>E-mail:</Text>
                <TextInput onChangeText={(email) => this.setState({email})} style={styles.input}
                placeholder='Digite seu e-mail'/>

                <Text style={styles.text}>Senha:</Text>
                <TextInput onChangeText={(senha) => this.setState({senha})} style={styles.input}
                placeholder='Digite sua senha' secureTextEntry={true} />

                <Button title='Logar' onPress={this.logar} />

                <View style={styles.addAreaTask}>
                    <Text style={styles.text}>Inserir tarefa</Text>
                    <TextInput onChangeText={(addTask) => this.setState({addTask})} style={styles.input}
                    placeholder='Digite sua tarefa' value={this.state.addTask} />

                    <Button title='Adicionar tarefa' onPress={this.addUserTask} />
                </View>

                <FlatList 
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
        alignItems : 'center'
    },

    input : {
        width : 300,
        height : 45,
        borderWidth : 2,
        borderRadius : 5,
        borderColor : '#1E90FF',
        marginBottom : 20
      },
    
      text : {
        fontSize : 16,
        fontWeight : 'bold',
        marginLeft : -250 ,
        marginBottom : 5
      },
    
      h1 : {
        fontSize : 20,
        fontWeight : 'bold',
        marginBottom : 20,
        color : '#1E90FF'
      },

      addAreaTask : {
          borderWidth : 1,
          borderColor : '#1E90FF',
          padding : 5
      }
})