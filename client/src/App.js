import React from 'react'
import './styles/App.css'
import Router from './components/Router'
import { withRouter } from 'react-router-dom'

function App() {
  return (
    <Router />
  );
}

export default withRouter(App);