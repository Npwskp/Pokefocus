import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import Image from "next/image";
import React from "react";

type CollectedCardProps = {
  name: string;
};

const CollectedCard: React.FC<CollectedCardProps> = ({ name }) => {
  const img = useGetPokemonPic({ name, pictype: "Gif" });

  return (
    <div className="flex flex-col items-center">
      <Image
        src={img?.toString() || "/pokeball.png"}
        alt={name}
        width={100}
        height={100}
      />
      <div className="text-center">{name}</div>
    </div>
  );
};

export default CollectedCard;
