import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar (hidden on small screens) */}
        <div className="hidden md:block">
          <AdminMenu />
        </div>

        <section className="flex-1 xl:ml-[4rem] md:ml-[0rem] md:px-6">
          <div className="flex flex-col items-center justify-center md:flex-row md:justify-around flex-wrap">
            <div className="rounded-lg bg-black p-5 w-[20rem] mt-5 text-center">
              <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                ₵
              </div>

              <p className="mt-5">Sales</p>
              <h1 className="text-xl font-bold">
               ₵ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
              </h1>
            </div>
            <div className="rounded-lg bg-black p-5 w-[20rem] mt-5 text-center">
              <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              ₵
              </div>

              <p className="mt-5">Customers</p>
              <h1 className="text-xl font-bold">
                {loading ? <Loader /> : customers?.length}
              </h1>
            </div>
            <div className="rounded-lg bg-black p-5 w-[20rem] mt-5 text-center">
              <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              ₵
              </div>

              <p className="mt-5">All Orders</p>
              <h1 className="text-xl font-bold">
                {loadingTwo ? <Loader /> : orders?.totalOrders}
              </h1>
            </div>
          </div>

          <div className="flex justify-center mt-[4rem]">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              className="w-[90%] md:w-[80%] lg:w-[70%]"
            />
          </div>

          <div className="mt-[4rem] px-4 md:px-8 lg:px-16">
            <OrderList />
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
