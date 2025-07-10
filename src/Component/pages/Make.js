import React, { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

const Make = () => {
    const navigation = useNavigation()
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Async function to fetch data
    const fetchUsers = async () => {
        try {
            const response = await fetch('https://replete-software.com/projects/rathi/api/make-list');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // useEffect to run fetch on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="container-fluid">

                {/* <!-- Main Content --> */}
                <div className=" main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Master <i class="fa-solid fa-angles-right"></i> Make</p>
                    {/* MAIN DATA */}
                    <div className=" challan-add-main-right-container">
                        <div className="make-search-and-btn-container">
                            <div className="make-list-search">
                                <input type="search" placeholder="Search" />
                            </div>
                            <div className="make-list-btns">
                                <button>Import</button>
                                <button>Export</button>
                                <button onClick={navigation.navigate('make-add')}>Add</button>
                            </div>
                        </div>
                        <div className=" mt-3">
                            <table className="table align-middle table-bordered">
                                <thead className="table-light ">
                                    <tr>
                                        <th className="fw-300">Name</th>
                                        <th className="fw-300">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item, index) => (
                                        <tr key={index}>
                                            <td className="w-75">{item.name}</td>
                                            <td className="text-center action-btns w-25">
                                                <button className="btn btn-sm me-1">
                                                    <i className="fas fa-pen"></i>
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Make;
