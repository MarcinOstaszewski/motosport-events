import firebase from 'firebase/app';
import { auth } from 'firebase'
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCYPl78HDniACeZdF1N3DYGXsh1SupAz0M",
    authDomain: "motosporteventspl.firebaseapp.com",
    databaseURL: "https://motosporteventspl.firebaseio.com",
    projectId: "motosporteventspl",
    storageBucket: "motosporteventspl.appspot.com",
    messagingSenderId: "116718912115",
    appId: "1:116718912115:web:f6f378ab2a482a2e866006"
};

firebase.initializeApp(config);

const db = firebase.database();
const googleAuth = new auth.GoogleAuthProvider();

const createFilterNames = () => {
    const filter_names = {
        event_name: {full_name: 'Nazwa wydarzenia',type:'text'},
        category: {full_name: 'Kategoria',type:'text'},
        series_name: {full_name: 'Nazwa serii',type:'text'},
        voivodship: {full_name: 'Województwo',type:'text'},
        city: {full_name: 'Miejscowość',type:'text'},
        locale_name: {full_name: 'Nazwa lokalizacji',type:'text'},
        date: {full_name: 'Data wydarzenia',type:'text'},
        licence_needed: {full_name: 'Licencja obowiązkowa',type:'checkbox'},
        homologation_needed: {full_name: 'Homologacja obowiązkowa',type:'checkbox'},
        details: {full_name: 'Szczegóły',type:'text'},
        link: {full_name: 'Link',type:'text'},
    }
    db.ref(`db/filter_names`).set(filter_names);
}

const turnCollectionToArray = () => {

            // METHODS 
            // .limitToFirst(10)
            // .limitToLast(10)
            // .orderByChild('date').limitToLast(10)
            // .orderByChild('name').equalTo('John')
    db.ref('db/events').once('value')
    .then(snapshot => {
        const events = [];

        snapshot.forEach((child) => {
            events.push({
                id: child.key,
                ...child.val()
            })
        })
        console.log(events);
    })
}
                // TO CREATE NEW SET OF FILTER NAMES:
                // createFilterNames();

export {
    firebase,
    db,
    googleAuth,
    createFilterNames,
    turnCollectionToArray
};