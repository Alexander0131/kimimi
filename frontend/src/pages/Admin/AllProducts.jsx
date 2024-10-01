import { Link } from "react-router-dom";
import moment from "moment";
import { useState } from "react";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  // Show only the first 12 products unless "See More" is clicked
  const displayedProducts = showAll ? products : products.slice(0, 12);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 md:mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 w-full md:w-3/4">
            <div className="text-xl font-bold h-12">
              All Products ({products.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>
                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p className="text-lg font-semibold">₵ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* "See More" Arrow at the Center Bottom */}
            {products.length > 12 && !showAll && (
              <div className="text-center mt-6">
                <button
                  onClick={handleSeeMore}
                  className="flex items-center mx-auto text-pink-700 hover:text-pink-800 font-bold text-lg"
                >
                  See More
                  <svg
                    className="w-5 h-5 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
