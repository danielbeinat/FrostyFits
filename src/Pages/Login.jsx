import "./scss/Login.scss";

export const Login = () => {
  return (
    <>
      <div className="login">
        <div className="form">
          <h1>Iniciar session</h1>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your name"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <input
              type="password"
              name="email"
              id="email"
              placeholder="Enter your password"
            />
          </div>

          <button>Iniciar session</button>
          <p>
            ¿ya tienes una cuenta? <a href="/register">Registrate</a>
          </p>
        </div>
      </div>
    </>
  );
};
