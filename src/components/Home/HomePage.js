import videohomepage from "../../assets/video/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
const HomePage = (props) => {
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videohomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-content_title title-1">
          {t("homepage.title1")}
          {/* There's a better way to ask */}
        </div>
        <div className="homepage-content_title title-2">
          {/* You don't want to a boring form. And your audience won't answer one.
          Create a typeform instead-and make everyone happy */}
          {t("homepage.title2")}
        </div>
        <div className="homepage-content_title title-3">
          {isAuthenticated === false ? (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              {/* Get's started. It's free */}
              {t("homepage.title3.login")}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              {/* Doing Quizz */}
              {t("homepage.title3.user")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
