import videohomepage from "../../assets/video/video-homepage.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videohomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-content_title title-1">
          There's a better way to ask
        </div>
        <div className="homepage-content_title title-2">
          You don't want to a boring form. And your audience won't answer one.
          Create a typeform instead-and make everyone happy
        </div>
        <div className="homepage-content_title title-3">
          <button>Get's started. It's free</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
