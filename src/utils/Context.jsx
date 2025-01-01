import axios from "./axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductContext = createContext();
const Context = (props) => {
  const [products, setproducts] = useState(
    null
    // JSON.parse(localStorage.getItem("products")) || null
  );

  const getproducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setproducts(data);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  console.log(products);
  useEffect(() => {
    getproducts();
  }, []);

  return (
    <ProductContext.Provider value={[products, setproducts]}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default Context;
