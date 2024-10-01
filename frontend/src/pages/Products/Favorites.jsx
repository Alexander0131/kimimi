import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="flex flex-col items-center sm:ml-0">
      <h1 className="text-lg font-bold pt-[3rem] text-center">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap justify-center">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
