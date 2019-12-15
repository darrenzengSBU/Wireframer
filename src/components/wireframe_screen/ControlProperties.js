import React, { Component } from 'react'

export class ControlProperties extends Component {
    state = {
        text: '',
        fontSize: '',
        background: '',
        borderColor: '',
    }

    // componentDidMount() {
    //     if (this.props.control) {
    //         console.log(this.props.control)
    //         const { control } = this.props
    //         this.setState({
    //             text: control.text,
    //             fontSize: control.fontSize,
    //             background: control.background,
    //             borderColor: control.borderColor,
    //             borderThickness: control.borderThickness,
    //             borderRadius: control.borderRadius
    //         }, () => {
    //             console.log('hello')
    //         })
    //     }
    // }

    onChange = (e) => {
        var text = document.getElementById("text_input_field")
        var fontSize = document.getElementById("fontSize_input_field")
        var background = document.getElementById("background_input_field")
        var borderColor = document.getElementById("borderColor_input_field")
        // console.log(text, fontSize, background)
        this.setState({
            [text.name]: text.value,
            [fontSize.name]: fontSize.value,
            [background.name]: background.value,
            [borderColor.name]: borderColor.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        //console.log(e)
        this.props.changeProperties(this.state);
    }

    render() {
        //console.log(this.props)
        const { control } = this.props;
        if (this.props.control) {
            return (
                <div id="item_form_container">
                    <strong id="item_heading">Properties</strong>
                    <div />
                    <span id="text_prompt">Text:</span>
                    <input
                        id="text_input_field"
                        name="text"
                        defaultValue={control.text}
                        onChange={this.onChange} />
                    <div />   
                    <span>Font Size:</span>
                    <input
                        id="fontSize_input_field"
                        name="fontSize"
                        type="number"
                        defaultValue={control.fontSize}
                        onChange={this.onChange} />
                    <div />
                    <span>Background: </span>
                    <input
                        id="background_input_field"
                        name="background"
                        type="color"
                        defaultValue={control.background}
                        onChange={this.onChange} />
                    <div />
                    <span>Border Color:</span>
                    <input
                        id="borderColor_input_field"
                        name="borderColor"
                        type="color"
                        defaultValue={control.borderColor}
                        onChange={this.onChange} />
                    <div />
                        <button type="submit" id="item_form_submit_button" onClick={this.onSubmit}>Submit</button>
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
