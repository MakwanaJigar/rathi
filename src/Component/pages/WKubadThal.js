import { Link } from "react-router-dom";
import React from 'react'

const WKubadThal = () => {
  return (
    <>
      <div className="container-fluid">
        <div class="container main-content">
          <p className='main-container-title'>Dashboard <i class="fa-solid fa-angles-right"></i> Report <i class="fa-solid fa-angles-right"></i>W Kubadthal</p>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold">W Kubadthal</h3>
          </div>

          <div class="table-container">
            <table class="table table-borderless logistics-table">
              <thead>
                <tr class="border-bottom">
                  <th>Do No</th>
                  <th>Party Name</th>
                  <th>Item</th>
                  <th>Make</th>
                  <th>QTY</th>
                  <th>PCS</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-bottom">
                  <td>lorem ipsum</td>
                  <td>lorem ipsum</td>
                  <td>lorem ipsum</td>
                  <td>lorem ipsum</td>
                  <td>lorem ipsum</td>
                  <td>lorem ipsum</td>
                  <td>
                    <div class="mb-3">
                      <select class="form-select" id="exampleSelect">
                        <option selected disabled>
                          Status
                        </option>
                        <option value="1">Pending</option>
                        <option value="2">Planing Given</option>
                        <option value="3">Ready For Dispatch</option>
                      </select>
                    </div>
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

export default WKubadThal
