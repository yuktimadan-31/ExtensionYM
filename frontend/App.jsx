import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const globalStyles = `
  html {
    height: 100%;
    width: 100%;
    font-size: 8px;
  }

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f8f8f8 !important;
    width: 100%;
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  .root {
    font-family: 'Inter', sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .header h1 {
    margin: 0;
    color: #333;
    font-size: 32px;
    font-weight: 600;
  }

  .refresh-btn {
    padding: 10px 20px;
    background-color: #2e31be;
    color: white;
    border: none;
    border-radius: 4px;
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
    padding: 40px;
    font-size: 16px;
    color: #666;
  }

  .error {
    background-color: #fee;
    color: #c33;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
    border-left: 4px solid #c33;
  }

  .empty {
    background-color: #f0f0f0;
    color: #666;
    padding: 40px;
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .product-card {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .product-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .product-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
  }

  .product-id {
    font-size: 12px;
    color: #999;
    margin: 0;
    word-break: break-all;
  }
`;

function App() {
  const { company_id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    if (!company_id) {
      setError('Missing company_id in the URL. Open this page via the Fynd extension route.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/products', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products || []);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (company_id) {
      fetchProducts();
    }
  }, [company_id]);

  return (
    <>
      <style>{globalStyles}</style>
      <div className="root">
        <div className="header">
          <h1>Fynd Products</h1>
          <button 
            className="refresh-btn" 
            onClick={fetchProducts}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>

        {!company_id && (
          <div className="error">
            <strong>Info:</strong> Open this app via a valid Fynd extension path like <code>/company/&lt;company_id&gt;</code>.
          </div>
        )}

        {error && company_id && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && !error && (
          <div className="loading">Loading products...</div>
        )}

        {!loading && products.length === 0 && !error && (
          <div className="empty">No products found</div>
        )}

        {!loading && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.uid || product.id} className="product-card">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-id">
                  <strong>UID:</strong> {product.uid || 'N/A'}
                </p>
                {product.id && (
                  <p className="product-id">
                    <strong>ID:</strong> {product.id}
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
