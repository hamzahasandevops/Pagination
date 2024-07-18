import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState();
  const [page, setPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPages(selectedPage);
  };

  return (
    <>
      {products && products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 20).map((prod) => {
            return (
              <span key={prod.id} className="products-single">
                {prod.title}
                {<br></br>}
                {prod.description}
              </span>
            );
          })}
        </div>
      )}

      {products && products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disabled"}
            onClick={() => selectedPage(page - 1)}
          >
            {"<"}
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination_selected" : ""}
                onClick={() => selectedPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination_disabled"}
            onClick={() => selectedPage(page + 1)}
          >
            {">"}
          </span>
        </div>
      )}
    </>
  );
}

export default App;
