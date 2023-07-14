import { useEffect, useState } from "react";
import { getAllQuizzByUser } from "../../services/userServices.js";
import "../../assets/scss/ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const ListQuizz = (props) => {
  const [listQuizz, setListQuizz] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    getListQuizz();
  }, []);

  const getListQuizz = async () => {
    let res = await getAllQuizzByUser();
    if (res && res.EC === 0) {
      setListQuizz(res.DT);
    }
  };
  return (
    <>
      <div className="list-quizz-container container">
        {listQuizz &&
          listQuizz.length > 0 &&
          listQuizz.map((item, index) => {
            return (
              <div
                key={`${index}-card`}
                class="card"
                // style={{ width: "18rem;" }}
              >
                <div className="div-img">
                  {" "}
                  <img
                    src={"data:image/jpeg;base64," + item.image}
                    class="card-img-top"
                    alt=""
                  />
                </div>

                <div class="card-body">
                  <h5 class="card-title">Quizz {index + 1}</h5>
                  <p class="card-text">{item.description}</p>
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      navigate(`/quizz/${item.id}`, {
                        state: { quizzTittle: item.description },
                      });
                    }}
                  >
                    {t("Users.StartNow")}
                    {/* Start Now */}
                  </button>
                </div>
              </div>
            );
          })}
        {listQuizz && listQuizz.length === 0 && (
          <div>You don't have quizz now ...</div>
        )}
      </div>
    </>
  );
};

export default ListQuizz;
