import React, { Component } from 'react'
import { Rnd } from 'react-rnd'

export class Control extends Component {
    // componentDidUpdate() {
    //     this.props.changePosition(this.state)
    // }

    render() {
        const { control } = this.props
        const containerStyle = {
            border: '1px solid',
            textAlign: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            pointerEvents: 'none',
            color: control.background,
            borderColor: control.borderColor,
            backgroundColor: control.background,
            fontSize: control.fontSize + 'px'
        }
        const buttonStyle = {
            height: '100%',
            width: '100%',
            pointerEvents: 'none',
            borderColor: control.borderColor,
            backgroundColor: control.background,
            fontSize: control.fontSize + 'px'
        }

        const labelStyle = {
            height: '100%',
            width: '100%',
            pointerEvents: 'none',
            borderColor: control.borderColor,
            // backgroundColor: control.background,
            fontSize: control.fontSize + 'px'
        }

        const textStyle = {
            height: '100%',
            width: '100%',
            pointerEvents: 'none',
            borderColor: control.borderColor,
            fontSize: control.fontSize + 'px'
        }
        //console.log(this.props)
        if (control.type === 'container') {
            return (
                <Rnd
                    default={{
                        x: control.x,
                        y: control.y,
                        width: control.width,
                        height: control.height,
                    }}
                    onMouseDown={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.props.changePosition(d.x, d.y)}}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.props.changeSize(ref.style.width, ref.style.height)
                    }}
                >
                    <div className="container" style={containerStyle}></div>
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
                    onMouseDown={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.props.changePosition(d.x, d.y)}}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.props.changeSize(ref.style.width, ref.style.height)
                    }}
                >
                    <div className="container">
                        <label style={labelStyle}>{control.text}</label>
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
                    onMouseDown={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.props.changePosition(d.x, d.y)}}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.props.changeSize(ref.style.width, ref.style.height)
                    }}
                >
                    <button style={buttonStyle}>{control.text}</button>
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
                    onMouseDown={this.props.onSelect.bind(this, this.props.index)}
                    onDragStop={(e, d) => { this.props.changePosition(d.x, d.y)}}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.props.changeSize(ref.style.width, ref.style.height)
                    }}
                >
                    <div className="inpdut-field">
                        <input type="text" style={textStyle} onChange={this.handleChange} defaultValue={control.text} />
                    </div>
                </Rnd>
            )
        }
        return (
            <React.Fragment/>
        )
    }
}



// const rndStyle = {
//     display: 'flex',
//     flexDirection: 'column'
// }

export default Control
