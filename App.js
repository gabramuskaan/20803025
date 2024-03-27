import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('COMPANY1_API_ENDPOINT'),
          axios.get('COMPANY2_API_ENDPOINT'),
          axios.get('COMPANY3_API_ENDPOINT'),
          axios.get('COMPANY4_API_ENDPOINT'),
          axios.get('COMPANY5_API_ENDPOINT'),
        ]);

        const allProducts = responses.map(response => response.data.products);
        const combinedProducts = allProducts.flat(); // Combine all products from different companies

        // Sort the combined products by sales or any other relevant metric
        const sortedProducts = combinedProducts.sort((a, b) => b.sales - a.sales).slice(0, N);

        setTopProducts(sortedProducts);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Top {N} Products</h1>
      <ul>
        {topProducts.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>{product.name}</div>
            <div>{product.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
