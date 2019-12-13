import authReducer from './authReducer'
import wireframeReducer from './wireframeReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    wireframe: wireframeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer