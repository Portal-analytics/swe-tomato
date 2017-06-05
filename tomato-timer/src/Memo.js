import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


class Memo extends Component {

    render() {
        return (
            
              <TextField 
            hintText='Input your task here in 140 characters or less'
            multiLine={true}
            maxLength="140"
            rowsMax={3}
            />

        )
    }
}

/*<div className="memo-text-field">
                    <input type="text" className="memo-input" label="Write Memo Here" onChange={(e) => this.handleMemoChange(e)} />
                    <button className="memo-submit" onClick={(e) => this.handleMemoSubmit(e)}>Submit</button>
                </div>

            </div>*/

export default Memo;