import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/Context";

const Nav = () => {
  const [products] = useContext(ProductContext);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];
  // console.log(distinct_category);

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, ${(
      Math.random() * 255
    ).toFixed()},${(Math.random() * 255).toFixed()}, 0.4)`;
  };

  return (
    <>
      <nav className="h-full w-[20%] bg-zinc-50 flex flex-col items-center pt-5">
        <a
          href="/create"
          className="border py-2 px-5 rounded border-blue-200 text-blue-300 hover:text-white hover:bg-blue-500 duration-300"
        >
          Add New Product
        </a>

        <hr className="my-3 w-[80%]" />

        <h1 className="text-xl mb-3 w-[80%]">Category Filter</h1>
        <div className="w-[80%]">
          {distinct_category.map((c, i) => (
            <Link
              key={i}
              to={`/?category=${c}`}
              className="mb-3 flex items-center"
            >
              <span
                style={{ backgroundColor: color() }}
                className="rounded-full w-[13px] h-[13px] mr-2"
              ></span>{" "}
              {c}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Nav;
