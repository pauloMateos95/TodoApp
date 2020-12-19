import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { todoStartAddNew } from '../../actions/todos';

import './modal.css';



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
Modal.setAppElement('#root');


const now = moment().minutes(0).seconds(0).add(1, 'hours');

const initEvent = {
    title: '',
    date: now.toDate(),
    done: false
}


export const TodoModal = () => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [titleValid, setTitleValid] = useState( true );

    const [formValues, setFormValues] = useState( initEvent );

    const { title } = formValues;

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        setFormValues( initEvent );
    }

    const handleDueDate = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            date: e
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if ( title.trim().length < 1 ) {
            return setTitleValid(false);
        }

        dispatch( todoStartAddNew( formValues ) );

        setTitleValid(true);
        closeModal();

    }

    return (
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1> New task </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Task due date</label>
                    <DateTimePicker
                        onChange={ handleDueDate }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Task</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Title"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
