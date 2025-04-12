const API_KEY = "7pdhyuqVQDLkP6SRmrxqnykYUCDjJwgHAwhF6qSc"; // Replace this with your actual API key

export const fetchFoodsByGoal = async (goal) => {
  let query = "";

  switch (goal) {
    case "gain":
      query = "high calorie meal";
      break;
    case "loss":
      query = "low calorie meal";
      break;
    default:
      query = "balanced meal";
  }

  const response = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=5&api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.foods.map((item) => ({
    name: item.description,
    calories: item.foodNutrients?.find(n => n.nutrientName === 'Energy')?.value || "N/A"
  }));
};
