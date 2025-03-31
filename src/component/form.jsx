import React, { useState } from 'react';
import { useTheme } from '../context/themeContext';
import DatePicker from 'react-datepicker';
import { MdCalendarToday } from 'react-icons/md';
import { Autocomplete } from '@mui/material';
import close from '../assets/close.png';

function Form({ onSubmit, fields, empData = [], validateForm, title, initialData = {} }) {

    const { theme, setOpen } = useTheme();

    // Initialize form data with initial values
    const [formData, setFormData] = useState(() => {
        const initialFormData = {};
        fields.forEach(field => {
            initialFormData[field.name] = initialData[field.name] || field.defaultValue || '';
        });
        return initialFormData;
    });

    const clearInput = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, deadline: date ? date.toISOString().split('T')[0] : '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (validateForm) {
            if (validateForm(formData)) {
                onSubmit(e, formData); // Call the parent function with form data
                setFormData(initialData); // Reset form data after submission
            }
        } else {
            onSubmit(e, formData);
            setFormData(initialData); // Reset form data after submission
        }
    };


    return (
        <>
            <div className={`h-screen w-screen edit-form ${theme === 'light' ? 'bg-white/80' : 'bg-black/80'}`}>
                <div className='formBg'>
                    <form className='form-div gap-5' onSubmit={handleSubmit}>
                        <button className='formClose' onClick={clearInput}>
                            <img src={close} alt="404" className='w-6' />
                        </button>
                        
                        <p className='form-title'>{title}</p>

                        <div className="grid grid-cols-2 gap-x-3">
                            {fields.map((field, index) => (
                                <div key={index} className="flex">
                                    {field.type === 'text' && (
                                        <input
                                            type="text"
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="task-input"
                                            placeholder={field.placeholder}
                                            required
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-x-3">
                            {fields.map((field, index) => (
                                <div key={index} className="flex">


                                    {field.type === 'select' && (
                                        <select
                                            className="task-input"
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>{field.placeholder}</option>
                                            {field.options.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-x-3">
                            {fields.map((field, index) => (
                                <div key={index} className="flex">
                                    {field.type === 'date' && (
                                        <div className='relative'>
                                            <DatePicker
                                                selected={formData.deadline ? new Date(formData.deadline) : null}
                                                onChange={handleDateChange}
                                                dateFormat="yyyy-MM-dd"
                                                placeholderText="Select a date"
                                                className="placeholder:pl-6 task-input"
                                                minDate={new Date()}
                                                isClearable
                                                required
                                            />
                                            {!formData.deadline && (
                                                <MdCalendarToday className="datePicker-icon" />
                                            )}
                                        </div>
                                    )}

                                    {field.type === 'autocomplete' && (
                                        <Autocomplete
                                            options={empData} // Keep full employee objects
                                            getOptionLabel={(option) => option?.emp_name || ""} // Ensure string value
                                            value={empData.find(emp => emp.emp_name === formData.assign) || null} // Ensure correct value
                                            onChange={(event, newValue) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    assign: newValue ? newValue.emp_name : "" // Ensure correct property update
                                                }));
                                            }}
                                            renderInput={(params) => (
                                                <div ref={params.InputProps.ref} className="task-input">
                                                    <input
                                                        {...params.inputProps}
                                                        placeholder="Select an Employee"
                                                        className="autocomplete-input w-full"
                                                        required
                                                    />
                                                </div>
                                            )}
                                        />
                                    )}

                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1">
                            {fields.map((field, index) => (
                                <div key={index} className="flex">

                                    {field.type === 'textarea' && (
                                        <textarea
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleChange}
                                            className="task-input"
                                            rows={4}
                                            placeholder={field.placeholder}
                                            required
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-5">
                            <button type="submit" className='button'>Update Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Form;
