import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={`/restaurants/${id}`}>
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="mb-3 bg-cover bg-center py-28"
      ></div>
      <h3 className="text-xl">{name}</h3>
      <span className="mt-2 border-t border-gray-400 py-2 text-xs opacity-50">
        {categoryName}
      </span>
    </div>
  </Link>
);
