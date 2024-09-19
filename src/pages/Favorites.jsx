import React from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/Utils";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="bg-[#e0e0e0] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4 text-black">
          My Favorites
        </p>

        {favorites.length === 0 && (
          <div className="h-[80vh] flex flex-col items-center justify-center gap-4 font-bold text-2xl md:text-3xl text-black">
            No added Favorites yet!
          </div>
        )}

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-black">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} {...getRandomColor()} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
