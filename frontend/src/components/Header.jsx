import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Swiper from "./Swiper";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full h-[22rem]">
        {/* Full-screen Swiper for both desktop and mobile */}
        <Swiper />
      </div>
    </>
  );
};

export default Header;

