import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth_user } from '../firebase/appConfig';
import { useNavigate } from 'react-router-dom';

/* importando estilos personalizados */
import styles from '../styles/Login.module.css'

const schema = yup.object().shape({
    email: yup.string().required("El correo es obligatorio").email("Correo Invalido, ejemplo: usuario@dominio.com"),
    password: yup.string().required("Campo Obligatorio").min(8, "La contraseña debe contener al menos 8 caracteres")
})

export default function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()

    const handleLogin = (data) => {
        //console.log(data)
        signInWithEmailAndPassword(auth_user, data.email, data.password)
        .then((userCredential) => {
            const userFirebase = userCredential.user
            //console.log(userFirebase);
            
            localStorage.setItem('user_prodify', JSON.stringify(userFirebase))
            navigate('/')
        }).catch((error) => {
            console.error(error.message);
            Swal.fire({
                title: "Credenciales Invalidas",
                text: "Revisa tu informacion",
                icon: "warning"
            });
        })
    }

    return (
        <div>
            <section className={styles.backgroudn_login}>
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center vh-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-1 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Ingresa tu correo y contraseña!</p>
                                        <form action="" onSubmit={handleSubmit(handleLogin)}>
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
