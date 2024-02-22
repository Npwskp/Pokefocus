import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import Image from "next/image";
import React from "react";

type CollectedCardProps = {
  name: string;
  setSelectedPokemon: (name: string) => void;
};

const CollectedCard: React.FC<CollectedCardProps> = ({
  name,
  setSelectedPokemon,
}) => {
  const img = useGetPokemonPic({ name, pictype: "Gif" });
  const divRef = React.useRef<HTMLDivElement>(null);

  function handleSelect(name: string) {
    if (divRef.current) {
      divRef.current.focus();
    }
    setSelectedPokemon(name);
  }

  return (
    <div
      ref={divRef}
      tabIndex={0}
      onClick={() => handleSelect(name)}
      className="flex flex-col items-center justify-around focus:ring focus:ring-destructive rounded-lg cursor-pointer"
    >
      <Image
        src={img?.toString() || "/pokeball.png"}
        alt={name}
        width={80}
        height={80}
        className="object-contain w-[80px] h-[80px] grid place-items-center"
      />
      <div className="text-center text-sm">{name}</div>
    </div>
  );
};

export default CollectedCard;
