import FormField from "./FormFields";

const FormFieldsByCategory = ({ categoria }) => {
    if (categoria === 'ofertas') {
        return (
            <>
                <FormField name='descripcion1' label='Descripción' type='text' required />
                <FormField name='nombre' label='Nombre' type='text' required />
                <FormField name='porcentaje' label='Porcentaje' type='number' required />
                <FormField name='referencia' label='Referencia' type='text' required />
                <FormField name='unidades' label='Unidades' type='number' required />
            </>
        );
    } else {
        return (
            <>
                <FormField name='costo' label='Costo' type='number' required />
                <FormField name='descripcion1' label='Descripción' type='text' required />
                <FormField name='nombre' label='Nombre' type='text' required />
                <FormField name='porcentaje' label='Porcentaje' type='number' required />
                <FormField name='stock' label='Stock' type='number' required />
            </>
        );
    }
};

export default FormFieldsByCategory;