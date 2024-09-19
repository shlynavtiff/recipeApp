import { Heart, HeartPulse, Search, Soup } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/Utils";

const APP_ID = import.meta.env.VITE_APP_ID
const APP_KEY = import.meta.env.VITE_APP_KEY

const HomePage = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRecipes = async (searchQuery) => {
    setLoading(true)
    setRecipes([])

    try {
      const res = await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`)
      const data = await res.json()
      console.log(data)
      setRecipes(data.hits)
    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes('rice')
  }, [])

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    fetchRecipes(e.target[0].value); // Fetch recipes based on the search quer
  }


  return (
    <div className="bg=[#e0e0e0] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearch}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={24} />
            <input 
              type="text"
              className="text-sm md-text-md grow"
              placeholder="What are you craving today?"
            />
          </label>
        </form>
        <h1 className="font-bold text-3xl md-text-5xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          tangina mo
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">

        {!loading && recipes.map(({recipe}) => <RecipeCard key={recipe.uri} recipe={recipe} {...getRandomColor()}/>)}



        {loading && [...Array(9)].map((_, index) => (
          <div key={index} className="flex flex-col gap-4 w-full">
            <div className="skeleton h-32 w-full"></div>
            <div className="flex justify-between">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-28"></div>
            </div>
            <div className="skeleton h-4 w-1/2"></div>
          </div>
        ))}
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
// sdasd
// add recipe page
// Add page transitions
// add a "load more" button
// food categories
// settings
// dark / light mode
// logo