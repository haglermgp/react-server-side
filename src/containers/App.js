import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'


// import components

import BasicPage from '../BasicPage.js'
// import Cursos9 from './js/app/Cursos9'

//import and defined styles
import style from '../sass/index.sass'



export default class App extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <h1>Hello Render React-Redux</h1>
        <Switch>
          <Route exact path='/' component={ BasicPage } />
        </Switch>
      </div>
    )
  }
}
