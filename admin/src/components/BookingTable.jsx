import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const UserTable = ({ bookings }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Name</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Phone No
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Place
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Price
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Payment Status
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={booking._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {booking.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {booking.phone}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {booking.place.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {booking.price}
            </td>
            <td
              className={
                "border border-slate-700 rounded-md text-center max-md:hidden " +
                (booking.paymentStatus === "Success"
                  ? "text-green-400 font-bold"
                  : "text-red-400 font-bold")
              }
            >
              {booking.paymentStatus}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${bookings._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/books/delete`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
