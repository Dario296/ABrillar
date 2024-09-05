import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../config/firebase';
import FormFieldsByCategory from "../../hooks/FormFieldsByCategory";

const db = getFirestore(app);

const categories = [
    'ofertas', 'autos', 'bolsas', 'cocina', 'insecticidas',
    'otros', 'pisos', 'ropa', 'gato', 'perro'
];

const CreateProduct = () => {
    const methods = useForm();
    const { handleSubmit, watch, reset, formState: { errors } } = methods;
    const [message, setMessage] = useState('');
    const categoria = watch('categoria');

    const onSubmit = async (data) => {
        const { categoria, descripcion1, nombre, porcentaje, referencia, unidades, costo, stock } = data;

		const product = {
			categoria,
			descripcion1,
			nombre,
			porcentaje: Number(porcentaje),
			...(categoria === 'ofertas' ? { referencia, unidades: Number(unidades) } : { costo: Number(costo), stock: Number(stock) }),
		};
        try {
            const ProductosRef = collection(db, 'ListadoProductos');
            const docRef = await addDoc(ProductosRef, product);
            setMessage(`Producto guardado con éxito. ID: ${docRef.id}`);
            reset();
        } catch (error) {
            setMessage('Error al guardar el producto.');
        }
    };

    return (
        <FormProvider {...methods}>
            <Box sx={{ p: 2 }}>
                {message && <h3>{message}</h3>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth>
                        <InputLabel>Categoría</InputLabel>
                        <Select {...methods.register('categoria', { required: 'Debe seleccionar una categoría' })}>
                            <MenuItem value={"baños"}>
                                Baños
                            </MenuItem>
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.categoria && <FormHelperText error>{errors.categoria.message}</FormHelperText>}
                    </FormControl>

                    <FormFieldsByCategory categoria={categoria} />

                    <Button type='submit'>
                        Guardar
                    </Button>
                </form>
            </Box>
        </FormProvider>
    );
};

export default CreateProduct;
