import React from "react";

export default function Datatable({data}){

    const columns = data[0] && Object.keys(data[0]);
  return (
    <table cellPadding={0} cellSpacing={0} align="center">
      <thead>
        <tr>
            <th>
                #
            </th>
            <th>
                COUNTRY NAME
            </th>
            <th>
                COUNTRY CODE
            </th>
            <th>
                PHONE NUMBER
            </th>
            <th>
                STATUS
            </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row[0]}>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}