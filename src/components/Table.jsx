import React from "react";
import "../styles/Table.css";

const Table = ({ cities, loading }) => {
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (!cities?.length) {
    return <div className="no-result">Start searching</div>;
  }

  return (
    <table className="places-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {cities?.length > 0 ? (
          cities.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <img
                  src={`https://flagsapi.com/${item.countryCode}/flat/16.png`}
                  alt={item.country}
                />
                {item.country}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="no-result">
              No result found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
