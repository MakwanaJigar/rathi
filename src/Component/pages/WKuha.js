import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWKuha } from "../../../src/redux/actions/kuhaAction";

const WKuha = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state) => state.wkuha);

  useEffect(() => {
    dispatch(fetchWKuha());
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="main-content">
        <p className="main-container-title">
          Dashboard <i className="fa-solid fa-angles-right"></i> Report{" "}
          <i className="fa-solid fa-angles-right"></i> W Kuha
        </p>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">W Kuha</h3>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        <div className="table-container">
          <table className="table table-borderless logistics-table">
            <thead>
              <tr className="border-bottom">
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
              {data && data.length > 0 ? (
                data.map((row, i) => (
                  <tr key={i} className="border-bottom">
                    <td>{row.delivery_challan?.do_no}</td>
                    <td>{row.delivery_challan?.party_name}</td>
                    <td>{row.item}</td>
                    <td>{row.make}</td>
                    <td>{row.qty_mt}</td>
                    <td>{row.pcs}</td>
                    <td>
                      <select className="form-select">
                        <option disabled selected>
                          {row.status || "Status"}
                        </option>
                        <option>Pending</option>
                        <option>Planing Given</option>
                        <option>Ready For Dispatch</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WKuha;
