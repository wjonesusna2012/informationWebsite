import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface RHFTextFieldProps {
    name: string,
    label: string,
}

const RHFTextField = ({
    name,
    label,
}: RHFTextFieldProps) => {
    const methods = useFormContext();
    return (
        <Controller
            name={name}
            control={methods.control}
            render={({
                field,
                fieldState,
            }) => {
                return (
                    <TextField 
                        name={name}
                        label={label}
                    />
                )
            }}
        />
    )
}

export default RHFTextField;