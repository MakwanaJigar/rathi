import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { submitChallanForm } from '../../redux/action';
import { fetchClients } from "../../redux/actions/clientActions";
import { fetchSalesReps } from '../../redux/actions/representativeActions'



const ChallanAdd = () => {

    const navigation = useNavigate()
    const dispatch = useDispatch();

    const clients = useSelector((state) => state.client.clients);
    // console.log(clients);

    const representatives = useSelector((state) => state.salesRep.representatives);

    useEffect(() => {
        dispatch(fetchSalesReps());
    }, [dispatch]);

    console.log(representatives);



    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const [shipToAddressList, setShipToAddressList] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');


    const [selectedFreight, setSelectedFreight] = useState('');
    const [fixValue, setFixValue] = useState('');
    const [perTonValue, setPerTonValue] = useState('');


    // .....INPUT FIELDS STATES.....
    const [partyName, setPartyName] = useState('');
    const [billToAddress, setBillToAddress] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [shipToPartyName, setShipToPartyName] = useState('');
    const [shipToAddress, setShipToAddress] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');
    const [dODate, setDoDate] = useState('');
    const [dONumber, setDoNumber] = useState('');
    const [salesRep, setSalesRep] = useState('');
    const [partyPoNumber, setPartyPoNumber] = useState('');
    const [partyPoDate, setPartyPoDate] = useState('');
    const [orderNote, setOrderNote] = useState('');
    const [deliveryNote, setDeliveryNote] = useState('');
    const [transportNote, setTransportNote] = useState('');
    const [freightInput, setfreightInput] = useState('');
    const [courierOptionsInput, setCourierOptionsInput] = useState('');
    const [mTCInput, setMTCInput] = useState('');
    const [isChecked, setIsChecked] = useState(false);


    const handleFreightChange = (e) => {
        setSelectedFreight(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            partyName,
            billToAddress,
            gstNo,
            shipToPartyName,
            shipToAddress,
            paymentTerms,
            //   freightType: selectedFreight,
            dODate,
            dONumber,
            salesRep,
            partyPoNumber,
            partyPoDate,
            orderNote,
            deliveryNote,
            transportNote,
            freightInput,
            courierOptionsInput,
            mTCInput,
        };

        dispatch(submitChallanForm(payload));
        alert('Form submitted via Redux!');
        navigation('/delivery-challan');
    };

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);


    // ...FILL AUTOMETICALLY ADDRESS

    // const handlePartyChange = (e) => {
    //     const selectedId = e.target.value;
    //     const client = clients.find(c => c.id === parseInt(selectedId));

    //     if (client) {
    //         setPartyName(client.company_name || '');
    //         setGstNo(client.gst_no || '');

    //         // Build full address string
    //         const billing = client.billing_address || {};
    //         const billToFullAddress = [
    //             billing.address_line1,
    //             billing.address_line2,
    //             billing.city,
    //             billing.state,
    //             billing.postal_code,
    //             billing.country
    //         ].filter(Boolean).join(', '); // Remove empty values and join with comma

    //         setBillToAddress(billToFullAddress);

    //         setShipToPartyName(client.company_name || '');

    //         const shipping = Array.isArray(client.shipping_addresses) ? client.shipping_addresses[0] : client.shipping_addresses || {};
    //         const shipToFullAddress = [
    //             shipping.address_line1,
    //             shipping.address_line2,
    //             shipping.city,
    //             shipping.state,
    //             shipping.postal_code,
    //             shipping.country
    //         ].filter(Boolean).join(', ');

    //         setShipToAddress(shipToFullAddress);
    //     } else {
    //         // Reset fields
    //         setPartyName('');
    //         setGstNo('');
    //         setBillToAddress('');
    //         setShipToPartyName('');
    //         setShipToAddress('');
    //     }
    // };


    const handlePartyChange = (e) => {
        const selectedId = e.target.value;
        setSelectedClientId(selectedId); // <-- Keep this line

        const client = clients.find(c => c.id === parseInt(selectedId));

        if (client) {
            setPartyName(client.company_name || '');
            setGstNo(client.gst_no || '');

            // Bill To
            const billing = client.billing_address || {};
            const billToFullAddress = [
                billing.address_line1,
                billing.address_line2,
                billing.city,
                billing.state,
                billing.postal_code,
                billing.country
            ].filter(Boolean).join(', ');
            setBillToAddress(billToFullAddress);

            // Ship To
            setShipToPartyName(client.company_name || '');

            const shippingAddresses = Array.isArray(client.shipping_addresses) ? client.shipping_addresses : [];
            setShipToAddressList(shippingAddresses);

            if (shippingAddresses.length > 0) {
                const firstAddress = shippingAddresses[0];
                const fullShipTo = [
                    firstAddress.address_line1,
                    firstAddress.address_line2,
                    firstAddress.city,
                    firstAddress.state,
                    firstAddress.postal_code,
                    firstAddress.country
                ].filter(Boolean).join(', ');
                setShipToAddress(fullShipTo);
            } else {
                setShipToAddress('');
            }
        } else {
            setPartyName('');
            setGstNo('');
            setBillToAddress('');
            setShipToPartyName('');
            setShipToAddressList([]);
            setShipToAddress('');
        }
    };


    return (
        <>
            <div className="container-fluid">
                <div className=" main-content">
                    <p className='main-container-title'>Dashboard <i className="fa-solid fa-angles-right"></i> Delivery Challan <i className="fa-solid fa-angles-right"></i> Edit</p>
                    <div className="delivery-challan-top-title-container ">
                        <h3 className='main-container-title'>Delivery Challan</h3>
                        <div className="export-addnew-btn0-container">
                            {/* <a href=""><i className="fa-solid fa-download"></i> Export Now</a> */}
                            <Link to="/delivery-challan">Go Back</Link>
                        </div>
                    </div>


                    {/* MAIN DATA */}
                    <form className="challan-add-main-right-container py-5" onSubmit={handleSubmit}>
                        <div className="form-section client-info-container client-info-container">
                            <h3 className=''>Delivery Challan</h3>
                            <div className='py-3'>
                                <div className="row">
                                    <div className="col-md-6 ">
                                        {/* <div className="party-name">
                                            <label> Party Name</label>
                                            <input type="text" placeholder='Enter Your Party Name' value={partyName} onChange={(e) => setPartyName(e.target.value)} />
                                        </div> */}
                                        <div className="party-name">
                                            <label>Party Name</label>
                                            <select className='delivery-challan-dropdown-field' value={partyName} onChange={handlePartyChange}>
                                                <option value="Select Party Name">{partyName ? partyName : 'Select Party Name'}</option>
                                                {clients.map((client) => (
                                                    <option key={client.id} value={client.id}>
                                                        {client.company_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="party-name">
                                            <label> Bill To Address</label>
                                            <input type="text" placeholder='Enter Your Bill To Address' value={billToAddress} onChange={(e) => setBillToAddress(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label> GST No</label>
                                            <input type="text" placeholder='Enter Your GST No' value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label>Ship To Party Name</label>
                                            <input type="text" placeholder='Enter Your Ship To Party Name' value={shipToPartyName} onChange={(e) => setShipToPartyName(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label>Ship To Address</label>
                                            <select
                                                className='delivery-challan-dropdown-field'
                                                value={shipToAddress}
                                                onChange={(e) => setShipToAddress(e.target.value)}
                                            >
                                                {shipToAddressList.length === 0 && (
                                                    <option value="">No shipping addresses</option>
                                                )}
                                                {shipToAddressList.map((address, index) => {
                                                    const fullAddress = [
                                                        address.address_line1,
                                                        address.address_line2,
                                                        address.city,
                                                        address.state,
                                                        address.postal_code,
                                                        address.country
                                                    ]
                                                        .filter(Boolean)
                                                        .join(', ');
                                                    return (
                                                        <option key={index} value={fullAddress}>
                                                            {fullAddress}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        {/* <div className="party-name">
                                            <label>Ship To Address</label>
                                            <input type="text" placeholder='Enter Your Ship To Address' value={shipToAddress} onChange={(e) => setShipToAddress(e.target.value)} />
                                        </div> */}

                                        <div className="party-name">
                                            <label>Payment Terms</label>
                                            <div className="delivery-chall-payment-check-box">
                                                {/* Payment input field (disabled when checkbox is checked) */}
                                                <input
                                                    type="text"
                                                    placeholder="Enter Your Payment Terms"
                                                    value={paymentTerms}
                                                    onChange={(e) => setPaymentTerms(e.target.value)}
                                                    className="form-control"
                                                    disabled={isChecked} // 👈 disable based on checkbox state
                                                />

                                                {/* Checkbox */}
                                                <div className="form-check d-flex align-items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="termsCheckbox"
                                                        checked={isChecked}
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                        style={{
                                                            width: "18px",
                                                            height: "18px",
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label ms-2"
                                                        htmlFor="termsCheckbox"
                                                        style={{ margin: 0, cursor: "pointer" }}
                                                    >
                                                        Advance
                                                    </label>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="col-md-6">
                                        <div className="party-name">
                                            <label> D.O. Date</label>
                                            <input type="date" placeholder='Enter Your D.O. No' value={dODate} onChange={(e) => setDoDate(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label> D.O. No</label>
                                            <input type="text" placeholder='Enter Your D.O. No' value={dONumber} onChange={(e) => setDoNumber(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label>Sales Rep.</label>
                                            <select className='delivery-challan-dropdown-field' value={salesRep} onChange={(e) => setSalesRep(e.target.value)}>
                                                <option value="">Select a Sales Representative</option>
                                                {representatives.map((rep) => (
                                                    <option key={rep.id} value={rep.id}>
                                                        {rep.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="party-name">
                                            <label>Party P.O. No</label>
                                            <input type="text" placeholder='Enter Your P.O. No' value={partyPoNumber} onChange={(e) => setPartyPoNumber(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label>Party P.O. No Date</label>
                                            <input type="date" placeholder='Enter Your Ship To Address' value={partyPoDate} onChange={(e) => setPartyPoDate(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <option>Pending</option>
                                        <option>Planning Given</option>
                                        <option>Ready for Dispatch</option>
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
                            <div className='py-3'>
                                <div className="row">
                                    <div className="col-md-12 ">
                                        <div className="party-name">
                                            <label> Order Notes</label>
                                            <textarea type="text" placeholder='Enter Your Order Note' value={orderNote} onChange={(e) => setOrderNote(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label> Warehouse/Delivery Notes</label>
                                            <textarea type="text" placeholder='Enter Warehouse/Delivery Notes' value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} />
                                        </div>
                                        <div className="party-name">
                                            <label> Transport Notes</label>
                                            <textarea type="text" placeholder='Enter Your Transport Notes' value={transportNote} onChange={(e) => setTransportNote(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                        <label className="form-check-label" htmlFor="courierNR">N / R</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierInvoice" />
                                        <label className="form-check-label" htmlFor="courierInvoice">Invoice Only</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierTCINV" />
                                        <label className="form-check-label" htmlFor="courierTCINV">TC+INV</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="courier" id="courierAll" />
                                        <label className="form-check-label" htmlFor="courierAll">TC+INV+LR</label>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- MTC --> */}
                            <div className="row mb-3 align-items-center border-top pt-3">
                                <div className="col-sm-2 fw-semibold">MTC</div>
                                <div className="col-sm freight-main-container">
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="mtc" id="mtcNR" />
                                        <label className="form-check-label" htmlFor="mtcNR">N / R</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="mtc" id="mtcMatchTC" />
                                        <label className="form-check-label" htmlFor="mtcMatchTC">Only Matching TC</label>
                                    </div>
                                    <div className="form-check form-check-inline freight-option">
                                        <input className="form-check-input" type="radio" name="mtc" id="mtcEndorsement" />
                                        <label className="form-check-label" htmlFor="mtcEndorsement">With Endorsement</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="chllan-page-form-btn-container">
                            <button type='submit' className='submit-btn'>Submit</button>
                            <button type='reset' className='clear-btn'>Clear</button>
                        </div>

                    </form>


                </div>
            </div>
        </>
    )
}

export default ChallanAdd
