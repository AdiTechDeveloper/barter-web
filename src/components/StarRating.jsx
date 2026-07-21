import React, { useState } from "react";

const StarIcon = ({ filled }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      strokeLinejoin="round"
    />
  </svg>
);

export default function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  size = "md",
}) {
  const [hovered, setHovered] = useState(0);
  const stars = [1, 2, 3, 4, 5];
  const displayValue = hovered || value;

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onMouseLeave={() => !readOnly && setHovered(0)}
          className={`${
            readOnly ? "cursor-default" : "cursor-pointer"
          } transition ${star <= displayValue ? "text-accent" : "text-border"}`}
        >
          <StarIcon filled={star <= displayValue} />
        </button>
      ))}
    </div>
  );
}
