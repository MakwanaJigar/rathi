import React from 'react'

const Logistics = () => {
    return (
        <>
            <div className="container-fluid">
                <div class=" main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Report <i class="fa-solid fa-angles-right"></i> Logistics</p>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h3 class="fw-bold">Logistics</h3>
                        <button class="btn btn-export">
                            <i class="fa fa-download me-2"></i>Export Now
                        </button>
                    </div>

                    <div class="d-flex align-items-center mb-4 flex-wrap gap-3">
                        <div class="tab-title active">Pending (0)</div>
                        <div class="tab-title">Hide (0)</div>
                        <input type="date" class="form-control filter-input" placeholder="From Date" />
                        <input type="date" class="form-control filter-input" placeholder="To Date" />
                        <button class="btn btn-filter">Filter</button>
                    </div>

                    <div class="table-container client-info-container">
                        <table class="table table-borderless logistics-table">
                            <thead>
                                <tr class="border-bottom">
                                    <th>Loading Date</th>
                                    <th>Vehicle Number</th>
                                    <th>Quantity</th>
                                    <th>Transporter Name</th>
                                    <th>Rate</th>
                                    <th>Approved By</th>
                                    <th>Transporter Note</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-bottom">
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum is simply</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum is simply</td>
                                    <td>
                                        <button class="btn btn-hide">Hide</button>
                                    </td>
                                </tr>
                                <tr class="border-bottom">
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum is simply</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum is simply</td>
                                    <td>
                                        <button class="btn btn-hide">Hide</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum is simply</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>Lorem Ipsum is simply</td>
                                    <td>
                                        <button class="btn btn-hide">Hide</button>
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

export default Logistics
