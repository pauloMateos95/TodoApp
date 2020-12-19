import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareNewTodo, prepareTodos } from "../helpers/prepareTodos";
import { types } from "../types/types";


export const todoStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {

            const resp = await fetchConToken( 'events', event, 'Post' );
            const body = await resp.json();

            const events = prepareNewTodo(body.event);

            if ( body.ok ) {
                event.id = events.id;
                event.user = {
                    _id: uid,
                    name
                }
                event.date = events.date
                
                dispatch( todoAddNew( event ) );
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const eventStartLoading = () => {
    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            const events = prepareTodos(body.events);

            dispatch( eventLoaded( events ) );
            
        } catch (error) {
            
        }

    }
}

export const todoStartUpdate = ( event ) => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken( `events/${ event.id }`, event, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( todoToggle( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

export const todoStartDelete = ( event ) => {
    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken( `events/${ event.id }`, event, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( todoDelete( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}


const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
});

const todoAddNew = ( event ) => ({
    type: types.todoAddNew,
    payload: event
});

const todoDelete = ( event ) => ({
    type: types.todoDelete,
    payload: event
});

const todoToggle = ( event ) => ({
    type: types.todoToggle,
    payload: event
});