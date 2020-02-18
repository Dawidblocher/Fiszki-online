import React, { Component } from 'react';
import Fiche from './Fiche';
import GamePanel from './GamePanel';

class Pack extends Component {
    constructor(props){
        super(props)
        this.state = {
            leftSite: !props.leftSite,
            fiches: props.pack.map(item => <Fiche id={item.id} eng={item.eng} pl={item.pl} key={item.id} site={!props.leftSite}/>),
            fiche: null,
            points: 0,
            faul: 0,
            packLength: 0,
            
        }
    }

    componentDidMount(){
        this.setState({
            fiche: this.state.fiches[Math.floor(Math.random() * this.state.fiches.length)],
            packLength: this.state.fiches.length
        })
    }

    renderNewFiche = (point) =>{
        this.updateFichePack()
        
        if(this.state.fiches.length !==0){
            this.setState({
                fiche: this.state.fiches[Math.floor(Math.random() * this.state.fiches.length)],
                points: this.state.points + point,
            })
        }else{
            this.setState({
                fiche: null,
                points: this.state.points + point,
            })
        }
    }

    handleFaul = () => {
        this.setState({
            faul: this.state.faul + 1,
        })
    }

    updateFichePack = () => {
        this.state.fiches.splice(this.state.fiches.indexOf(this.state.fiche), 1)
    }

    componentWillUnmount(){
        this.setState({
            fiches: null,
            fiche: null,
            points: 0,
            faul: 0
        })
    }

    render(){
    return (
        <>
            <div className="wrap">
                {this.state.fiche}
                {(this.state.fiche !== null ? 
                <GamePanel 
                    fiche={this.state.fiche} 
                    renderNewFiche={this.renderNewFiche} 
                    handleFaul={this.handleFaul} 
                    leftSite={this.state.leftSite}
                    /> : "Gratulację ukończyłeś cały pakiet") }
            </div>
            <div className="game-info">
                <p>punkty <span>{this.state.points} / {this.state.packLength}</span></p>
                <p>faule <span>{this.state.faul}</span></p>
                
            </div>
        </>
    )
    }
}

export default Pack;