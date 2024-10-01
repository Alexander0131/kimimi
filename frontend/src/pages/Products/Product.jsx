import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="product-container p-2 relative w-full max-w-md h-[36rem]"> {/* Increased height */}
      <div className="image-container relative h-[85%]"> {/* Image container takes up 85% of the height */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-t" // Image covers container
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-2 bg-white rounded-b h-[15%] flex items-center"> {/* Reduced height for content */}
        <Link to={`/product/${product._id}`} className="flex justify-between w-full">
          <span className="product-name text-lg text-gray-800 px-2 py-1 rounded">
            {product.name}
          </span>
          <span className="product-price bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center justify-center"> {/* Centered price text */}
          ₵ {product.price}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Product;
