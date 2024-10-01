import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Footer from "./Footer/Footer";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-center items-center mt-[2rem] flex-wrap">
            <h1 className="text-[3rem] sm:text-[2rem] mb-4 sm:mb-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 ml-6 sm:ml-4"
            >
              Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 justify-center mt-[2rem] ml-[1rem] sm:ml-[2rem]">
            {data.products.map((product) => (
              <div key={product._id} className="m-2">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
