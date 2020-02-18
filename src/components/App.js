import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Box from './Box';
import json from '../data/json.json';
import Home from './Home';
import AddNewFichePack from './AddNewFichePack'
import EntrySite from './EntrySite';
class App extends Component {

  state= {
    pack: [],
    leftSite: false,
  }

  componentDidMount(){
    this.updatePack();
  }

  updatePack = () => {
    if (!localStorage.getItem('fisheBox')) {
      localStorage.setItem('fisheBox', JSON.stringify(this.state.pack))
      const pack = json.boxs;
      this.setState({
        pack
      })
    }else{
      const localData = JSON.parse(localStorage.getItem('fisheBox'));
      if(json ){
        const pack = []
        json.boxs.forEach(element => pack.push(element))
        localData.forEach(element => pack.push(element))   
        this.setState({
          pack
        })
      }
    }
  }

  handleCheckboxSide = (e) => {
    setTimeout(this.setState({
      leftSite: e.target.checked
    }), 1000)
  }

  handleDeleteBtn = (name) => {
    const pack = JSON.parse(localStorage.getItem('fisheBox'));
    const pos = pack.map(item => item.name ).indexOf(name);
    if(pos >= 0)
      pack.splice(pos, 1);
    localStorage.setItem('fisheBox', JSON.stringify(pack))
    this.updatePack();
  }

  render(){
    const boxes = this.state.pack.map(pack => <Route key={pack.name} path={"/"+pack.name} exact component={() => <Box key={pack.name} name={pack.name} pack ={pack.transl} leftSite={this.state.leftSite}/>}/>);
    const links = this.state.pack.map(pack => (
      <div className="link-wrap" key={pack.name}>
        {(pack.standard ? null : <button onClick={() => this.handleDeleteBtn(pack.name)} className="delete-btn"><i className="fas fa-trash"></i></button>)}
        <Link key={pack.name} to={"/"+pack.name} >
          <div  key={pack.name} className="box-link">
            <div className="logo-fiche">Fiszki-Online</div>
            <p>{pack.name}</p>
          </div>
        </Link>
      </div>
    ))
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="wrap-package">
          <Link to="/home" >Fiszki-Online</Link>
          
          
        </header>
        <section>
        <Switch>
          <Route path="/home" exact component={() => <Home boxes={boxes} links={links} leftSite={this.state.leftSite} handleCheckboxSide={this.handleCheckboxSide}/>}/>
          <Route path="/addfiche" exact component={() => <AddNewFichePack pack = {this.state.pack} updatePack = {this.updatePack}/>}/>
          <Route path="/" exact component={() => <EntrySite />}/>
          {boxes}
        </Switch>

        </section>
        </div>
        
      </BrowserRouter>
    );
  }
  
}

export default App;
