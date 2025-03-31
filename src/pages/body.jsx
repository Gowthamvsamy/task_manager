// import files
import React, { useState } from 'react'
import Search from '../component/search'
import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from '../context/themeContext';
import TaskList from '../component/taskList';
import { ToastContainer } from 'react-toastify';
import logo from '../assets/logo.png'
import 'react-datepicker/dist/react-datepicker.css';
import Filter from '../component/filter';
import EmpFilter from '../component/empFilter';
import AddForm from '../component/addForm';
import AddEmployee from '../component/addEmployee';

function Body() {

    // State
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [empLabels, setEmpLabels] = useState([]);
    const [empForm, setEmpForm] = useState(false)

    // use context
    const { theme, toggleTheme, open, setOpen } = useTheme();


    // Open Add Task form
    const openForm = () => {
        setOpen(true);
    }

    const openEmp = () => {
        setEmpForm(true);
    }

    return (
        <>
            {/* Body */}
            <div className={`h-screen relative ${theme === 'light' ? 'body-light' : 'body-dark'}`}>
                <ToastContainer />
                <div className='navbar'>
                    <div className='navContent'>
                        <img src={logo} alt="404" className='w-10' />
                        <p className={`heading ${theme === 'light' ? 'text-black' : 'text-white'}`}>Task Manager</p>
                    </div>

                    <div className='navContent'>
                        <div className='my-6 flex gap-3'>
                            <Search setSearchValue={setSearchValue} />
                        </div>
                        <div>
                            <Filter setFilterValue={setFilterValue} />
                        </div>
                        <div>
                            <EmpFilter setEmpLabels={setEmpLabels} />
                        </div>
                        <div>
                            <button onClick={openEmp} className='theme-box text-gray-500 py-[7px] border'>
                                Add Employee
                            </button>
                        </div>
                        <button onClick={toggleTheme} className={`theme-box ${theme === 'light' ? 'bg-transparent' : 'bg-gray-50/20'} group`}>
                            {theme === 'light' ? <GoSun /> : <GoMoon className='moon' />}
                        </button>
                    </div>
                </div>

                <div className='px-10'>
                    <TaskList searchValue={searchValue} filterValue={filterValue} empLabels={empLabels} />
                </div>
                <div className='relative group'>
                    <div className='extenal-addTask' onClick={openForm}>+</div>
                    <span className="newTask">
                        Add a new task
                    </span>
                </div>
            </div>

            {open ? (
                <AddForm />
            ) : null}
            {empForm ? (
                <AddEmployee />
            ) : null}
        </>
    )
}

export default Body