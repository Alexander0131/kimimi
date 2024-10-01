import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (order) {
      console.log("Order details:", order);
    }
  }, [order]);

  // Paystack payment handling
  const handlePaystackPayment = () => {
    const paystackScript = document.createElement("script");
    paystackScript.src = "https://js.paystack.co/v1/inline.js";
    paystackScript.async = true;
    document.body.appendChild(paystackScript);

    paystackScript.onload = () => {
      const handler = window.PaystackPop.setup({
        key: 'pk_test_3cfc60101e67948b0d7311feefd6a7be38f5eaf1', // Your Paystack public key
        email: order.user.email,
        amount: order.totalPrice * 100, // Amount in kobo
        currency: "GHS",
        callback: function (response) {
          let message = 'Payment complete! Reference: ' + response.reference;
          alert(message);

          // Use the payOrder mutation to update the order status
          payOrder({
            orderId: order._id, // Pass the order ID
            paymentDetails: {
              transactionId: response.reference, // Paystack transaction reference
              isPaid: true,
              update_time: new Date().toISOString(),
              email: order.user.email,
            },
          })
          .then(() => {
            // Refetch order details and show success message
            refetch();
            toast.success("Payment successful! Order has been updated to 'Paid'.");
            navigate("/user-orders");
          })
          .catch((error) => {
            toast.error(error?.data?.message || "Failed to update payment status.");
          });
        },
        onClose: () => {
          toast.error("Payment was cancelled.");
        },
      });

      handler.openIframe();
    };
  };

  // Handle marking order as delivered
  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order marked as delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <div className="container mx-auto px-4 md:px-8 lg:max-w-6xl">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 pr-4">
          <div className="border gray-300 mt-5 pb-4 mb-5">
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b-2">
                    <tr>
                      <th className="p-2">Image</th>
                      <th className="p-2">Product</th>
                      <th className="p-2 text-center">Quantity</th>
                      <th className="p-2">Unit Price</th>
                      <th className="p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="p-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="p-2">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-center">₵ {item.price}</td>
                        <td className="p-2 text-center">
                          ₵ {(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="mt-5 border-gray-300 pb-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Dispatch</h2>
            <p className="mb-4 mt-4">
              <strong className="text-pink-500">Order:</strong> {order._id}
            </p>
            <p className="mb-4">
              <strong className="text-pink-500">Name:</strong> {order.user.username}
            </p>
            <p className="mb-4">
              <strong className="text-pink-500">Email:</strong> {order.user.email}
            </p>
            <p className="mb-4">
              <strong className="text-pink-500">Address:</strong> 
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <p className="mb-4">
              <strong className="text-pink-500">Method:</strong> {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not paid</Message>
            )}
          </div>

          <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>₵ {order.itemsPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Dispatch</span>
            <span>₵ {order.shippingPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>VAT</span>
            <span>₵ {order.taxPrice}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span>₵ {order.totalPrice}</span>
          </div>
          {!order.isPaid && (
            <div className="bg-pink-500 text-white py-2 px-4 rounded text-center text-lg w-full mt-4">
              {loadingPay && <Loader />}
              <button
                onClick={handlePaystackPayment} // Handle payment when the entire background is clicked
                disabled={loadingPay} // Disable the button if payment is loading
                className="w-full h-full bg-transparent text-white cursor-pointer focus:outline-none"
              >
                Pay with Paystack
              </button>
            </div>
          )}


          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <div>
              <button
                type="button"
                className="bg-pink-500 text-white w-full py-2"
                onClick={deliverHandler}
              >
                Mark As Delivered
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
