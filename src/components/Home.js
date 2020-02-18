import React from 'react';
import './css/Home.css';
import {Link} from 'react-router-dom';

const Home = (props) => {
    
    return ( 
        <section className="home-page">
            <div className="site-switch">
                <h5>Odgadujesz stronę:</h5>
                <div className="site-switch-wrap">
                    <span>Left</span>
                    <label className="switch">
                        <input type="checkbox" checked={props.leftSite} onChange={(e) => props.handleCheckboxSide(e)}/>
                        <span className="slider"></span>           
                    </label>
                    <span>Right</span>
                </div>
                
            </div>
            
            {props.links}
            
            <Link to={"/addfiche"} className="add-fiche-btn"><p><i className="fas fa-plus-circle"></i></p></Link>
        </section>
        
     );
}
 
export default Home;