import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
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

    this.cadastrarUsuario = this.cadastrarUsuario.bind(this)
  }
  
  cadastrarUsuario() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) => {
      switch(error.code) {
        case 'auth/weak-password' :
          alert('Sua senha deve ter pelo menos 6 caracteres')
        break

        case 'auth/invalid-email' : 
          alert('E-mail inválido! Insira um e-mail válido para seguir com o cadastro do seu usuário')
        break

        case 'auth/email-already-in-use' :
          alert('E-mail já sendo utilizado por algum usuário')
        break
        
        default :
          alert('Ocorreu um erro! Tente novamente mais tarde.')
        break  

      }

    })

  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>E-mail:</Text>
        <TextInput style={styles.input} onChangeText={(email) => this.setState({email})} />

        <Text style={styles.text}>Senha:</Text>
        <TextInput style={styles.input} onChangeText={(senha) => this.setState({senha})} 
        secureTextEntry = {true} />

        <Button title='Cadastrar usuário' onPress={this.cadastrarUsuario} />
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
