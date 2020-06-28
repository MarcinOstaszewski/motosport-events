import React from 'react';

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import styles from './DisplayEvents.module.css';

import BootstrapTable from "react-bootstrap-table-next";

const Events = (props) => {
    
    let columns;
    let events;
    let component;

    if (props.column_names) {
        columns = Object.keys(props.column_names).map(col=>{
            return {
                dataField: col,
                text: props.column_names[col].full_name,
                sort: true
            }
        })
    }
    if (props.all_events) {
        events = props.all_events.map(event => {
            return { ...event,
                homologation_needed: event.homologation_needed ? 'TAK' : 'NIE',
                licence_needed: event.homologation_needed ? 'TAK' : 'NIE',
            }
        })
    }
    if (props.column_names && props.all_events) {
        component = <BootstrapTable
            bootstrap4
            keyField="id"
            data={events}
            columns={columns}
            striped="true"
            condensed="true"
            wrapperClasses={styles.smallTable}
        />
    }
    
    return ( <div>
        {component}
        {/* {nazwy} */}
    </div> );
}
 
export default Events;