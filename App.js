import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      senha : ''
    }

    let config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };

    firebase.initializeApp(config);

    //Listener ou Olheiro 
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        alert('Usuário logado')
      }

    })

    this.logarUsuario = this.logarUsuario.bind(this)
    this.logoutUsuario = this.logoutUsuario.bind(this)
  }

  logarUsuario() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) => {
      if(error.code == 'auth/wrong-password') {
        alert('Senha incorreta! :(')
      } else {
        alert('Tenta novamente mais tarde!')
      }
    })
  }

  logoutUsuario() {
    firebase.auth().signOut()
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>E-mail:</Text>
        <TextInput style={styles.input} onChangeText={(email) => this.setState({email})} />

        <Text style={styles.text}>Senha:</Text>
        <TextInput style={styles.input} onChangeText={(senha) => this.setState({senha})} 
        secureTextEntry = {true} />

        <Button title='Fazer Login' onPress={this.logarUsuario} style={styles.button} />

        <Button title='Fazer LogOut' onPress={this.logoutUsuario} />
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
  }

});
