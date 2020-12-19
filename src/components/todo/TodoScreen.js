import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { Navbar } from '../ui/Navbar';
import './todo.css';
import { TodoModal } from './TodoModal';
import { eventStartLoading, todoStartDelete, todoStartUpdate } from '../../actions/todos';



export const TodoScreen = () => {

    const dispatch = useDispatch();
    const { todos } = useSelector(state => state.todo);
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {
        
        dispatch( eventStartLoading() );

    }, [ dispatch ])

    const handleAdd = () => {
        dispatch( uiOpenModal() );
    }

    const handleDelete = ( e ) => {
        dispatch( todoStartDelete(e) );
    }

    const handleToggle = ( e ) => {
        e.done = !e.done

        dispatch( todoStartUpdate(e) );
    }


    return (
        <div>
            <Navbar />

            <div className="container">

                <div className="row justify-content-center">
                    <h1>To do List</h1>
                </div>

                <div className="row justify-content-center py-3">
                    <button
                        onClick={ handleAdd }
                        className="btn btn-success"
                    >
                        Add new task
                    </button>
                </div>

                <div className="row">
                    <div className="col">
                        <ul className="list-group list-group-flush">
                            {
                                todos.map( (todo)=> (

                                    ( uid === todo.user._id ) ?
                                        <li
                                            key={ todo.id }
                                            className="list-group-item"
                                        > 
                                            <p 
                                                className={ `${ todo.done && 'complete' }` }
                                                onClick={ () => handleToggle( todo ) }
                                            >
                                                <strong>Task: </strong> { todo.title }
                                            </p>
                                            <p
                                                className={ `${ todo.done && 'complete' }` }
                                                onClick={ () => handleToggle( todo ) }
                                            >
                                                <strong>Due date: </strong> { todo.date }
                                            </p>
                                            <button
                                                onClick={ () => handleDelete( todo ) }
                                                className="btn btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </li> :
                                        false
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>

            <TodoModal />

        </div>
    )
}
