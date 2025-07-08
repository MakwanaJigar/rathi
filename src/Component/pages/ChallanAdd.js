import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ChallanAdd = () => {
    const [selectedFreight, setSelectedFreight] = useState('');
    const [fixValue, setFixValue] = useState('');
    const [perTonValue, setPerTonValue] = useState('');

    const handleFreightChange = (e) => {
        setSelectedFreight(e.target.value);
    };
    return (
        <>
            <div className="container-fluid">
                <div className=" main-content">
                    <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Delivery Challan <i class="fa-solid fa-angles-right"></i> Edit</p>
                    <div className="delivery-challan-top-title-container ">
                        <h3 className='main-container-title'>Delivery Challan</h3>
                        <div className="export-addnew-btn0-container">
                            {/* <a href=""><i className="fa-solid fa-download"></i> Export Now</a> */}
                            <Link to="/delivery-challan">Go Back</Link>
                        </div>
                    </div>


                    {/* MAIN DATA */}
                    <div className="challan-add-main-right-container py-5">
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

                        <div className="form-section client-info-container">
                            <h3 className="mb-3">Item Information</h3>

                            {/* Column Labels */}
                            <div className="row text-muted fw-bold mb-2 border-bottom pb-2 text-center small">
                                <div className="col-1">No.</div>
                                <div className="col-1">Item</div>
                                <div className="col-1">Make</div>
                                <div className="col-1">Pcs</div>
                                <div className="col-1 text-nowrap">Qty (MT)</div>
                                <div className="col-1 text-nowrap">Rate / MT</div>
                                <div className="col-1">Loading</div>
                                <div className="col-1 text-nowrap">Eff. Rate</div>
                                <div className="col-1">Warehouse</div>
                                <div className="col-1">Status</div>
                                <div className="col-1">Actions</div>
                            </div>

                            {/* Row 1 */}
                            <div className="row align-items-center mb-3 text-center">
                                <div className="col-1 fw-semibold">01.</div>

                                <div className="col-1">
                                    <input type="text" className="form-control form-control-sm" placeholder="Item" />
                                </div>

                                <div className="col-1">
                                    <select className="form-select form-select-sm">
                                        <option>Make</option>
                                    </select>
                                </div>

                                <div className="col-1">
                                    <input type="text" className="form-control form-control-sm" placeholder="Pcs" />
                                </div>

                                <div className="col-1">
                                    <input type="text" className="form-control form-control-sm" placeholder="Qty" />
                                </div>

                                <div className="col-1">
                                    <input type="text" className="form-control form-control-sm" placeholder="Rate" />
                                </div>

                                <div className="col-1">
                                    <input type="number" className="form-control form-control-sm" placeholder="Loading" />
                                </div>

                                <div className="col-1">
                                    <input type="text" className="form-control form-control-sm" placeholder="Eff. Rate" disabled />
                                </div>

                                <div className="col-1">
                                    <select className="form-select form-select-sm">
                                        <option>Warehouse</option>
                                    </select>
                                </div>

                                <div className="col-1">
                                    <select className="form-select form-select-sm">
                                        <option>Status</option>
                                    </select>
                                </div>

                                <div className="col-1 d-flex justify-content-center gap-1">
                                    <button className="btn btn-sm item-info-btns">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                    <button className="btn btn-sm item-info-btns">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
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
                                <div className="col-sm freight-main-container">
                                    {/* To Pay */}
                                    <div className="freight-option">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="freight"
                                            id="freightToPay"
                                            value="toPay"
                                            onChange={handleFreightChange}
                                        />
                                        <label className="form-check-label ms-1" htmlFor="freightToPay">To Pay</label>
                                    </div>

                                    {/* Inclusive */}
                                    <div className="freight-option">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="freight"
                                            id="freightInclusive"
                                            value="inclusive"
                                            onChange={handleFreightChange}
                                        />
                                        <label className="form-check-label ms-1" htmlFor="freightInclusive">Inclusive</label>
                                    </div>

                                    {/* Fix */}
                                    <div className="freight-option">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="freight"
                                            id="freightFix"
                                            value="fix"
                                            onChange={handleFreightChange}
                                        />
                                        <label className="form-check-label ms-1" htmlFor="freightFix">Fix</label>
                                        {selectedFreight === 'fix' && (
                                            <input
                                                type="text"
                                                value={fixValue}
                                                onChange={(e) => setFixValue(e.target.value)}
                                                className="form-control ms-2"
                                                style={{ width: '100px' }}
                                                placeholder="Fix Value"
                                            />
                                        )}
                                    </div>

                                    {/* Per TON */}
                                    <div className="freight-option">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="freight"
                                            id="freightPerTon"
                                            value="perTon"
                                            onChange={handleFreightChange}
                                        />
                                        <label className="form-check-label ms-1" htmlFor="freightPerTon">Per TON</label>
                                        {selectedFreight === 'perTon' && (
                                            <input
                                                type="text"
                                                value={perTonValue}
                                                onChange={(e) => setPerTonValue(e.target.value)}
                                                className="form-control ms-2"
                                                style={{ width: '100px' }}
                                                placeholder="Per Ton Value"
                                            />
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* <!-- Courier Options --> */}
                            <div className="row mb-3 align-items-center border-top pt-3">
                                <div className="col-sm-2 fw-semibold">Courier Options</div>
                                <div className="col-sm freight-main-container">
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierNR" />
                                        <label className="form-check-label" for="courierNR">N / R</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierInvoice" />
                                        <label className="form-check-label" for="courierInvoice">Invoice Only</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierTCINV" />
                                        <label className="form-check-label" for="courierTCINV">TC+INV</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierAll" />
                                        <label className="form-check-label" for="courierAll">TC+INV+LR</label>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- MTC --> */}
                            <div className="row mb-3 align-items-center border-top pt-3">
                                <div className="col-sm-2 fw-semibold">MTC</div>
                                <div className="col-sm freight-main-container">
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="mtc" id="mtcNR" />
                                        <label className="form-check-label" for="mtcNR">N / R</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="mtc" id="mtcMatchTC" />
                                        <label className="form-check-label" for="mtcMatchTC">Only Matching TC</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
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

export default ChallanAdd
