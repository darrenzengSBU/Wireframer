import React, { Component } from 'react'

export class ControlProperties extends Component {
    render() {
        //console.log(this.props)
        if (this.props.control) {
            return (
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Register</h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
                        </div>
                        <div className="input-field">
                            <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div>
                Properties
            </div>
        )
    }
}

export default ControlProperties
