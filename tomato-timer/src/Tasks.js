import React, { Component } from 'react';

export default class Tasks extends Component{
    constructor(props){
        super(props);

        this.state={
            tasks: this.props.tasks
        }
    }


    render(){
        var past_tasks = this.state.tasks.map((task) => {
            return(
                <p> {task} </p>
            )
        })
        return(
           <div>
           {past_tasks}
            </div>
        )
    }
}