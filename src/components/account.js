import Login from "./login";

const Account = () => {
  const user = localStorage.getItem("user");
  const logout = () => {
    localStorage.removeItem("user");
  };
  return (
    <>
      {!user && <Login />}
      {user && (
        <section>
          <div className="fakeBTN" onClick={() => logout()}>
            <p></p>
            <h4>Logga ut</h4>
            <p></p>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;
