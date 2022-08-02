import { Link } from "react-router-dom";
import logo from "../assets/img/vinted.png";

const Header = ({ userToken, handleToken }) => {
  return (
    <div className="header">
      <div className="header--elements">
        <div className="header--logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header--buttons --publish">
          <Link to="/publish">
            <button>Publish un article</button>
          </Link>
        </div>
        <div className="header--buttons">
          {!userToken ? (
            <>
              <div className="header--register">
                <Link to="/register">
                  <button>s'inscrire</button>
                </Link>
              </div>
              <div className="header--connect">
                <Link to="/connect">
                  <button>se connecter</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  onClick={() => {
                    handleToken(null);
                  }}
                >
                  Deconnexion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
