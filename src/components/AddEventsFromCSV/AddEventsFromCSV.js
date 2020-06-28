import React from 'react';
import styles from './AddEventsFromCSV.module.css';

const handleSubmitFromCSV = (...args) => {
    console.log(args)
    let fbDB = args[0];
    let data = args[1];
    let e = args[args.length - 1];
    e.preventDefault();
    if (data) {
        
        let events = data.trim().split(/\r|\n/)
        .map( ev =>{
            ev = ev.replace(/'/g, `"`);
            return JSON.parse(ev);
        })
        console.log(events);
        events.forEach( ev => fbDB.ref('db/events').push( ev ) )
    }
}

const AddEventsFromCSV = (props) => {
    const val = props.value;
    return ( <div>
        <form onSubmit = { handleSubmitFromCSV.bind(this,props.fbDB,val) }
            className = { styles.form }>
            <label>Importuj z formatu CSV:
                <textarea 
                    name="textArea" 
                    className={styles.textArea} 
                    onChange={props.handleChange} />
            </label> 
            <input type="submit" 
                value="Wyślij w formacie CSV" />
        </form>
    </div> );
}
 
export default AddEventsFromCSV;