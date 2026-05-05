import React from "react";

const globalStyles = `
  html {
    height: 100%;
    width: 100%;
    font-size: 8px;
  }

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  .root {
    font-family: 'Inter', sans-serif;
    padding: 40px;
    max-width: 900px;
    margin: 0 auto;
    color: #2e2e2e;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  .title {
    margin: 0 0 20px;
    font-size: 36px;
    font-weight: 700;
    color: #1f1f1f;
  }

  .subtitle {
    margin: 0 0 24px;
    color: #555;
    font-size: 18px;
    line-height: 1.6;
  }

  .section {
    margin-bottom: 24px;
  }

  .section-title {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 600;
    color: #2e31be;
  }

  .section-text {
    margin: 0;
    color: #444;
    font-size: 15px;
    line-height: 1.8;
  }

  .footer {
    margin-top: 32px;
    color: #777;
    font-size: 14px;
  }
`;

function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <div className="root">
        <div className="card">
          <h1 className="title">Welcome to your Fynd Extension</h1>
          <p className="subtitle">
            This extension is now running successfully as a simple HTML page.
            You can use this page to verify your app is deployed correctly before enabling API access.
          </p>

          <div className="section">
            <h2 className="section-title">What is Fynd?</h2>
            <p className="section-text">
              Fynd is a platform that enables online merchants and partners to build
              commerce applications and extensions on top of its retail ecosystem.
              Fynd extensions can access company data, product catalogs, and other
              platform APIs with proper authentication.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">How this extension works</h2>
            <p className="section-text">
              This extension uses the Fynd extension boilerplate with a Node.js backend
              and a React frontend. In production, the backend can connect to the Fynd
              Platform API to fetch company product data securely.
            </p>
          </div>

          <div className="section">
            <h2 className="section-title">Next step</h2>
            <p className="section-text">
              If you want, I can next help you re-enable the product list and make
              sure the data request works from the Fynd partner launch flow.
            </p>
          </div>

          <div className="footer">
            Note: The API route <code>/api/products</code> is protected and requires
            a valid Fynd session. Opening this page directly is the correct way to
            verify the deployment UI first.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
