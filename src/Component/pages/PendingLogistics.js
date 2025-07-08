import React from 'react'
import { Link } from 'react-router-dom'

const PendingLogistics = () => {
    return (
        <>
            <div className="container-fluid">
                <div class=" main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Report <i class="fa-solid fa-angles-right"></i> Pending Logistics</p>
                    <div class="d-flex justify-content-between align-items-center mb-4 ">
                        <h3 class="fw-bold">Pending Logistics</h3>
                    </div>

                    <div class="table-container ">
                        <table class="table table-borderless logistics-table">
                            <thead>
                                <tr class="border-bottom">
                                    <th>Do No</th>
                                    <th>Party Name</th>
                                    <th>PO QTY</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Approved By</th>
                                    <th>Transporter Name</th>
                                    <th>Rate</th>
                                    <th>Booked QTY</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>
                                        <Link class="btn btn-hide" to='/pending-logistics-add'><i class="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum </td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum</td>
                                    <td>
                                        <Link class="btn btn-hide" to='/pending-logistics-add'><i class="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingLogistics
