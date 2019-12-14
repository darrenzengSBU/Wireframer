import React, { Component } from 'react'

export class Control extends Component {
    render() {
        const { control } = this.props
        console.log(control, 'hi')
        return (
            <div>
                <div className="card z-depth-1 todo-list-link blue lighten-5">
                    <div className="card-content grey-text text-darken-3">
                        <span className="card-title">test</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Control
