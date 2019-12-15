import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateDate, changeNameOwner, deleteWireframe } from '../../store/actions/wireframeActions'

import { Modal, Button } from 'react-materialize';
import Control from './Control'
import Draggable from 'react-draggable'

export class WireframeScreen extends Component {
    state = {
        name: '',
        user: '',
        width: 500,
        height: 400,
        tempWidth: 500,
        tempHeight: 400,
        scale: 1,
        controls: []
    }

    componentDidMount() {
        this.props.updateDate(this.props.match.params.id)
        if (this.props.wireframe) {
            console.log(this.props.wireframe)
            this.setState({
                name: this.props.wireframe.name,
                user: this.props.wireframe.user,
                controls: this.props.wireframe.controls,
                width: this.props.wireframe.width,
                height: this.props.wireframe.height,
                tempWidth: this.props.wireframe.width,
                tempHeight: this.props.wireframe.height
            }, () => {
                console.log(this.state)
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

    handleChangeDimensions = (e) => {
        const { target } = e;
        this.setState(state => ({
            ...state,
            [target.id]: parseInt(target.value)
        }))
    }

    handleDeleteWireframe = (e) => {
        this.props.deleteWireframe(this.props.wireframe.id);
        this.props.history.push("/");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.tempWidth<5000 && this.state.tempWidth>0 && this.state.tempHeight<5000 && this.state.tempHeight>0)
        this.setState(state => ({
            ...state,
            width: this.state.tempWidth,
            height: this.state.tempHeight
        }))
    }

    zoomIn = (e) => {
        this.setState({scale: this.state.scale * 2})
    }

    zoomOut = (e) => {
        this.setState({scale: this.state.scale * .5})
    }

    render() {
        // const { auth, wireframe } = this.props;
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        const controls = this.state.controls

        const containerStyle = {
            border: '1px solid',
            height: '500px',
        }

        const wireframeContainerStyle = {
            border: '1px solid',
            height: '500px',
            overflow: 'scroll'
        }

        const wireframeStyle = {
            border: '1px solid',
            position: 'relative',
            transform: 'scale(' + this.state.scale + ')',
            transformOrigin: 'center',
            backgroundColor: 'none',
            width: this.state.width,
            height: this.state.height
        }

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
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="col s4">
                        <div className='col s4'>
                            <label htmlFor="password">Width</label>
                            <input className="active" type="number" id='tempWidth' onChange={this.handleChangeDimensions} defaultValue={this.state.width} />
                        </div>
                        <div className='col s4'>
                            <label htmlFor="password">Height</label>
                            <input className="active" type="number" id='tempHeight' onChange={this.handleChangeDimensions} defaultValue={this.state.height} />
                        </div>
                        <div className="col s3 input-field">
                            <button type="submit" className="btn blue lighten-2 z-depth-0">Submit</button>
                        </div>
                    </form>
                    <div className="blue lighten-2 waves-effect waves-light btn-floating" onClick={this.zoomIn}>
                        <i className="material-icons">add</i>
                    </div>
                    <div className="blue lighten-2 waves-effect waves-light btn-floating" onClick={this.zoomOut}>
                        <i className="material-icons">remove</i>
                    </div>
                </div>

                <div className="row">
                    <div className="col s3 add_controls" style={containerStyle}>
                        Add controls
                        <ul><Button>Container</Button></ul>
                        <ul><Button>Label</Button></ul>
                        <ul><Button>Button</Button></ul>
                        <ul><Button>Textfield</Button></ul>
                    </div>
                    <div className="col s6 controls" style={wireframeContainerStyle}>
                        <div className="container" style={wireframeStyle}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        updateDate: (wireframeId) => dispatch(updateDate(wireframeId)),
        changeNameOwner: (wireframeId, state, targetId) => dispatch(changeNameOwner(wireframeId, state, targetId)),
        // addItem: (listId, state) => dispatch(addItem(listId, state)),
        deleteWireframe: (wireframeId) => dispatch(deleteWireframe(wireframeId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WireframeScreen)
