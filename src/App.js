import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebase, db, googleAuth, turnCollectionToArray } from './firebase';

import styles from './App.module.css';

class App extends Component {

  state = {
    values: {},
    filters_data: [],
    filter_inputs: '',
    all_events: [],
    status: false
  };

  signIn = () => {
    firebase.auth().signInWithPopup(googleAuth);
  }
  signOut = () => {
    firebase.auth().signOut();
  }

  handleChange = (e) => {
    let vals = {...this.state.values};
    vals[e.target.name] = e.target.value;
    this.setState({ values: vals });
  }

  handleSubmit = (e) => {
    console.log(this.state.values);
    e.preventDefault();
    db.ref('db/events').push( {...this.state.values} );
    this.reloadEvents();
  }
  
  submitFromCSV = (e) => {
    e.preventDefault();
    console.log(e, this.state.values)
  }
  reloadEvents = () => {
    db.ref(`db/events`).once('value')
    .then((snapshot) => {
      let dane = snapshot.val()
      console.log(dane)
      let items = [];
      items = Object.keys(dane).map(item => {
        console.log(dane[item].event_name)
        return dane[item]
      })
      this.setState({
        all_events: items
      })
    })
  }

  componentDidMount() {
    db.ref(`db/filter_names`).once('value')
    .then((snapshot) => {
      let data = snapshot.val()
      let fi = Object.keys(data).map(key => {
        console.log(data[key].type)
        let req = '';
        return (
            <div>
              <label key={key}>
                {data[key].full_name}:
                <input type={data[key].type}
                  name={key}
                  onChange={this.handleChange}
                  required={req}/>
              </label>
            </div>
        )
      })
      this.setState({ 
        filter_inputs: fi });
    })

    this.reloadEvents();

    turnCollectionToArray();

    firebase.auth().onAuthStateChanged(user=>{
      if (user) {
        this.setState({ status: true })
      } else {
        this.setState({ status: false })
        console.log('!! NOT LOGGED IN !!')
      }
    })
  }

  render() {

    let nazwy = this.state.all_events.map((item,i)=><p key={i}>{item.event_name} - {item.city}</p>)
    
    return (

      <div className={styles.App}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">

              <h4>Dodaj wydarzenie</h4>
              { this.state.status ?
                <button onClick={this.signOut}>Logout</button>
                :
                <button onClick={this.signIn}>Login</button>
              }
              
              <form onSubmit={this.handleSubmit} className={styles.form}>
                  {this.state.filter_inputs}
                  <input type="submit" value="Wyślij" />
              </form>
              
              <form onSubmit={this.submitFromCSV} className={styles.form}>
                  {this.state.filter_inputs ?
                    <label>
                      Importuj z formatu CSV:
                      <textarea name="textArea" className={styles.textArea} value={this.state.value} onChange={this.handleChange} />
                    </label> : ''
                  }
                  <input type="submit" value="Wyślij w formacie CSV" />
              </form>

            </div>
            <div className="col-md-9" style={{border: "1px solid blue"}}>
              Select
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              {nazwy}
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


// {styles.row} {styles.colLg3}   {styles.colLg9}