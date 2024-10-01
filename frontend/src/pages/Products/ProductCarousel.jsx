import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full mx-auto bg-pink-100 rounded-lg sm:w-[20rem] md:w-[32rem] lg:w-[42rem] xl:w-[37rem] mt-3"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
            }) => (
              <div key={_id} className="flex flex-row items-start">
                {/* Image on the left */}
                <div className="w-1/2">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-[20rem] sm:h-[22rem] md:h-[28rem] lg:h-[32rem] xl:h-[35rem] rounded-l-lg object-cover"
                  />
                </div>

                {/* Product details on the right */}
                <div className="p-4 bg-white w-1/2 rounded-r-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg sm:text-xl font-semibold text-black">{name}</h2>
                    <p className="text-base sm:text-lg font-medium bg-pink-100 text-pink-800 rounded-full px-2.5 py-0.5">
                      ₵ {price}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-800">
                    {description.substring(0, 170)} ...
                  </p>

                  <div className="flex flex-wrap justify-between mt-4 w-full">
                    <div className="flex flex-col gap-4 w-[48%]">
                      <div className="flex items-center">
                        <FaStore className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">Brand: {brand}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">Added: {moment(createdAt).fromNow()}</span>
                      </div>
                      <div className="flex items-center">
                        <FaStar className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">Reviews: {numReviews}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 w-[48%]">
                      <div className="flex items-center">
                        <FaStar className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">Ratings: {Math.round(rating)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaShoppingCart className="mr-2 text-gray-800" />
                        <span className="text-gray-800 font-medium">Quantity: {quantity}</span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
