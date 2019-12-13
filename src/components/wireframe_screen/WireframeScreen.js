import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export class WireframeScreen extends Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/logIn' />
        return (
            <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">wireframe 1</span>
                <p>Posted by the Net Ninja</p>
                <p className="grey-text">3rd September, 2am</p>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data;
    const wireframe = wireframes ? wireframes[id] : null;
    if (wireframe)
        wireframe.id = id;

    return {
        wireframe,
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps)(WireframeScreen)
