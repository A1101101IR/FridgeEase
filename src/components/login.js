import { useState } from "react";

const Login = () => {
  const user = localStorage.getItem("user");
  const [login, setLogin] = useState(false);
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function createUser() {
    const res = await fetch("/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === "User exists") {
      console.log(data.status);
      setTimeout(() => {
        setLogin(false);
      }, 500);
    } else if (data.status === "User created") {
      console.log(data.status);
      setTimeout(() => {
        setLogin(false);
      }, 500);
    } else {
      console.log(data.status);
    }
  }
  async function loginUser() {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data.currentUser);
    if (data.currentUser) {
      if (password === data.currentUser.password) {
        console.log("Success!");
        setTimeout(() => {
          localStorage.setItem("user", data.currentUser._id);
          window.location.reload(false);
        }, 500);
      } else {
        console.log("Incorrect password!");
      }
    } else {
      console.log("Can't find account!");
    }
  }

  const displayLogin = () => {
    setLogin(false);
  };
  const displaySignin = () => {
    setLogin(true);
  };

  return (
    <>
      <section className="login">
        {!user && (
          <>
            {!login && (
              <>
                <div className="form">
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Lösenord"
                  />
                  <button className="bigBTN" onClick={() => loginUser()}>
                    Logga in
                  </button>
                </div>
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
                <div className="form">
                  <input
                    type="text"
                    onChange={(e) => setFirstname(e.target.value)}
                    placeholder="Förnamn"
                  />
                  <input
                    type="text"
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Efternamn"
                  />
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  {/* <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="confirm Email" /> */}
                  <input
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Lösenord"
                  />
                  <button className="bigBTN" onClick={() => createUser()}>
                    Skapa min konto
                  </button>
                </div>
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
          </>
        )}
      </section>
    </>
  );
};

export default Login;
