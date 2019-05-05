import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'

import firebase from 'firebase'

export default class RedefinirSenha extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            senha : '',
            novaSenha : ''
        }

        firebase.initializeApp(config);

        firebase.auth().signOut()

        firebase.auth().onAuthStateChanged((user) => {
              if(user) {
                user.updatePassword(this.state.novaSenha)
                alert('Senha alterada com sucesso')
              }
          })

          this.redefinir = this.redefinir.bind(this)
    }
    
    redefinir() {
        firebase.auth().signInWithEmailAndPassword(
            this.state.email,
            this.state.senha
        ).catch((error) => {
            alert(error.message)
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.h1}>Redefina sua senha aqui!</Text>
                
                <Text style={styles.text}>E-mail:</Text>
                <TextInput 
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Digite seu e-mail'
                    placeholderTextColor='#999'
                    underlineColorAndroid='transparent'

                    onChangeText={(email) => this.setState({email})}
                />

                <Text style={styles.text}>Antiga Senha:</Text>
                <TextInput 
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder='Digite sua antiga senha'
                    placeholderTextColor='#999'
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}

                    onChangeText={(senha) => this.setState({senha})}
                />

                <Text style={styles.text}>Nova Senha:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Digite sua nova senha'
                    placeholderTextColor='#999'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}

                    onChangeText={(novaSenha) => this.setState({novaSenha})}
                />

                <TouchableOpacity onPress={this.redefinir} style={styles.button}>
                    <Text style={styles.buttonText}>Redefinir Senha</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'stretch',
        justifyContent : 'center'
    },

    input : {
        height : 45,
        borderWidth : 1,
        borderRadius : 4,
        borderColor : '#DDD',
        paddingHorizontal : 20,
        marginLeft : 10,
        marginRight : 10
    },

    text : {
        fontSize : 16,
        padding : 10
    },

    button : {
        backgroundColor : '#4169E1',
        height : 45,
        margin : 10,
        marginTop : 20,
        borderRadius : 4,
        alignItems : 'center',
        justifyContent : 'center'
    },

    buttonText : {
        fontSize : 15,
        color : '#FFF',
        fontWeight : 'bold'
    },

    h1 : {
        fontSize : 25,
        fontWeight : 'bold',
        color : '#4169E1',
        alignSelf : 'center',
        marginBottom : 20
    }
})