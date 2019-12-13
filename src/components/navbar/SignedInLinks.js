import React, { Profiler } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    const { profile } = props
    return (
        <ul className="right">
            <li><NavLink to='/' onClick={props.signOut}>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating blue lighten-1'>{profile.initials}</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default compose(
    firebaseConnect(),
    connect(null, mapDispatchToProps),
  )(SignedInLinks);