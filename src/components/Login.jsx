import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
    email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ejemplo: usuario@dominio.com"),
    password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres")
})

export default function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <div>
            <section className="gradient-custom">
                <div className="container py-4">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-1 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Ingresa tu correo y contraseña!</p>
                                        <form action="">
                                            <div className="form-outline form-white mb-4">
                                                <label className="form-label" htmlFor="typeEmailX">Correo</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control form-control-lg" 
                                                    placeholder='Ingresa tu correo...'
                                                    {...register('email', {required: true})}
                                                />
                                                <p className="text-danger">
                                                    {errors.email && errors.email.message}
                                                </p>
                                            </div>

                                            <div className="form-outline form-white mb-1">
                                                <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control form-control-lg" 
                                                    placeholder='Ingresa tu contraseña...' 
                                                    {...register('password', {required: true})}
                                                />
                                                <p className="text-danger">
                                                    {errors.password && errors.password.message}
                                                </p>
                                            </div>
                                            <button className="btn btn-outline-light btn-lg px-5 mt-4" type="submit">Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
