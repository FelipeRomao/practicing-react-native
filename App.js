import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import firebase from 'firebase'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list : []
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

    firebase.database().ref('usuarios').on('value', (snapshot) => {
      let state = this.state
      state.list= []
      snapshot.forEach((childItem) => {
        state.list.push({
          key : childItem.key,
          nome : childItem.val().nome,
          idade : childItem.val().idade
        })
      })

      this.setState(state)

    })
  }
  
  render() {
    return(
      <View style={styles.container}>
        <FlatList 
          data={this.state.list}
          renderItem={({item}) => {
            return(
              <View>
                <Text>{item.key} | {item.nome}, {item.idade} anos</Text>
              </View>
            )
          }}
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
  }

});
