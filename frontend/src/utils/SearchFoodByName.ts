import axios from "../api/axios";

const searchFoodByName = async (name: string) => {
  return await axios
    .get(`/food/search/${name}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      return [];
    });
};

export default searchFoodByName;
