import React from 'react';
import Pack from './Pack';
import './css/Box.css';

const Box = (props) => {
    return ( 
    <div className="box">
        <h1>{props.name}</h1>
        <Pack pack ={props.pack} handleKeyPress={props.handleKeyPress} leftSite={props.leftSite} />
    </div> );
}
 
export default Box;