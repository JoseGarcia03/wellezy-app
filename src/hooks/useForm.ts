import {ChangeEvent, useState} from "react";

type FormValues = {
    [key: string]: any;
}

const useForm =<T extends FormValues> (initialValues: T) => {
    const [ values, setValues ] = useState<T>(initialValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const resetForm = () => setValues(initialValues);

    return {
        values,
        handleChange,
        resetForm
    }
}
export default useForm;