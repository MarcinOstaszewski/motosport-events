import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { db } from './firebase';

import styles from './App.module.css';

class App extends Component {

  state = {
    values: {},
    filters_data: [],
    filter_inputs: '',
    all_events: []
  };

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

  reloadEvents = () => {
    db.ref(`db/events`).once('value')
    .then((snapshot) => {
      let dane = snapshot.val()
      console.log(dane)
      let items = [];
      items = Object.keys(dane).map(item => {
        // console.log(dane[item].event_name)
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
        let req = data[key].type === 'checkbox' ? '' : true;
        return (<label key={key}>
                  {data[key].full_name}:
                  <input type={data[key].type} name={key} onChange={this.handleChange} required={req}/>
                </label>)
      })
      this.setState({ 
        filter_inputs: fi });
    })

    this.reloadEvents();
  }

  render() {

    let nazwy = this.state.all_events.map(item=><p>{item.event_name} - {item.city}</p>)

    return (
      <div className={styles.App}>
        <div className={styles.row}>
          <div className={styles.colLg3} >
            <h3>Dodaj wydarzenie</h3>
            <form onSubmit={this.handleSubmit} className={styles.form}>
                {this.state.filter_inputs}
                <input type="submit" value="Wyślij" />
            </form>
          </div>
          <div className={styles.colLg9} style={{border: '1px solid blue'}}>
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
    );
  }
}

App.propTypes = {
  message: PropTypes.string.isRequired
}

export default App;
