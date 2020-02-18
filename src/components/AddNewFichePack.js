import React, {
    Component
} from 'react';
import AddNewFiche from './AddNewFiche';
import './css/Form.css'

class AddNewFichePack extends Component {
    state = {
        packName: '',
        addedFiche: [],
        localStorageData: JSON.parse(localStorage.getItem('fisheBox')),
        errors: {
            errorName: {
                status: false,
                msg: "Taka nazwa paczki już istnieje"
            },
        }
    }

    handleInput = (e) => {
        this.setState({
            packName: e.target.value
        })
    }

    addNewFiche = (left, right) => {
        const newFiche = {
            id: this.state.addedFiche.length,
            eng: left,
            pl: right
        }
        const addedFiche = this.state.addedFiche;
        addedFiche.push(newFiche)
        this.setState({
            addedFiche
        })
    }

    handleCreatePack = (e) => {
        e.preventDefault();
        const localStorageData = this.state.localStorageData;
        const validateStatusFail = this.validateForm(this.state.packName);
        if (!validateStatusFail) {
            const newPack = {
                name: this.state.packName,
                transl: this.state.addedFiche,
            }
            localStorageData.push(newPack);

            localStorage.setItem('fisheBox', JSON.stringify(localStorageData))
            this.props.updatePack()
        } else {
            this.setState({
                errors: {
                    errorName: {
                        status: validateStatusFail,
                        msg: "Taka nazwa paczki już istnieje"
                    },
                }
            })
        }

    }

    validateForm = (name) => {
        const boxes = this.props.pack;
        
        let errorName = false;
        boxes.forEach(item => {
            if (item.name === name)
                errorName = true;
        })
        this.state.localStorageData.forEach(item => {
            if (item.name === name)
                errorName = true;
        })
        return errorName;

    }

    render() {

        const addedFicheFormat = this.state.addedFiche.map(fiche => <li key={fiche.id}><span>{fiche.id}.</span><p>{fiche.eng} - {fiche.pl}</p></li>)
            return ( 
                <div className = "addFicheSite" ><h2>Stwórz nową paczkę</h2>
                    <form><label htmlFor = "name"> Nazwa paczki: <span>{(this.state.errors.errorName.status ? this.state.errors.errorName.msg : null)} </span></label>
                        <input id="name" type="text" onChange={this.handleInput} value = {this.state.packName} autoComplete="off"/>
                        <input id="input-create" type="submit" onClick={(e) => this.handleCreatePack(e)} value="Dodaj Paczkę" autoComplete="off"/>
                    </form>
                    <h2>Dodaj Fiszki</h2>
                    <AddNewFiche addFiche={this.addNewFiche} /> 
                    <ul className="addedFiche">
                        <h3>Dodane Fiszki:</h3>
                        {addedFicheFormat} 
                    </ul>  
                </div>
        );
    }
}

export default AddNewFichePack;