import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'

import SystemConnectionDB from './SystemConnectionDB'
import logo from '../assets/images/logo.png'

export default class Login extends Component {
    static navigationOptions = {
        title : 'Login'
    }
    
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            senha : '',
            addTask : '',
            list : [],
            uid : ''
        }

        SystemConnectionDB.logout()

        this.logar = this.logar.bind(this)
    }

    logar() {
        
        SystemConnectionDB.addAuthListener((user) => {
            if(user) {
                SystemConnectionDB.getUserInfo((info) => {
                this.props.navigation.navigate('Home', {
                    nome : info.val().nome
                })

                })
            }
        })
        
        SystemConnectionDB.login(this.state.email, this.state.senha).catch((error) => {
            alert(error.code)
            switch(error.code) {
                case 'auth/invalid-email' :
                    Alert.alert('E-mail inválido!')
                break

                case 'auth/wrong-password' :
                    Alert.alert('E-mail ou senha incorreto!')
                break

                default :
                    Alert.alert('Ocorreu um erro! Tente novamente mais tarde.')
                break    
            }
        })

    }
    
    render() {
        return(
            <View style={styles.container}>
                <Image source={logo} style={styles.logo} />

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
        marginRight : 270 ,
        marginBottom : 7,
        alignSelf : 'center'
      },

      addAreaTask : {
          padding : 10,
          marginTop: 10,
          marginLeft: 5,
          marginRight: 5,
          marginBottom : 100
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

      logo : {
          alignSelf : 'center',
          justifyContent : 'center',
          width : 200,
          height : 200
      }
})