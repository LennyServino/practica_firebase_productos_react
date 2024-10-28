import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useForm } from 'react-hook-form'
import {db} from '../firebase/appConfig';
import styles from '../styles/RegisterProducts.module.css'
import { useNavigate } from 'react-router-dom';

export default function RegisterProduct() {
    const { register, handleSubmit, watch, formState: {errors} } = useForm()
    /*
        register = hace referencia a lo que capturo en la entrada de dato
        watch = permite observar
        handleSubmit = esla acciom de lo que voy haver con la informacion
    */

    //creando una constante para redirigir a una ruta
    const navigate = useNavigate()

    const saveProduct = async (data) => {
        console.log('se ha guardado');
        
        //conectarnos a la bd y guarda un documento
        try {
            await addDoc(collection(db, "products"), {
                name: data.name,
                description: data.description
            })
        } catch (error) {
            console.error("Error al registrar el producto", error);
            
        }
        //redireccionamos a la lista de productos
        navigate("/productos")
    }

    //console.log(watch('name'));
    
    return (
        <div className={styles.form_container}>
            <h2>Registro de productos</h2>
            <form action="" onSubmit={handleSubmit(saveProduct)}>
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
                    <button type='submit' className={styles.btn}>Guardar Producto</button>
                </div>
            </form>
        </div>
    )
}
