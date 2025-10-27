import { Controller, useFormContext } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';

interface RHFTextFieldProps {
    name: string,
    label: string,
    textFieldSpecificProps?: Partial<TextFieldProps>,
}

const RHFTextField = ({
    name,
    label,
    textFieldSpecificProps = {},
}: RHFTextFieldProps) => {
    const methods = useFormContext();
    return (
        <Controller
            name={name}
            control={methods.control}
            render={({
                field: { value, onChange, ref },
                fieldState: { error },
            }) => {
                return (
                    <TextField 
                        id={name}
                        name={name}
                        label={label}
                        value={value}
                        type="text"
                        variant='outlined'
                        fullWidth
                        onChange={onChange}
                        helperText={error ? error.message : null}
                        error={!!error}
                        disabled={false}
                        inputRef={ref}
                        {
                            ...textFieldSpecificProps
                        }
                    />
                )
            }}
        />
    )
}

export default RHFTextField;