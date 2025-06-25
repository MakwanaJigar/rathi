import React from 'react'
import { Link } from 'react-router-dom'

const AddUser = () => {
    return (
        <>
            <div className="container-fluid">
                    {/* <!-- Main Content --> */}
                    <div className="container main-content">
                        <div className="delivery-challan-top-title-container">
                            <h3 className="main-container-title">User</h3>
                            <div className="export-addnew-btn0-container">
                                {/* <a href="">
                  <i className="fa-solid fa-download"></i> Export Now
                </a> */}
                                <Link to="/add-user">
                                    <i className="fa-solid fa-right-arrow"></i> Go Back
                                </Link>
                            </div>
                        </div>

                        {/* MAIN TABLE DATA */}
                        <div className="container challan-add-main-right-container py-5">
                            <div className="form-section client-info-container client-info-container">
                                <h3 className=''>Delivery Challan</h3>
                                <form action="" className='py-3'>
                                    <div className="row">
                                        <div className="col-md-6 ">
                                            <div className="party-name">
                                                <label> Party Name</label>
                                                <input type="text" placeholder='Enter Your Party Name' />
                                            </div>
                                            <div className="party-name">
                                                <label> Bill To Address</label>
                                                <input type="text" placeholder='Enter Your Bill To Address' />
                                            </div>
                                            <div className="party-name">
                                                <label> GST No</label>
                                                <input type="text" placeholder='Enter Your GST No' />
                                            </div>
                                            <div className="party-name">
                                                <label>Ship To Party Name</label>
                                                <input type="text" placeholder='Enter Your Ship To Party Name' />
                                            </div>
                                            <div className="party-name">
                                                <label>Ship To Address</label>
                                                <input type="text" placeholder='Enter Your Ship To Address' />
                                            </div>
                                            <div className="party-name">
                                                <label> Payment Terms</label>
                                                <input type="text" placeholder='Enter Your Payment Terms' />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="party-name">
                                                <label> D.O. Date</label>
                                                <input type="date" placeholder='Enter Your D.O. No' />
                                            </div>
                                            <div className="party-name">
                                                <label> D.O. No</label>
                                                <input type="text" placeholder='Enter Your D.O. No' />
                                            </div>
                                            <div className="party-name">
                                                <label> Sales Rep.</label>
                                                <input type="text" placeholder='Enter Your Sales Representative' />
                                            </div>
                                            <div className="party-name">
                                                <label>Party P.O. No</label>
                                                <input type="text" placeholder='Enter Your P.O. No' />
                                            </div>
                                            <div className="party-name">
                                                <label>Party P.O. No Date</label>
                                                <input type="date" placeholder='Enter Your Ship To Address' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="form-section client-info-container client-info-container">
                                <h3 className=''>Item Information</h3>
                                <div className="row text-muted mb-2 item-info-labels-container">
                                    <div className="col-1">No.</div>
                                    <div className="col-1">Item</div>
                                    <div className="col-1">Make</div>
                                    <div className="col-1">Pcs.</div>
                                    <div className="col-1">Quantity(MT)</div>
                                    <div className="col-1">Rates/MT</div>
                                    <div className="col-1">Loading</div>
                                    <div className="col-1">Effective Rate</div>
                                    <div className="col-1">Warehouse</div>
                                    <div className="col-1">Status</div>
                                    <div className="col-1">Actions</div>
                                </div>

                                <div className="row align-items-center mb-2 item-info-labels-container">
                                    <div className="col-1">01.</div>

                                    <div className="col-1">
                                        <input type="text" className="form-control" placeholder="Item" />
                                    </div>

                                    <div className="col-1">
                                        <select className="form-select">
                                            <option>Make</option>
                                        </select>
                                    </div>

                                    <div className="col-1">
                                        <input type="text" className="form-control" placeholder="Paces" />
                                    </div>

                                    <div className="col-1">
                                        <input type="text" className="form-control" placeholder="Quality" />
                                        {/* <p>Total:</p> */}
                                    </div>

                                    <div className="col-1">
                                        <input type="text" className="form-control" placeholder="Rates" />
                                    </div>

                                    <div className="col-1">
                                        <input type="number" className="form-control" />
                                    </div>

                                    <div className="col-1">
                                        <input type="text" className="form-control" placeholder="Effective Rate" disabled />
                                    </div>

                                    <div className="col-1">
                                        <select className="form-select">
                                            <option>Warehouse</option>
                                        </select>
                                    </div>

                                    <div className="col-1">
                                        <select className="form-select">
                                            <option>Status</option>
                                        </select>
                                    </div>

                                    <div className="col-1 d-flex gap-1">
                                        <button className="btn btn-success"><i className="fa fa-plus"></i></button>
                                        <button className="btn btn-success"><i className="fa fa-trash"></i></button>
                                    </div>
                                </div>

                                {/* <div className="text-end fw-bold text-muted mt-2">
                                    Total:
                                </div> */}
                            </div>

                            <div className="form-section client-info-container client-info-container">
                                <h3 className=''>Notes</h3>
                                <form action="" className='py-3'>
                                    <div className="row">
                                        <div className="col-md-12 ">
                                            <div className="party-name">
                                                <label> Order Notes</label>
                                                <textarea type="text" placeholder='Enter Your Order Note' />
                                            </div>
                                            <div className="party-name">
                                                <label> Warehouse/Delivery Notes</label>
                                                <textarea type="text" placeholder='Enter Warehouse/Delivery Notes' />
                                            </div>
                                            <div className="party-name">
                                                <label> Transport Notes</label>
                                                <textarea type="text" placeholder='Enter Your Transport Notes' />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className="form-section client-info-container client-info-container">
                                {/* <h3 className=''>Notes</h3> */}
                                <div className="row mb-3 align-items-center">
                                    <div className="col-sm-2 fw-semibold">Freight</div>
                                    <div className="col-sm">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="freight" id="freightToPay" />
                                            <label className="form-check-label" for="freightToPay">To Pay</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="freight" id="freightInclusive" />
                                            <label className="form-check-label" for="freightInclusive">Inclusive</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="freight" id="freightFix" />
                                            <label className="form-check-label" for="freightFix">Fix</label>
                                            <input type="text" className="form-control d-inline-block ms-2" style={{ width: '100px' }} placeholder="" />
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="freight" id="freightPerTon" />
                                            <label className="form-check-label" for="freightPerTon">Per TON</label>
                                            <input type="text" className="form-control d-inline-block ms-2" style={{ width: '100px' }} placeholder="" />
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Courier Options --> */}
                                <div className="row mb-3 align-items-center border-top pt-3">
                                    <div className="col-sm-2 fw-semibold">Courier Options</div>
                                    <div className="col-sm">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="courier" id="courierNR" />
                                            <label className="form-check-label" for="courierNR">N / R</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="courier" id="courierInvoice" />
                                            <label className="form-check-label" for="courierInvoice">Invoice Only</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="courier" id="courierTCINV" />
                                            <label className="form-check-label" for="courierTCINV">TC+INV</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="courier" id="courierAll" />
                                            <label className="form-check-label" for="courierAll">TC+INV+LR</label>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- MTC --> */}
                                <div className="row mb-3 align-items-center border-top pt-3">
                                    <div className="col-sm-2 fw-semibold">MTC</div>
                                    <div className="col-sm">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="mtc" id="mtcNR" />
                                            <label className="form-check-label" for="mtcNR">N / R</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="mtc" id="mtcMatchTC" />
                                            <label className="form-check-label" for="mtcMatchTC">Only Matching TC</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="mtc" id="mtcEndorsement" />
                                            <label className="form-check-label" for="mtcEndorsement">With Endorsement</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
        </>
    )
}

export default AddUser
