import React from 'react';
import {firebase, googleAuth} from '../../firebase';
// import styles from './AddEvent.module.css';

const signIn = () => {
    firebase.auth().signInWithPopup(googleAuth);
}
const signOut = () => {
    firebase.auth().signOut();
}

const handleSubmit = (e, values, fbDB, reloadEvents) => {
    console.log(e, values);
    e.preventDefault();
    fbDB.ref('db/events').push({
        ...values
    });
    reloadEvents();
}

const createInputsFromData = (data, handleChange) => {
    let fi = Object.keys(data).map(key => {
        let req = '';
        return (
          <div key={key}>
            <label >
              {data[key].full_name}:
              <input type={data[key].type}
                name={key}
                onChange={handleChange}
                className="form-control"
                required={req}/>
            </label>
          </div>
        )
    })
    return fi;
}

const AddEvent = (props) => {
    return ( 
        <div className="form-group">
            <p>Dodaj wydarzenie</p>

            { props.loginStatus ?
                <button onClick={signOut}>Logout</button>
            :
                <button onClick={signIn}>Login</button>
            }
            
            <form onSubmit={handleSubmit.bind(props.values, props.fbDB, props.handleSubmit)} >
                <div className="form-group">
                    {props.column_names ? createInputsFromData(props.column_names, props.handleChange) : ''}
                    <input type="submit" value="Wyślij"/>
                </div>
            </form>
        </div>
     );
}
 
export default AddEvent;

// className={styles.form}
