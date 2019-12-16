import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateDate, changeNameOwner, deleteWireframe, saveWireframe } from '../../store/actions/wireframeActions'

import { Modal, Button } from 'react-materialize';
import Control from './Control'
import ControlProperties from './ControlProperties'

export class WireframeScreen extends Component {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this)
        this.changeProperties = this.changeProperties.bind(this)
        this.changePosition = this.changePosition.bind(this)
        this.changeSize = this.changeSize.bind(this)
    }

    state = {
        name: '',
        user: '',
        width: 500,
        height: 400,
        tempWidth: 500,
        tempHeight: 400,
        scale: 1,
        selectedControl: -1,
        controls: []
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    componentDidMount() {
        this.props.updateDate(this.props.match.params.id)
        if (this.props.wireframe) {
            //console.log(this.props.wireframe)
            this.setState({
                name: this.props.wireframe.name,
                user: this.props.wireframe.user,
                controls: this.props.wireframe.controls,
                width: this.props.wireframe.width,
                height: this.props.wireframe.height,
                tempWidth: this.props.wireframe.width,
                tempHeight: this.props.wireframe.height
            }, () => {
                document.addEventListener("keydown", this.escFunction, false);
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        if (event.keyCode === 68) {
            console.log('ctrl d pressed', event, this.state)
            if (this.state.selectedControl) {
                const controls = this.state.controls
                const index = this.state.selectedControl
                if (index >= 0) {
                    const duplicate = controls[index]
                    const control = JSON.parse(JSON.stringify(duplicate));
                    control.key = controls.length
                    control.x += 100
                    control.y += 100
                    controls[controls.length] = control
                    this.rekey(controls)
                }
                this.setState({
                    controls: controls,
                    selectedControl: controls.length-1
                })
            }
        }
        if (event.keyCode === 46) {
            console.log('delete pressed', this.state, this.state.selectedControl)
            if (this.state.selectedControl) {
                const controls = this.state.controls
                const index = this.state.selectedControl
                //console.log(controls, index)
                if (index >= 0) {
                    controls.splice(index, 1)
                    this.rekey(controls)
                    //console.log(controls)
                }
                this.setState({
                    controls: controls,
                    selectControl: -1
                })
            }
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
        if (this.state.tempWidth < 5000 && this.state.tempWidth > 0 && this.state.tempHeight < 5000 && this.state.tempHeight > 0)
            this.setState(state => ({
                ...state,
                width: this.state.tempWidth,
                height: this.state.tempHeight
            }))
    }

    zoomIn = (e) => {
        this.setState({ scale: this.state.scale * 2 })
    }

    zoomOut = (e) => {
        this.setState({ scale: this.state.scale * .5 })
    }

    rekey = (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i].key = i;
        }
    }

    addControl = (e) => {
        console.log(this.state, e.target)
        const controls = this.state.controls;
        const newContainer = {
            text: "new",
            background: null,
            borderColor: "#000000",
            height: 50,
            key: 0,
            text: "new",
            fontSize: 12,
            type: e.target.id,
            width: 100,
            x: 0,
            y: 0,
        }
        controls.push(newContainer);
        this.rekey(controls)
        this.setState({ controls: controls })
    }

    selectControl(index) {
        this.deselectControl()
        this.setState({ selectedControl: index })
        console.log('selected', index)
    }

    deselectControl() {
        this.setState({ selectedControl: -1 })
        console.log('deselected')
    }

    changeProperties(state) {
        var controls = this.state.controls
        var control = controls[this.state.selectedControl]
        control = {
            ...control,
            background: state.background,
            borderColor: state.borderColor,
            fontSize: state.fontSize,
            text: state.text
        }
        controls[this.state.selectedControl] = control
        this.setState({controls:controls})
    }

    changePosition(x, y) {
        var controls = this.state.controls
        var control = controls[this.state.selectedControl]
        control = {
            ...control,
            x: x,
            y: y
        }
        controls[this.state.selectedControl] = control
        this.setState({controls:controls})
    }

    changeSize(width, height) {
        var controls = this.state.controls
        var control = controls[this.state.selectedControl]
        control = {
            ...control,
            width: width,
            height: height
        }
        controls[this.state.selectedControl] = control
        this.setState({controls:controls})
    }

    saveWork() {
        console.log(this.props.wireframe.id, this.state)
        this.props.saveWireframe(this.props.wireframe.id, this.state)
    }

    render() {
        // const { auth, wireframe } = this.props;
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        const controls = this.state.controls;
        const control = controls[this.state.selectedControl]
        //console.log(control)
        const containerStyle = {
            border: '1px solid',
            height: '600px',
        }

        const wireframeContainerStyle = {
            border: '1px solid',
            height: '600px',
            overflow: 'scroll'
        }

        const wireframeStyle = {
            border: '1px solid',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%) scale(' + this.state.scale + ')',
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
            <div className="white" onKeyDown={this.handleKeyDown}>
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
                            <input className="active" type="number" id='tempWidth' onChange={this.handleChangeDimensions} defaultValue={wireframe.width} />
                        </div>
                        <div className='col s4'>
                            <label htmlFor="password">Height</label>
                            <input className="active" type="number" id='tempHeight' onChange={this.handleChangeDimensions} defaultValue={wireframe.height} />
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
                    <div className="blue right-align lighten-2 waves-effect waves-light btn-floating" onClick={this.saveWork.bind(this)}>
                        <i className="material-icons">save</i>
                    </div>
                </div>

                <div className="row">
                    <div className="col s3 add_controls" style={containerStyle}>
                        Add controls
                        <ul><Button id="container" onClick={this.addControl}>Container</Button></ul>
                        <ul><Button id="label" onClick={this.addControl}>Label</Button></ul>
                        <ul><Button id="button" onClick={this.addControl}>Button</Button></ul>
                        <ul><Button id="textfield" onClick={this.addControl}>Textfield</Button></ul>
                    </div>
                    <div className="col s6 controls" style={wireframeContainerStyle}>
                        <div className="container" onClick={this.deselectControl.bind(this)} style={wireframeStyle}>
                            {controls && controls.map(control => (
                                <div onClick={e => e.stopPropagation()} key={control.key}>
                                    <Control control={control} changePosition={this.changePosition} changeSize={this.changeSize} onSelect={(index) => this.selectControl(index)} index={control.key} />
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="col s3 properties" style={containerStyle}>
                        <ControlProperties changeProperties={this.changeProperties} control={control} />
                    </div>
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
        deleteWireframe: (wireframeId) => dispatch(deleteWireframe(wireframeId)),
        saveWireframe: (wireframeId, state) => dispatch(saveWireframe(wireframeId, state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WireframeScreen)
