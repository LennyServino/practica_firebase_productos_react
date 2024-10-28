import React from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import RegisterProduct from '../components/RegisterProduct'
import styles from '../styles/Menu.module.css'
import EditForm from '../components/EditForm'

import { IoMenu } from "react-icons/io5";
import Login from '../components/Login'

export default function Menu() {
    /*
        BrowserRouter => Es el contenedor principal para la navegacion para que pueda trabajar con las rutas
        Routes => contenedor que envuelve las rutas
    */

    return (
        <BrowserRouter>
            <header className='pt-4'>
                <nav className='navbar navbar-expand-lg'>
                    <div className="container">
                        <a className="navbar-brand" href="#">
                            <h1 className='text-white'>Prodify</h1>
                            {/* <img src="" alt="Logo" className="d-inline-block align-text-top" /> */}
                        </a>
                        <button className="navbar-toggler text-white border" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <IoMenu />
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
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
