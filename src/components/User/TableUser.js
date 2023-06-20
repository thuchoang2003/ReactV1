import { useEffect, useState } from "react";

const TableUser = (props) => {
  const { listUsers } = props;

  return (
    <>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td style={{ lineHeight: "50px" }}>{item.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={"data:image/jpeg;base64," + item.image}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.username}</p>
                        <p className="text-muted mb-0">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ lineHeight: "50px" }}>{item.role}</td>
                  <td>
                    <div
                      className="divEditUser"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 0px 10px 0px",
                        gap: "10px",
                      }}
                    >
                      <button className="btn btn-secondary">View</button>
                      <button
                        className="btn btn-info"
                        onClick={() => props.handleClickBtnUser(item)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
