import axios from "../utils/axios";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";

const Details = () => {
  const navigate = useNavigate();
  // const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setproduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!product) {
      // setproduct(products.filter((p) => p.id == id)[0]);
    }
    getSingleProduct();
  }, []);

  // const product = useContext(ProductContext);

  const productDeleteHandler = () => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    toast.warn("Product deleted!");
    navigate("/");
  };

  return product ? (
    <div className="w-[70%] justify-between items-center flex h-full m-auto p-[10%]">
      <img
        className="object-contain w-[40%] h-[80%]"
        src={`${product.image}`}
        alt="Product"
      ></img>
      <div className="content w-[50%]">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-black-300 mb-3">$ {product.price}</h2>
        <p className="mb-[5%]">{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className="border mr-5 py-2 px-5 rounded border-blue-200 text-blue-300 hover:text-white hover:bg-blue-500 duration-300"
        >
          Edit
        </Link>
        <button
          onClick={() => productDeleteHandler(product.id)}
          className="border py-2 px-5 rounded border-red-200 text-red-300 hover:text-white hover:bg-red-600 duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
