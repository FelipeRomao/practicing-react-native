import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Login from './src/Login'
import Home from './src/Home'

const AppNavigator = createStackNavigator({
    Login : {
        screen : Login
    },
    
    Home : {
        screen : Home
    }
})

export default createAppContainer(AppNavigator)
