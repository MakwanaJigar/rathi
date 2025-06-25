import { Link } from 'react-router-dom'
import React from 'react'

const DirectParty = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="container main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Report <i class="fa-solid fa-angles-right"></i> Direct Party</p>
                    <div className="delivery-challan-top-title-container container">
                        <h3 className="main-container-title">Direct Party</h3>
                        <div className="export-addnew-btn0-container">
                            <Link to="/user">Go Back</Link>
                        </div>
                    </div>

                    {/* MAIN DATA */}
                    <div className="container challan-add-main-right-container py-5">
                        <div className="form-section client-info-container">
                            <h3>Direct Party</h3>
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
                                            <label>Item</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>MAke</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>QTY</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>PCS</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>Dispatch G.</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>Booked QTY</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>Broker</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>

                                        <div className="party-name mb-3">
                                            <label>P.Done By</label>
                                            <input type="text" className="form-control" placeholder="Enter Your Access Control" />
                                        </div>
                                        <div className="party-name mb-3">
                                            <label>Status</label>
                                            <div class=" direct-party-dropdown">
                                                <select class="form-select " id="exampleSelect">
                                                    <option selected disabled>
                                                        Status
                                                    </option>
                                                    <option value="1">Pending</option>
                                                    <option value="2">Planing Given</option>
                                                    <option value="3">Ready For Dispatch</option>
                                                </select>
                                            </div>
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

export default DirectParty
