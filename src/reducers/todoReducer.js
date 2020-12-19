import { types } from '../types/types';


// const initialState = {
//     todos: [{
//         title: 'Pasear al perro',
//         date: moment().toDate(),
//         done: false,
//         id: new Date().getTime(),
//         user: {
//             _id: '123',
//             name: 'Paulo'
//         }
//     }]
// };



export const todoReducer = ( state = { todos:[] }, action ) => {

    switch ( action.type ) {

        case types.todoAddNew:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            }
        
        case types.todoDelete:
            return {
                ...state,
                todos: state.todos.filter(
                    todo => ( todo.id !== action.payload.id )
                )
            };

        case types.todoToggle:
            return {
                ...state,
            };

        case types.eventLoaded:
            return {
                ...state,
                todos: [ ...action.payload ]
            }

        default:
            return state;
    }

}