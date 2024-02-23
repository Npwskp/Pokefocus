import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "./Modal";
import SmallModal from "./SmallModal";
import usePokeCollect from "@/hook/usePokeCollect";

type CollectedCardProps = {
  name: string;
  idx: number;
};

const CollectedCard: React.FC<CollectedCardProps> = ({ name, idx }) => {
  const img = useGetPokemonPic({ name, pictype: "Gif" });
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deletePokemon, ...trash } = usePokeCollect(name);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      ref={divRef}
      tabIndex={0}
      className="flex flex-col items-center justify-around focus:ring focus:ring-destructive rounded-lg cursor-pointer relative"
    >
      <div onClick={openModal}>
        <Image
          src={img?.toString() || "/pokeball.png"}
          alt={name}
          width={80}
          height={80}
          className="object-contain w-[80px] h-[80px] grid place-items-center"
        />
        <div className="text-center text-sm">{name}</div>
      </div>
      <SmallModal
        key={idx}
        isOpen={isModalOpen}
        onClose={closeModal}
        text="Delete"
        onDelete={() => deletePokemon(idx)}
      />
    </div>
  );
};

export default CollectedCard;
