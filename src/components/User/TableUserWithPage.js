import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getUserWithPage } from "../../services/userServices.js";
import { useTranslation, Trans } from "react-i18next";
const PaginatedItems = ({ itemsPerPage }) => {
  const [currentItems, setCurrentItems] = useState(null);

  const [itemOffset, setItemOffset] = useState(0);

  //   const handlePageClick = (event) => {
  //     console.log(`User requested page number ${event.selected}`);
  //   };
};

const TableUserWithPage = (props) => {
  const { t } = useTranslation();
  const { listUsers, pageLimit, getAllUserWithPage, pageCount } = props;
  const handlePageClick = async (event) => {
    getAllUserWithPage(event.selected + 1, pageLimit);
  };

  return (
    <>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("ManagerUser.Name")}</th>
            <th scope="col">{t("ManagerUser.Role")}</th>
            <th scope="col">{t("ManagerUser.Actions")}</th>
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
                      <button className="btn btn-secondary">
                        {t("ManagerUser.View")}
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => props.handleClickBtnUser(item)}
                      >
                        {t("ManagerUser.Edit")}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => props.handleClickBtnDeleteUser(item)}
                      >
                        {t("ManagerUser.Delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <PaginatedItems itemsPerPage={4} />
      <div className="divPaginate">
        <ReactPaginate
          nextLabel={t("ManagerUser.Next") + " >"}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={" < " + t("ManagerUser.Previous")}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};
export default TableUserWithPage;
