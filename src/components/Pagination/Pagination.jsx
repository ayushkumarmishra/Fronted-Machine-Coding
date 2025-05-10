import React from "react";
import { useState, useEffect } from "react";
import "./Pagination.css";

const CardComponent = ({ image, title, id }) => {
  return (
    <div className="product-card" key={id}>
      <img src={image} alt="products_image" className="product-img" />
      <span>{title}</span>
    </div>
  );
};

const DropDownComponent = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <select
      className="dropdown-pagination"
      value={currentPage}
      onChange={(e) => onPageChange(Number(e.target.value))}
    >
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <option value={page} key={page}>
            Page {page}
          </option>
        )
      )}
    </select>
  );
};

const ShimmerCompoenent = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, index) => (
        <div className="product-card" key={index}>
          <img className="shimmer-img" />
          <span></span>
        </div>
      ))}
    </>
  );
};

const MAX_PRODUCTS = 10;

const Pagination = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHasError(false);
      try {
        const response = await fetch("https://dummyjson.com/products?limit=50");
        const result = await response.json();
        setDatas(result.products);
      } catch (error) {
        console.log(error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productSize = datas.length;
  const numberofpages = Math.ceil(productSize / MAX_PRODUCTS);
  const startIndex = (currentPage - 1) * MAX_PRODUCTS;
  const endIndex = startIndex + MAX_PRODUCTS;

  if (loading) {
    return (
      <div>
        <ShimmerCompoenent />
      </div>
    );
  }

  if (hasError) {
    return (
      <div>
        <h2>Failed to load data. Please try again later.</h2>
        <ShimmerCompoenent />
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: "5rem" }}>Pagination</h1>

      <div className="pagination">
        <button
          className="pagination-numbers"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ⬅️
        </button>
        {Array.from({ length: numberofpages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`pagination-numbers ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}
        <button
          className="pagination-numbers"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === numberofpages}
        >
          ➡️
        </button>
      </div>

      <div className="pagination-container">
        {datas.slice(startIndex, endIndex).map((data) => (
          <CardComponent
            key={data.id}
            image={data.thumbnail}
            title={data.title}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-numbers"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ⬅️
        </button>
        <DropDownComponent
          totalPages={numberofpages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <button
          className="pagination-numbers"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === numberofpages}
        >
          ➡️
        </button>
      </div>
    </div>
  );
};

export default Pagination;
