import moment from 'moment';


export const prepareTodos = ( events ) => {

    return events.map(
        (e) => ({
            ...e,
            date: moment( e.date ).toString()
        })
    )

}

export const prepareNewTodo = ( event ) => {

    event.date = moment(event.date).toString();

    return {
        ...event
    }

}