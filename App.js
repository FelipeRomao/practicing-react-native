import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nomeInput : '',
      idadeInput : ''
    }

    let config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config)

    /* Alterando dados do usuário tendo o id como referência 
    let idUsuario = '-LdfjTyFiNTrSEqz4A68'

    firebase.database().ref('usuarios').child(idUsuario).set({
      nome : 'Felipe Alves',
      idade : 15
    }) */

    /* Excluindo dados do usuário tendo o id como referência
    let idUsuario = '-LdfjTyFiNTrSEqz4A68'
    
    firebase.database().ref('usuarios').child(idUsuario).remove()

    this.inserirUsuario = this.inserirUsuario.bind(this) */


  }

  inserirUsuario() {
    if(this.state.nomeInput.length > 0) {
      let usuarios = firebase.database().ref('usuarios')
      let chave = usuarios.push().key

      usuarios.child(chave).set({
        nome : this.state.nomeInput,
        idade : this.state.idadeInput
      })

      alert('Usuário inserido! =D')
    }

  }
  
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Nome do usuário:</Text>
        <TextInput onChangeText={(nomeInput) => this.setState({nomeInput})} style={styles.input}
        placeholder='Digite o nome do usuário' />

        <Text style={styles.text}>Idade do usuário:</Text>
        <TextInput onChangeText={(idadeInput) => this.setState({idadeInput})} style={styles.input}
        placeholder='Digite a idade do usuário' />

        <Button title='Inserir usuário' onPress={this.inserirUsuario} />
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
    height : 50,
    borderWidth : 2,
    borderRadius : 5,
    borderColor : '#6A5ACD',
    marginBottom : 20
  },

  text : {
    fontSize : 16,
    fontWeight : 'bold',
    marginLeft : -170 ,
    marginBottom : 5
  }

});
