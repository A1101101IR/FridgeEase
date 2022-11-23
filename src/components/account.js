import { useEffect } from "react";
import useFatch from "./customHooks/useFetch";
import Login from "./login";
import UserImg from "../img/userimg.png";
const Account = () => {
  const user = localStorage.getItem("user");
  const { data } = useFatch(`user/${user}`);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };

  return (
    <>
      {!user && <Login />}
      {user && (
        <section>
          <div className="account-page">
            {data && (
              <header>
                <img src={UserImg} alt="" />
                <h4>
                  {"Du är inloggad som " + data.firstname + " " + data.lastname}
                </h4>
              </header>
            )}
            <div className="btn-box">
              <div className="fakeBTN elementBTN">
                <p></p>
                <h4>Recept favoriter</h4>
                <p></p>
              </div>
              <div className="fakeBTN elementBTN">
                <p></p>
                <h4>Diet</h4>
                <p></p>
              </div>
              <div className="fakeBTN elementBTN" onClick={() => logout()}>
                <p></p>
                <h4>Logga ut</h4>
                <p></p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;
