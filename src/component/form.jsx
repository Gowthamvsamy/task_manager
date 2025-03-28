import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/themeContext';
import DatePicker from 'react-datepicker';
import { MdCalendarToday } from 'react-icons/md';
import { Autocomplete } from '@mui/material';
import close from '../assets/close.png';

function Form({ onSubmit, cleanUp, fields, empData = [], validateForm, errors, initialData = {} }) {

    const { theme, setOpen } = useTheme();

    // Initialize form data with initial values
    const [formData, setFormData] = useState(() => {
        const initialFormData = {};
        fields.forEach(field => {
            initialFormData[field.name] = initialData[field.name] || '';
        });
        return initialFormData;
    });

    useEffect(() => {
        setFormData(initialData);  // Set initial data when component mounts or data changes
    }, [initialData]);

    const clearInput = () => {
        cleanUp(formData);
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, deadline: date ? date.toISOString().split('T')[0] : '' });
    };

    const handleAutoCompleteChange = (_, newValue) => {
        setFormData({ ...formData, assign: newValue ? newValue.label : '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm) {
            if (validateForm(formData)) {
                onSubmit(e, formData);
            }
        } else {
            onSubmit(e, formData);
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
                        <p className='form-title'>Edit Task Form</p>

                        <div className="grid grid-cols-2 gap-5">
                            {fields.map((field, index) => (
                                <div key={index} className="flex flex-col gap-3">
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
                                            options={empData.map((emp) => ({
                                                label: emp.emp_name
                                            }))}
                                            getOptionLabel={(option) => option.label}
                                            value={empData.find(emp => emp.emp_name === formData.assign) || null}
                                            onChange={handleAutoCompleteChange}
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

                                    {field.type === 'select' && (
                                        <select
                                            className="task-input text-gray-400"
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
