import React, { Component } from 'react'
import WireframeLinks from './WireframeLinks'
import { connect } from 'react-redux'
import { createWireframe} from '../../store/actions/wireframeActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class HomeScreen extends Component {
    state = {
        name: 'New Wireframe',
        owner: ''
    }

    handleNewWireframe = (e) => {
        this.props.createWireframe(this.state)
    }

    render() {
        //console.log(this.props)
        const { wireframes, auth } = this.props;
        if (!auth.uid) return <Redirect to='/logIn' />
        return (
            <div className="dashboard container white z-depth-1">
                <div className="row">
                    <div className="col s12 m4">
                        <WireframeLinks wireframes={wireframes}/>
                    </div>
                    <div className="col s8">
                        <div className="banner">
                            Wireframer
                        </div>
                        
                        <div className="home_new_wireframe_container">
                                <button className="home_new_wireframe_button" onClick={this.handleNewWireframe}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createWireframe: (wireframe) => dispatch(createWireframe(wireframe))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'wireframes' }
    ])
)(HomeScreen)
