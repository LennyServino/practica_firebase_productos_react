import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className='container text-center'>
            <div className='mt-5 py-0 py-md 5'>
                <div className={`card mx-auto ${styles.card_style}`}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-7 py-5 px-5 text-start">
                                <h1 className="card-title">Bienvenido a Prodify</h1>
                                <p className="card-text mt-4">Tu plataforma para una gestión de productos eficiente y sin complicaciones. Desde aquí, tienes acceso a todas las herramientas que necesitas para optimizar tus procesos, monitorear el inventario y analizar el rendimiento de tus productos en tiempo real</p>
                                <Link to="/productos" className='btn btn-dark mt-4'>Ver Productos</Link>
                            </div>
                            <div className="col-md-5 text-start">
                                <img src="https://res.cloudinary.com/ddnkevlzw/image/upload/v1730233307/inventario_sfcpto.webp" alt="home image" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
