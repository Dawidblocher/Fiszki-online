import React, { Component } from 'react';
import './css/GamePanel.css';

class GamePanel extends Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            indexWord: 0,
            answer: '',
            inputValue: ""
        } 
        this.startPress= this.startPress.bind(this)
    }

    handleKeyPress(key, word){
        if(key === word[this.state.indexWord]){
            this.setState({
                indexWord: this.state.indexWord +1,
                answer: this.state.answer + key,
                inputValue: this.state.answer + key
            })
        }else if(key === ' ' || key ==='Enter'){
        }
        else{
            this.props.handleFaul()
        }    
        if(this.state.indexWord === word.length && (key !== ' ' || key !=='Enter')){
            setTimeout(() => {
                this.setState({
                    indexWord: 0,
                    answer: '',
                    inputValue: ''
                })
                this.props.renderNewFiche(1)
            }, 300)
        } 
    }
    
    componentDidMount(){
        this._isMounted = true;
        if(this.props.fiche){
            window.addEventListener('keypress', this.startPress);
        }
        
    }

    componentDidUpdate(){
        let word= null;
        if(this.props.leftSite)
            word = this.props.fiche.props.pl
        else
            word = this.props.fiche.props.eng

        if(word[this.state.indexWord] === " "){
            this.setState({
                indexWord: this.state.indexWord + 1,
                answer: this.state.answer + ' '
            })
        }
    }

    startPress = function(e){
        if(this._isMounted){
            if(this.props.leftSite)
                this.handleKeyPress(e.key, this.props.fiche.props.pl)
            else
                this.handleKeyPress(e.key, this.props.fiche.props.eng)
        }   
    }

    componentWillUnmount(){
        this._isMounted= false;
        window.removeEventListener('keypress', this.startPress);
    }

    generateAnswerDesk = (word) => {
        let answer = '';
        const fiche = word.toLowerCase();
        const answerWord = this.state.answer.toLowerCase();
        for(let i = 0; i<  word.length; i++){
            if(fiche[i] === answerWord[i]){
                answer += this.state.answer[i];
            }else if(word[i] === ' '){
                answer += " "
            }
            else{
                answer += "_";
            }
        }
        return answer
    }

    handleInput = (e) => {
        let word= null;
        if(this.props.leftSite)
            word = this.props.fiche.props.pl
        else
            word = this.props.fiche.props.eng
            
        this.handleKeyPress(e.target.value[e.target.value.length - 1].toLowerCase(), word.toLowerCase())
    }

    getPrompt = () => {
        let word= null;
        if(this.props.leftSite)
            word = this.props.fiche.props.pl
        else
            word = this.props.fiche.props.eng

        this.setState({
            answer: this.state.answer + word[this.state.indexWord],
            indexWord: this.state.indexWord + 1
        })

        this.props.handleFaul();
        if(this.state.indexWord === word.length-1){
            setTimeout(() => {
                this.props.renderNewFiche(0)
                this.setState({
                    indexWord: 0,
                    answer: '',
                    inputValue: ''
                })
            }, 1000);
            
        }
    }

    handleNextBtn = () => {
        this.props.renderNewFiche(0);
        this.props.handleFaul();
        this.setState({
            indexWord: 0,
            answer: '', 
        })
    }
    
    render(){
        return (
            <div className="game-panel">
                <input type="text" onChange={(e) => this.handleInput(e)} className="answer-input" spellCheck="false" autoComplete="false" value={this.state.inputValue}/>
                <span className="answer">{(this.props.leftSite ? this.generateAnswerDesk(this.props.fiche.props.pl) : this.generateAnswerDesk(this.props.fiche.props.eng))}</span> 
                <button onClick={this.getPrompt}>Podpowiedź</button>
                <button onClick={this.handleNextBtn}>Pomiń</button>
            </div>
        )
    }
}

export default GamePanel;