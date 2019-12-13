import React, { Component } from 'react'
import WireframeCard from './WireframeCard'
import { Link } from 'react-router-dom'

class WireframeLinks extends Component {
    render() {
        const {wireframes} = this.props
        return (
            <div className="wireframe-list section">
                <div className="zard z-depth-0 project-summary">
                    {wireframes && wireframes.map(wireframe => {
                        return (
                            <Link to={'./wireframe/' + wireframe.id} key={wireframe.id}>
                                 <WireframeCard wireframe={wireframe}/>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default WireframeLinks
