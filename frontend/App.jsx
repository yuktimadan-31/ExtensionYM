import React, { useState, useEffect } from "react";

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
    max-width: 1200px;
    margin: 0 auto;
    color: #2e2e2e;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .title {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
    color: #1f1f1f;
  }

  .refresh-btn {
    padding: 10px 20px;
    background-color: #2e31be;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  }

  .refresh-btn:hover {
    background-color: #1f22a6;
  }

  .refresh-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 60px 20px;
    font-size: 16px;
    color: #666;
  }

  .error {
    background-color: #fee;
    color: #c33;
    padding: 20px;
    border-radius: 6px;
    margin-bottom: 20px;
    border-left: 4px solid #c33;
  }

  .error code {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: monospace;
  }

  .empty {
    background-color: #f0f0f0;
    color: #666;
    padding: 40px;
    border-radius: 6px;
    text-align: center;
    font-size: 16px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .product-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;
  }

  .product-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }

  .product-name {
    font-size: 16px;
    font-weight: 600;
    color: #1f1f1f;
    margin: 0 0 12px 0;
  }

  .product-id {
    font-size: 13px;
    color: #666;
    margin: 8px 0;
    font-family: monospace;
    word-break: break-all;
  }

  .product-label {
    font-weight: 600;
    color: #444;
  }
`;

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products || []);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products. Make sure the extension is launched through Fynd.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="root">
        <div className="header">
          <h1 className="title">Fynd Products</h1>
          <button 
            className="refresh-btn" 
            onClick={fetchProducts}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
            <br />
            <small style={{ marginTop: '8px', display: 'block' }}>
              Note: This extension requires a valid Fynd session. 
              Launch it from the Fynd Partner Panel.
            </small>
          </div>
        )}

        {loading && !error && (
          <div className="loading">Loading products...</div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="empty">No products found in this company</div>
        )}

        {!loading && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.uid || product.id} className="product-card">
                <h3 className="product-name">{product.name}</h3>
                {product.uid && (
                  <p className="product-id">
                    <span className="product-label">UID:</span> {product.uid}
                  </p>
                )}
                {product.id && (
                  <p className="product-id">
                    <span className="product-label">ID:</span> {product.id}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
