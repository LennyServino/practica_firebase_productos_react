import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import {db} from '../firebase/appConfig'
import styles from '../styles/ListProducts.module.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function ListProducts() {
    //declaramos un estado para la lista de productos
    const [products, setProducts] = useState([])

    //montando la informacion de los productos que hay en firebase
    useEffect(() => {
        //funcion que nos permite visualizar la info de la BD en tiempo real
        onSnapshot(
            //obtenemos la conexion de la BD y el nombre de la coleccion
            collection(db, "products"),
            (snapshot) => {
                //objeto de firebase
                //console.log(snapshot);
                //testeando el primer documento de la coleccion
                //console.log(snapshot.docs[0].data());
                
                /* mapeando / iterando los documentos de la coleccion */
                const array_products = snapshot.docs.map((doc) => {
                    //copiar la data de cada documento de la coleccion productos y la mandamos al array_products
                    return {...doc.data(), id: doc.id}
                })
                //probar
                //console.log(array_products);
                
                //actualizamos el estado con el arreglo de productos
                setProducts(array_products)
            }
        )
    }, [])

    //funcion para eliminar el producto
    const deleteProduct = (id) => {
        //console.log("Hola desde eliminar", id);

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    //eliminar el documento
                    deleteDoc(doc(db, "products", id))
    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.log("Error al eliminar la alerta", error);
            
        }
        
    }

    return (
        <div className='pt-4'>
            <h2 className='text-center fs-1 py-0 py-md-4'>Lista de productos</h2>
            <div className={styles.container}>
                {
                    products.length > 0 ?
                        products.map((product) => {
                            return (
                                <div key={product.id} className={styles.card_product}>
                                    <div className='d-flex flex-column text-center gap-2'>
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className='d-flex justify-content-around px-5 mt-3'>
                                        <Link to={`/editar/${product.id}`} className={`btn btn-warning ${styles.btn}`}>Editar</Link>
                                        <button onClick={() => deleteProduct(product.id)} className={`btn btn-danger ${styles.btn}`}>Eliminar</button>
                                    </div>
                                </div>
                            )
                        })
                    : <p>No hay productos por el momento</p>
                }
            </div>
        </div>
    )
}
