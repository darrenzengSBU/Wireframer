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