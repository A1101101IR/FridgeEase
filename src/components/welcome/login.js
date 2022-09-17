import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState(false);
  const displayLogin = () => {
    setLogin(false);
  };
  const displaySignin = () => {
    setLogin(true);
  };
  return (
    <>
      <section className="login">
        {!login && (
          <>
            <form action="">
              <input type="text" placeholder="exemple@gmail.com" />
              <br />
              <input type="text" placeholder="Lösenord" />
              <br />
              <button className="bigBTN">Logga in</button>
            </form>
            <div className="orBox">
              <div></div>
              <p>Behöver ett konto?</p>
              <div></div>
            </div>
            <button
              className="bigBTN"
              onClick={() => {
                displaySignin();
              }}
            >
              Skapa ett konto
            </button>
          </>
        )}
        {login && (
          <>
            <form action="">
              <input type="text" placeholder="Email" />
              <br />
              <input type="text" placeholder="confirm Email" />
              <br />
              <input type="text" placeholder="Lösenord" />
              <br />
              <button className="bigBTN">Skapa min konto</button>
            </form>
            <div className="orBox">
              <div></div>
              <p>Har ett konto?</p>
              <div></div>
            </div>
            <button
              className="bigBTN"
              onClick={() => {
                displayLogin();
              }}
            >
              Login
            </button>
          </>
        )}
      </section>
    </>
  );
};

export default Login;
