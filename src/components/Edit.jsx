import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [products, setproducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState(products);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    setproduct(products.filter((p) => p.id === id)[0]);
  }, [id]);

  console.log(product);

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      price.trim().length < 1 ||
      category.trim().length < 5 ||
      description.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 characters");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      price: parseFloat(price),
      category,
      description,
    };

    setproducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product Added Successfully!");
    navigate("/");
  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="h-screen w-screen flex flex-col items-center p-[5%]"
    >
      <h1 className="text-3xl w-1/2 mb-5">Edit Product</h1>
      <input
        className="text-1xl bg-zinc-100 rounded w-1/2 mb-3 p-3"
        type="url"
        placeholder="image link"
        onChange={(e) => setimage(e.target.value)}
        value={product && product.image}
      ></input>

      <input
        className="text-1xl bg-zinc-100 rounded w-1/2 mb-3 p-3"
        type="text"
        placeholder="title"
        onChange={(e) => settitle(e.target.value)}
        value={product && product.title}
      ></input>

      <div className="w-1/2 flex justify-between">
        <input
          className="text-1xl bg-zinc-100 rounded w-[49%] mb-3 p-3"
          type="text"
          placeholder="category"
          onChange={(e) => setcategory(e.target.value)}
          value={product && product.category}
        ></input>

        <input
          className="text-1xl bg-zinc-100 rounded w-[49%] mb-3 p-3"
          type="number"
          placeholder="price"
          onChange={(e) => setprice(e.target.value)}
          value={product && product.price}
        ></input>
      </div>

      <textarea
        className="text-1xl bg-zinc-100 rounded w-1/2 mb-3 p-3"
        rows="10"
        type="text"
        placeholder="enter product description here..."
        onChange={(e) => setdescription(e.target.value)}
        value={product && product.description}
      ></textarea>

      <div className="w-1/2">
        <button
          href="/create"
          className="border py-2 px-5 rounded border-blue-200 text-blue-300 hover:text-white hover:bg-blue-500 duration-300"
        >
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
