import React from 'react';
import './css/Fiche.css';
import miniLogo from '../img/miniLogo.png';

function Fiche(props){
    return (
        <div className="fiche">
            <img className="miniLogo" src={miniLogo} alt="logo"/>
            <p className="fiche-text">{(props.site ?  props.eng : props.pl)}</p>
        </div>
    )
}

export default Fiche;