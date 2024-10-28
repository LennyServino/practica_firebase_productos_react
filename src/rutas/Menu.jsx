import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import RegisterProduct from '../components/RegisterProduct'
import styles from '../styles/Menu.module.css'
import EditForm from '../components/EditForm'

import { IoMenu } from "react-icons/io5";
import Login from '../components/Login'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth_user } from '../firebase/appConfig'

export default function Menu() {
    /*
        BrowserRouter => Es el contenedor principal para la navegacion para que pueda trabajar con las rutas
        Routes => contenedor que envuelve las rutas
    */

    const [user, setUser] = useState(null)


    useEffect(() => {
        //accediendo al usuario del localstorage
        const userStorage = JSON.parse(localStorage.getItem("user_prodify"))

        //verificamos si el usuario esta en firebase
        //userFirebase = devuelve un objeto si la persona existe
        onAuthStateChanged(auth_user, (userFirebase) => {
            if(userFirebase) {
                console.log(userFirebase);           
                //si el usuario existe guardamos los datos
                setUser(userFirebase)
            } else {
                setUser(null)
            }
        })
    }, [])

    const logOut = () => {
        signOut(auth_user).then(() => {
            alert("La sesion se ha cerrado")
            //enviamos al usuario a la pagina de login
            window.location.href = '/login'
        }).catch((error) => {
            console.error("Error al cerrar sesion", error)
        })
    }

    return (
        <BrowserRouter>
            <header className='pt-4'>
                <nav className='navbar navbar-expand-lg'>
                    <div className="container">
                        <Link to='/' className="navbar-brand">
                            <h1 className='text-white'>Prodify</h1>
                        </Link>
                        <button className="navbar-toggler text-white border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <IoMenu />
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            {
                                user ? (
                                    <>
                                        <div className={`dropdown py-2 px-0 px-md-4 ${styles.user_dropdown}`} id="navbarNavDarkDropdown">
                                            <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Dropdown
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                <li>
                                                    <a className="dropdown-item" onClick={logOut}>Cerrar Sesion</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) : ''
                            }
                            <ul className="navbar-nav">
                                <li className={`nav-item ${styles.nav_item_btn}`}>
                                    <Link to='/' className="nav-link text-white">Home</Link>
                                </li>
                                <li className={`nav-item ms-lg-5 ${styles.nav_item_btn}`}>
                                    <Link to='/productos' className="nav-link text-white">Productos</Link>
                                </li>
                                <li className={`nav-item ms-lg-5 ${styles.nav_item_btn}`}>
                                    <Link to='/registro' className="nav-link text-white">Registro</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Routes>
                {/* Asignamos las rutas y su componente */}
                <Route path='/' element={<Home />}/>
                <Route path='/productos' element={<ListProducts />}/>
                <Route path='/registro' element={<RegisterProduct />}/>
                <Route path='/login' element={<Login />}/>
                {/* creando una ruta con parametro */}
                <Route path='/editar/:id' element={<EditForm />}/>
            </Routes>
        </BrowserRouter>
    )
}
