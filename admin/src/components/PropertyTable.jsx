import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const UserTable = ({ properties }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Owner</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Place
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Address
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Price / Night
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Type
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property, index) => (
          <tr key={property._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              {property.owner.name}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {property.title}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {property.address}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {property.price}
            </td>
            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {property.type}
            </td>
            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${properties._id}`}>
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
