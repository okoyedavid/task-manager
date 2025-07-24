import React, { useState } from "react";

import {
  Heart,
  ShoppingCart,
  CheckCircle,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Flag,
} from "lucide-react";
import { ShoppingItem } from "../types";
import Image from "next/image";

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onStatusChange: (itemId: string, status: ShoppingItem["status"]) => void;
  onEdit: (item: ShoppingItem) => void;
}

export const ShoppingItemCard: React.FC<ShoppingItemCardProps> = ({
  item,
  onStatusChange,
  onEdit,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusConfig = (status: ShoppingItem["status"]) => {
    switch (status) {
      case "wishlist":
        return {
          icon: Heart,
          color: "text-pink-500",
          bg: "bg-pink-100 dark:bg-pink-900/30",
        };
      case "planned":
        return {
          icon: ShoppingCart,
          color: "text-yellow-500",
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
        };
      case "purchased":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bg: "bg-green-100 dark:bg-green-900/30",
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const statusConfig = getStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={`border border-green-400/20 bg-green-950/10 backdrop-blur-xl rounded-lg cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-200 group `}
    >
      {/* Item Image */}
      {item.image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />

          {/* Status Badge */}
          <div
            className={`absolute top-2 left-2 px-2 py-1 rounded-full ${statusConfig.bg} flex items-center space-x-1`}
          >
            <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
            <span className={`text-xs font-medium ${statusConfig.color}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>

          {/* Priority Badge */}
          <div className="absolute top-2 right-2">
            <Flag className={`w-4 h-4 ${getPriorityColor(item.priority)}`} />
          </div>
        </div>
      )}

      {/* Item Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-white line-clamp-2 flex-1`}>
            {item.name}
          </h3>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-1 rounded hover:bg-green-950 text-white ml-2 relative`}
          >
            <MoreVertical className="w-4 h-4" />

            {showMenu && (
              <div
                className={`absolute right-0 top-6 bg-black/40 border border-green-700 rounded-lg shadow-lg py-1 z-10 min-w-32`}
              >
                <button
                  onClick={() => {
                    onEdit(item);
                    setShowMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-white bg-green-950`}
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-white bg-green-950`}
                    onClick={() => setShowMenu(false)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                  </a>
                )}
                <button
                  className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-500 bg-green-950`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </button>
        </div>

        {/* Description */}
        {item.description && (
          <p className={`text-sm text-white mb-3 line-clamp-2`}>
            {item.description}
          </p>
        )}

        {/* Category and Priority */}
        <div className="flex items-center space-x-2 mb-3">
          <span
            className={`text-xs px-2 py-1 rounded-full text-white bg-blue-950 dark:bg-background`}
          >
            {item.category}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
              item.priority
            )} bg-green-950`}
          >
            {item.priority} priority
          </span>
        </div>

        {/* Price */}
        {item.price && (
          <div className="mb-3">
            <span className={`text-lg font-bold text-white`}>
              ${item.price.toLocaleString()}
            </span>
          </div>
        )}

        {/* Notes */}
        {item.notes && (
          <p className={`text-xs text-white mb-3 line-clamp-2`}>{item.notes}</p>
        )}

        {/* Quick Actions */}
        <div className="flex space-x-1">
          {item.status !== "purchased" && (
            <button
              onClick={() => onStatusChange(item._id, "purchased")}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-2 px-2 rounded transition-colors"
            >
              Mark Purchased
            </button>
          )}
          {item.status !== "planned" && item.status !== "purchased" && (
            <button
              onClick={() => onStatusChange(item._id, "planned")}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-2 px-2 rounded transition-colors"
            >
              Plan to Buy
            </button>
          )}
          {item.status !== "wishlist" && item.status !== "purchased" && (
            <button
              onClick={() => onStatusChange(item._id, "wishlist")}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs py-2 px-2 rounded transition-colors"
            >
              Add to Wishlist
            </button>
          )}
        </div>

        {/* Purchase Date */}
        {item.status === "purchased" && item.datePurchased && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className={`text-xs text-white`}>
              {/* Purchased on {item.datePurchased.toLocaleDateString()} */}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
