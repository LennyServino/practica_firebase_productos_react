import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {db} from '../firebase/appConfig';
import styles from '../styles/RegisterProducts.module.css'
import { useForm } from 'react-hook-form'


export default function EditForm() {
    //useParams captura los parametros que mandamos en las rutas
    const { id } = useParams();

    const { register, handleSubmit, setValue, formState: {errors} } = useForm()

    const navigate = useNavigate()

    //montando el producto seleccionado
    useEffect(() => {
        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id))
            //console.log(productDoc)

            //validamos si el documento existe
            if(productDoc.exists()) {
                const productData = productDoc.data()
                console.log(productData);

                //mandar la informacion del producto al formulario
                setValue('name', productData.name)
                setValue('description', productData.description)
            } else {
                console.log("No existe la data");
                
            }
        }

        getProductById()
    }, [])

    const editProduct = async (data) => {
        try {
            //Actualizamos el producto
            updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            })

            //redireccionamos a la lista de productos
            navigate("/productos")
        } catch (error) {
            console.error(`Error al actualizar el producto`, error);
            
        }
    }

    return (
        <div className={styles.form_container}>
            <h2>Editar productos</h2>
            <form action="" onSubmit={handleSubmit(editProduct)}>
                <div>
                    <label htmlFor="">Ingresar Producto</label>
                    <input type="text" {...register('name', {required: "Este campo es obligatorio", pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ, ]+$/i,
                        message: 'Este campo solo debe contener letras' 
                    }
                    })}/>
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="">Descripcion</label>
                    <input type="text" {...register('description', {required: "Este campo es obligatorio",  pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ, ]+$/i,
                        message: 'Este campo solo debe contener letras' 
                    }
                    })}/>
                    {errors.description && <span>{errors.description.message}</span>}
                </div>
                <div>
                    <button type='submit' className={styles.btn}>Editar Producto</button>
                </div>
            </form>
        </div>
    )
}
