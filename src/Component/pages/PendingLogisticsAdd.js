import { Link } from 'react-router-dom'
import React from 'react'

const PendingLogisticsAdd = () => {
    return (
        <>
            <div className="container-fluid">
                <div className=" main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Report <i class="fa-solid fa-angles-right"></i> Pending Logistics Edit</p>
                    <div className="delivery-challan-top-title-container container">
                        <h3 className="main-container-title">Pending Logistics</h3>
                        <div className="export-addnew-btn0-container">
                            <Link to="/user">Go Back</Link>
                        </div>
                    </div>

                    {/* MAIN DATA */}
                    <div className=" challan-add-main-right-container py-5">
                        <div className="form-section client-info-container">
                            <h3>Pending Logistics</h3>
                            <form className="py-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="party-name mb-3">
                                            <label>Do No</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Name" />
                                        </div>
                                        <div className="party-name mb-3">
                                            <label>Party Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Party Name" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>PO QTY</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                         <div className="party-name mb-3">
                                            <label>From</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                         <div className="party-name mb-3">
                                            <label>To</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                           <div className="party-name mb-3">
                                            <label>Approved By</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>Transporter Name</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>Rate</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>Booked QYT</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mt-4">
                                    <button type="submit" className="btn btn-submit px-4">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingLogisticsAdd
