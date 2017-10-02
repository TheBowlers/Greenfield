import React from 'react';
import Login from './Login.jsx'
import Header from './Header.jsx'
import MainView from './MainView.jsx'
import Footer from './Footer.jsx'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Header />
        <MainView />
        <Footer />
      </div>
    )
  }
}

export default App;