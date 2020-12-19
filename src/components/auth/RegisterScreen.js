import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: 'Ceci',
        rEmail: 'ceci@gmail.com',
        rPassword: '123456',
        rPassword2: '123456'
    });

    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

    const handleRegister = ( e ) => {
        e.preventDefault();

        if( rPassword !== rPassword2 ){
            return Swal.fire('Error', 'Passwords should match', 'error');
        }

        dispatch( startRegister( rEmail, rPassword, rName ) );

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Sign up</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="rPassword"
                                value={ rPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create account" />
                        </div>

                        <Link to="/login" className="link">
                            Already have an account?
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    )
}
