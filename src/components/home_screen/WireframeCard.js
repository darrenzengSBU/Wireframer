import React from 'react';

class TodoListCard extends React.Component {
    render() {
        const { wireframe } = this.props
        // console.log(this.props)
        return (
            <div className="card z-depth-1 todo-list-link blue lighten-5">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;