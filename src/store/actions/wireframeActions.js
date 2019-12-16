export const createWireframe = (wireframe) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        console.log('hi')
        firestore.collection('wireframes').add({
            controls: [],
            ...wireframe,
            timeStamp: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_WIREFRAME', wireframe: wireframe});
        })
    }
}

export const updateDate = (listId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(listId).update({ timeStamp: new Date() })
    }
}

export const changeNameOwner = (wireframeId, state, targetId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(state, targetId)
        const firestore = getFirestore();
        if (targetId === 'name')
            firestore.collection('wireframes').doc(wireframeId).update({ name: state.name })
        else
            firestore.collection('wireframes').doc(wireframeId).update({ owner: state.owner })
    }
}

export const deleteWireframe = (wireframeId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //console.log(listId)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(wireframeId).delete();
    }
}

export const saveWireframe = (wireframeId, state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log(wireframeId, state)
        console.log(state.height)
        const firestore = getFirestore();
        firestore.collection('wireframes').doc(wireframeId).update({
            controls: state.controls,
            height: state.height,
            width: state.width,
            name: state.name
        })
    }
}