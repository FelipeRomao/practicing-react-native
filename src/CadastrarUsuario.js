import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from './FirebaseConnection'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome : '',
      email : '',
      senha : ''
    }

    firebase.auth().signOut()

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        
        firebase.database().ref('usuarios').child(user.uid).set({
          nome : this.state.nome
        })

        alert('Usuário logado com sucesso')
      }
    })

    this.cadastrar = this.cadastrar.bind(this)
  }

  cadastrar() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha)
    .catch((error) => {
      alert(error.message)
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.h1}>Inserir novo usuário</Text>
        
        <Text style={styles.text}>Nome:</Text>
        <TextInput style={styles.input} onChangeText={(nome) => this.setState({nome})} 
          underlineColorAndroid='transparent'
          placeholder='Digite seu nome'
          placeholderTextColor='#999'
          autoCapitalize='none'
          autoCorrect={false} />

        <Text style={styles.text}>E-mail:</Text>
        <TextInput style={styles.input} onChangeText={(email) => this.setState({email})} 
          underlineColorAndroid='transparent'
          placeholder='Digite seu nome'
          placeholderTextColor='#999'
          autoCapitalize='none'
          autoCorrect={false}/>

        <Text style={styles.text}>Senha:</Text>
        <TextInput style={styles.input} onChangeText={(senha) => this.setState({senha})} 
          secureTextEntry = {true} 
          underlineColorAndroid='transparent'
          placeholder='Digite seu nome'
          placeholderTextColor='#999'
          autoCapitalize='none'
          autoCorrect={false}/>

        <Button title='Cadastrar Usuário' onPress={this.cadastrar} />
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
    borderRadius : 4,
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
  }

});
