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
    

    // use context
    const { theme, toggleTheme, open, setOpen, empForm, setEmpForm } = useTheme();


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
            <div className={`main ${theme === 'light' ? 'body-light' : 'body-dark'}`}>
                <ToastContainer />
                <div className='navbar'>
                    <div className='navContent'>
                        <img src={logo} alt="404" width={40} />
                        <p className={`heading ${theme === 'light' ? 'light' : 'dark'}`}>Task Manager</p>
                    </div>

                    <div className='navContent'>
                        <div className='nav-list'>
                            <Search setSearchValue={setSearchValue} />
                        </div>
                        <div>
                            <Filter setFilterValue={setFilterValue} />
                        </div>
                        <div>
                            <EmpFilter setEmpLabels={setEmpLabels} />
                        </div>
                        <div>
                            <button onClick={openEmp} className={`theme-box add-emp ${theme === 'light' ? 'light' : 'dark'}`}>
                                Add Employee
                            </button>
                        </div>
                        <button onClick={toggleTheme} className="theme-box bg-gray-50/20 group">
                            {theme === 'light' ? <GoSun /> : <GoMoon className='moon' />}
                        </button>
                    </div>
                </div>

                <div>
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