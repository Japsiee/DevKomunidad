const LeftLandingpage = () => {
  return (
    <div className="LeftLandingpage bg-dark bg-gradient d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}>
      <div className="p-4 p-md-5">
        <div className="btn-group">
          <a href="/login" className="btn btn-light btn-lg"><i className="bi bi-key-fill"></i> Login</a>
          <a href="/create-account" className="btn btn-outline-light btn-lg"><i className="bi bi-person-plus-fill"></i> Create Account</a>
        </div>
        <div className="banner py-3">
          <a href="/" className="text-decoration-none display-1 fw-bold text-white m-0">DEVELOPERS</a>
          <p className="fs-3 fw-bold text-white">Komunidad</p>
        </div>
        <p className="lead text-light">Devs komunidad is exclusive only for aspiring developers / already developers to help each other grow via exchanging their thoughts and ideas. This community was built and inspired by these inspirational qoutes - "Surround yourself by experienced programmers" and "There's something you know that I don't know and there's something I know that you don't".</p>
        <a href="/privacy-policy" className="me-4">Privacy Policy</a>
        <a href="/terms-and-condition" className="me-4">Terms &amp; Condition</a>
        <a href="/guide" className="me-4">How to use</a>
      </div>
    </div>
  );
}
 
export default LeftLandingpage;