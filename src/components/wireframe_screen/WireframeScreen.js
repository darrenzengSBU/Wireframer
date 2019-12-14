import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateDate, changeNameOwner, deleteWireframe } from '../../store/actions/wireframeActions'

import { Modal, Button } from 'react-materialize';
import Control from './Control'

export class WireframeScreen extends Component {
    state = {
        name: '',
        owner: '',
        width: '500px',
        height: '400px',
        controls: []
    }

    componentDidMount() {
        this.props.updateDate(this.props.match.params.id)
        if (this.props.wireframe) {
            this.setState({
                name: this.props.wireframe.name,
                owner: this.props.wireframe.owner,
                controls: this.props.wireframe.controls
            }, () => {
                console.log(this.state.controls)
            })
        }
    }


    handleChange = (e) => {
        const { target } = e;
        console.log(this.props.wireframe.owner)
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        })

            // , () => {
            //     this.props.changeNameOwner(this.props.wireframe.id, this.state, target.id)
            // }
        )
    }

    handleDeleteWireframe = (e) => {
        this.props.deleteWireframe(this.props.wireframe.id)
        this.props.history.push("/")
    }

    render() {
        // const { auth, wireframe } = this.props;
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        const controls = this.state.controls
        // console.log(controls)
        // console.log(wireframe)
        if (!auth.uid) return <Redirect to='/logIn' />
        if (!wireframe)
            return <Redirect to='/' />
        return (
            <div className="white">
                <h5 className="grey-text text-darken-3">Wireframe</h5>
                <div className="right-align container">
                    <a className="blue lighten-2 waves-effect waves-light btn modal-trigger" href="#modal1">
                        <i className="material-icons">delete</i>
                    </a>
                    <Modal id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>Delete Wireframe?</h4>
                            <p>Are you sure you want to delete this wireframe?</p>
                            <p>This wireframe will not be retrievable.</p>
                        </div>
                        <div className="grid right-align">
                            <Button onClick={this.handleDeleteWireframe}>yes</Button>
                            <React.Fragment> </React.Fragment>
                            <Button className="modal-close">no</Button>
                        </div>
                    </Modal>
                </div>
                <div>
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={wireframe.name} />
                </div>
                <div>
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={wireframe.owner} />
                </div>
                <div className="row">
                    <div className="col s3 add_controls" style={containerStyle}>
                        Add controls
                        <ul><Button>Container</Button></ul>
                        <ul><Button>Label</Button></ul>
                        <ul><Button>Button</Button></ul>
                        <ul><Button>Textfield</Button></ul>
                    </div>
                    <div className="col s6 controls z-depth-1" style={containerStyle}>
                        <div className="container" style={wireframeStyle}>
                            hello
                            {controls && controls.map(control => (
                                    <Control control={control} key={control.key} />
                            ))}
                        </div>
                    </div>
                    <div className="col s3 properties" style={containerStyle}>Properties</div>
                </div>
            </div>
        )
    }
}

const containerStyle = {
    border: '1px solid',
    height: '500px',
    textAlign: 'center',
    alignItems: 'center',
}

const wireframeStyle = {
    border: '1px solid',
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'powderblue',
    width: '500px',
    height: '400px'
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const { wireframes } = state.firestore.data;
    const wireframe = wireframes ? wireframes[id] : null;
    console.log(state)
    if (wireframe)
        wireframe.id = id;

    return {
        wireframe,
        auth: state.firebase.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDate: (wireframeId) => dispatch(updateDate(wireframeId)),
        changeNameOwner: (wireframeId, state, targetId) => dispatch(changeNameOwner(wireframeId, state, targetId)),
        // addItem: (listId, state) => dispatch(addItem(listId, state)),
        deleteWireframe: (wireframeId) => dispatch(deleteWireframe(wireframeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WireframeScreen)
