import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { DatePickerProps, DatePicker } from '@mui/x-date-pickers';

interface RHFDatePickerProps {
    label: string
    name: string
    // datePickerSpecificProps: Partial<DatePickerProps>,
}
const RHFDatePicker = ({ label, name }: RHFDatePickerProps) => {

    const methods = useFormContext();
    return (
        <Controller
            name={name}
            control={methods.control}
            render={({
                        field: { onChange, onBlur, value, ref: fieldRef },
                        fieldState: { error }
                    }) => (
                <DatePicker
                    label={label}
                    value={value}
                    onChange={onChange}
                    inputRef={fieldRef}
                    renderInput={
                        params => 
                            (<TextField {...params} />)
                    }
                />
            )}
        />
    )
}

export default RHFDatePicker;