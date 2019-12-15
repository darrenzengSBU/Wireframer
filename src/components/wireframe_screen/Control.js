import React, { Component } from 'react'
import { Rnd } from 'react-rnd'

export class Control extends Component {
    state = {
        width: '',
        height: '',
        x: '',
        y: '',
    }

    componentDidUpdate() {
        //console.log(this.state)
    }

    render() {
        const { control } = this.props
        // console.log(this.props)
        if (control.type === 'container') {
            return (
                <Rnd
                    default={{
                        x: control.x,
                        y: control.y,
                        width: control.width,
                        height: control.height,
                    }}
                    onClick={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}
                >
                    <div className="container" style={containerStyle}>container</div>
                </Rnd>
            )
        }
        if (control.type === 'label') {
            return (
                <Rnd
                    default={{
                        x: control.x,
                        y: control.y,
                        width: control.width,
                        height: control.height,
                    }}
                    onClick={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}
                >
                    <div className="container" style={containerStyle}>
                        <label style={controlStyle}>label</label>
                    </div>
                </Rnd>
            )
        }
        if (control.type === 'button') {
            return (
                <Rnd
                    default={{
                        x: control.x,
                        y: control.y,
                        width: control.width,
                        height: control.height,
                    }}
                    onClick={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}
                >
                    <button style={controlStyle}>button</button>
                </Rnd>
            )
        }
        if (control.type === 'textfield') {
            return (
                <Rnd
                    default={{
                        x: control.x,
                        y: control.y,
                        width: control.width,
                        height: control.height,
                    }}
                    onClick={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}
                >
                    <div className="input-field">
                        <input type="text" style={controlStyle} onChange={this.handleChange} defaultValue="textfield" />
                    </div>
                </Rnd>
            )
        }
        return (
            <Rnd
                default={{
                    x: control.x,
                    y: control.y,
                    width: control.width,
                    height: control.height,
                }}
                onClick={this.props.onSelect.bind(this, this.props.index)}
                onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        ...position,
                    });
                }}
            >
                <button style={controlStyle}>button</button>
            </Rnd>
        )
    }
}

const containerStyle = {
    border: '1px solid',
    textAlign: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    pointerEvents: 'none'
}

// const rndStyle = {
//     display: 'flex',
//     flexDirection: 'column'
// }

const controlStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: 'navyblue',
    pointerEvents: 'none'
}

export default Control
