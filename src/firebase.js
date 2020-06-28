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

const fbDB = firebase.database();
const googleAuth = new auth.GoogleAuthProvider();

const createFilterNames = () => {
    const filter_names = {
        event_name: {full_name: 'Nazwa wydarzenia',type:'text',required:'true'},
        type_of_event: {full_name: 'Typ wydarzenia',type:'select'},
        category: {full_name: 'Kategoria',type:'text'},
        series_name: {full_name: 'Nazwa serii',type:'text'},
        voivodship: {full_name: 'Województwo',type:'select',required:'true'},
        city: {full_name: 'Miejscowość',type:'text'},
        locale_name: {full_name: 'Nazwa lokalizacji',type:'text',required:'true'},
        date: {full_name: 'Data wydarzenia',type:'text',required:'true'},
        licence_needed: {full_name: 'Licencja obowiązkowa',type:'checkbox'},
        homologation_needed: {full_name: 'Homologacja obowiązkowa',type:'checkbox'},
        details: {full_name: 'Szczegóły',type:'text'},
        link: {full_name: 'Link',type:'text',required:'true'},
    }
    fbDB.ref(`db/filter_names`).set(filter_names);
}

const turnCollectionToArray = () => {

            // METHODS 
            // .limitToFirst(10)
            // .limitToLast(10)
            // .orderByChild('date').limitToLast(10)
            // .orderByChild('name').equalTo('John')
    fbDB.ref('db/events').once('value')
    .then(snapshot => {
        const events = [];

        snapshot.forEach((child) => {
            events.push({
                id: child.key,
                ...child.val()
            })
        })
    })
}

export {
    firebase,
    fbDB,
    googleAuth,
    createFilterNames,
    turnCollectionToArray
};