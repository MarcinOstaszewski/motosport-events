import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase, fbDB } from './firebase';

import AddEvent from './components/AddEvent/AddEvent'
import AddEventsFromCSV from './components/AddEventsFromCSV/AddEventsFromCSV';
import Events from './components/DisplayEvents/DisplayEvents';
import styles from './App.module.css';

class App extends Component {

  state = {
    values: {},
    filters_data: [],
    column_names: '',
    all_events: [],
    loginStatus: false
  };

  handleChange = (e) => {
    let vals = {...this.state.values};
    vals[e.target.name] = e.target.value;
    this.setState({ values: vals });
  }
  
  

  reloadEvents = () => {
    fbDB.ref(`db/events`).once('value')
    .then((snapshot) => {
      let dane = snapshot.val()
      this.setState({
        all_events: Object.keys(dane).map(item => dane[item])
      })
    })
  }

  createInputsList = () => {
    fbDB.ref(`db/filter_names`).once('value')
    .then((snapshot) => {
      this.setState({ column_names: snapshot.val() });
    })
  }

  componentDidMount() {
    this.createInputsList();
    this.reloadEvents();

    firebase.auth().onAuthStateChanged(user=>{
      if (user) {
        this.setState({ loginStatus: true })
      } else {
        this.setState({ loginStatus: false })
        console.log('!! NOT LOGGED IN !!')
      }
    })
  }

  render() {

    return (

      <div className={styles.App}>

        <div className={styles.navbarTop}>
          <div className="container">
            <div className="row">
              MENU
            </div>
          </div>
        </div>
        
        <div className="container">
          <div className="row">

            <div className="col-md-12">
              <Events 
                column_names={this.state.column_names}
                all_events={this.state.all_events}/>
            </div>

            <div className="col-md-3">
              <AddEvent 
                loginStatus={this.state.loginStatus}
                column_names={this.state.column_names}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                fbDB={fbDB}
              />
            </div>

            <div className="col-md-3" >
              <AddEventsFromCSV
                loginStatus={this.state.loginStatus}
                handleChange={this.handleChange}
                value={this.state.values.textArea}
                fbDB={fbDB}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  message: PropTypes.string.isRequired
}

export default App;
