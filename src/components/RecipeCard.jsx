import React, { useState } from "react";
import { Heart, HeartPulse, Search, Soup } from "lucide-react";

const getTwoValues = (arr) => {
  return [arr[0], arr[1], ];
};

const RecipeCard = ({ recipe, bg, badge }) => {
  const healthLabels = getTwoValues(recipe.healthLabels);
  const [isFavorite, setIsFavotite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeInFav = favorites.some((fav) => fav.label === recipe.label);

    if (isRecipeInFav) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavotite(false);
    } else {
      favorites.push(recipe);
      setIsFavotite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a href={`#`} target="_blank" className="relative h-32">
        <div className="skeleton absolute inset-0" />
        <img
          src={recipe.image}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />
        <div
          className="absolute bottom-1 left-1 bg-white rounded-full p-1.5 cursor-pointer flex items-center
              gap-1 text-sm text-black
              "
        >
          <Soup size={14} /> {recipe.yield} Servings
        </div>

        <div
          onClick={(e) => {
            e.preventDefault();
            addRecipeToFavorites();
          }}
          className="absolute right-1 top-1 p-1 bg-white rounded-full cursor-pointer"
        >
          {!isFavorite && (
            <Heart
              size={20}
              className="text-black hover:fill-red-500 hover:text-red-500 "
            />
          )}
          {isFavorite && (
            <Heart size={20} className="fill-red-500 text-red-500 " />
          )}
        </div>
      </a>
      <div className="flex mt-1">
        <p className="font-bold tracking-wide text-gray-700">{recipe.label}</p>
      </div>
      <p className="my-2 text-gray-700">
        {recipe.cuisineType[0].charAt(0).toUpperCase() +
          recipe.cuisineType[0].slice(1)}
      </p>
      <div className="flex gap-2 mt-auto">
        {healthLabels.map((label, idx) => (
          <div
            key={idx}
            className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
          >
            <HeartPulse size={16} className="text-black" />
            <span className="text-sm tracking-tighter font-semibold text-gray-700">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
