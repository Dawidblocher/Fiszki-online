import React, { Component } from 'react';

class AddNewFiche extends Component {
    constructor(props){
        super(props);
        this.state = {
            left: '',
            right: ''
        }
    }

    handleLeftInput = (e) => {
        this.setState({
            left: e.target.value
        })
    }

    handleRightInput = (e) => {
        this.setState({
            right: e.target.value
        })
    }

    handleClick = () => {
        this.props.addFiche(this.state.left, this.state.right)
        this.setState({
            left: '',
            right: ''
        })
    }

    render() { 
        return ( 
            <>
            <div className="addFicheForm">
                <div className="logo-fiche">Fiszki-Online</div>
                <div className="input-wrap">
                    <label htmlFor="left">Left side: </label> 
                    <input id="left" type="text" onChange={this.handleLeftInput} value={this.state.left} autoComplete="off"/> 
                </div>
                <div className="input-wrap">
                    <label htmlFor="right">Right side: </label> 
                    <input id="right" type="text" onChange={this.handleRightInput} value={this.state.right} autoComplete="off"/>
                </div>
                
            </div>
            <button className="addFicheBtn" onClick={this.handleClick}>Dodaj</button>
            </>
         );
    }
}
 
export default AddNewFiche;