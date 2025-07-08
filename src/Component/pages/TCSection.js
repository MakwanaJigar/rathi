import { Link } from 'react-router-dom'
import React from 'react'

const TCSection = () => {
  return (
    <>
       <div className="container-fluid"> 
            <div class=" main-content">
                <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Report <i class="fa-solid fa-angles-right"></i> TC Section</p>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h3 class="fw-bold">TC Section</h3>
                    </div>

                    <div class="d-flex align-items-center mb-4 flex-wrap gap-3">
                        <div class="tab-title active">Pending (0)</div>
                        <div class="tab-title">Hide (0)</div>
                        <input type="date" class="form-control filter-input" placeholder="From Date" />
                        <input type="date" class="form-control filter-input" placeholder="To Date" />
                        <button class="btn btn-filter">Filter</button>
                    </div>

                    <div class="table-container">
                        <table class="table table-borderless logistics-table">
                            <thead>
                                <tr class="border-bottom">
                                    <th>Do No</th>
                                    <th>Party Name</th>
                                    <th>Loading Date</th>
                                    <th>MTC</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-bottom">
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>lorem ipsum</td>
                                    <td>
                                        <div className="courier-checkbox-container">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="exampleRadios" id="radio1" value="radio1" checked />
                                                <label class="form-check-label" for="radio1">
                                                    N / R
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="exampleRadios" id="radio2" value="radio2" />
                                                <label class="form-check-label" for="radio2">
                                                    Only Matyching TC
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="exampleRadios" id="radio3" value="radio3" />
                                                <label class="form-check-label" for="radio3">
                                                    With Endorsement
                                                </label>
                                            </div>
                                        </div>
                                    </td>
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

export default TCSection
