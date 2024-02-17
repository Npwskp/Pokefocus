import axios from "axios";
import React, { useEffect } from "react";

const PokeImage = () => {
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/1")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>PokeImage</div>;
};

export default PokeImage;
