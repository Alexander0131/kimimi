import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access userInfo from the auth slice
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart; // Only access cartItems here
  const { userInfo } = useSelector((state) => state.auth); // Correctly access userInfo from auth

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!userInfo) {
      navigate("/login");
      toast.error("Please log in to proceed.");
      return;
    }

    navigate("/shipping"); // Redirect to the PlaceOrder page
  };

  return (
    <>
      <div className="container mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        {cartItems.length === 0 ? (
          <div className="text-center">
            Your cart is empty{" "}
            <Link to="/shop" className="text-pink-500">
              Go To Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-semibold mb-4 text-center lg:text-left">
                Shopping Cart
              </h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start mb-6 pb-4 border-b border-gray-200"
                >
                  <div className="w-[5rem] h-[5rem] mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 sm:ml-4 text-center sm:text-left">
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white-600">{item.brand}</div>
                    <div className="mt-2 text-white-800 font-bold">
                      ₵ {item.price}
                    </div>
                  </div>

                  <div className="w-24 mt-4 sm:mt-0 sm:w-auto">
                    <select
                      className="w-full p-2 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <button
                      className="text-red-500 ml-4"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-8 w-full sm:w-[40rem] mx-auto">
                <div className="p-4 rounded-lg bg-gray-100">
                  <h2 className="text-xl font-semibold mb-2 text-black">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div className="text-2xl font-bold text-black">
                    ₵{" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
