import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import Modal from "./Modal";
import SmallModal from "./SmallModal";
import usePokeCollect from "@/hook/usePokeCollect";
import { set } from "react-hook-form";
import { cn } from "@/lib/utils";

type CollectedCardProps = {
  name: string;
  idx: number;
};

const CollectedCard: React.FC<CollectedCardProps> = ({ name, idx }) => {
  const img = useGetPokemonPic({ name, pictype: "Gif" });
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardDelete, setIsCardDelete] = useState(false);
  const { deletePokemon, ...trash } = usePokeCollect(name);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    closeModal();
  }, [isCardDelete]);

  return (
    <div
      ref={divRef}
      tabIndex={0}
      className={cn(
        "flex flex-col items-center justify-around focus:ring focus:ring-destructive rounded-lg cursor-pointer relative h-full w-full",
        {
          "transition-all duration-500 size-0 bg-secondary": isCardDelete,
        }
      )}
      onClick={openModal}
    >
      <div>
        <Image
          src={img?.toString() || "/pokeball.png"}
          alt={name}
          width={isCardDelete ? 0 : 80}
          height={isCardDelete ? 0 : 80}
          className="object-contain w-[80px] h-[80px] grid place-items-center"
        />
        <div
          className={cn("text-center text-sm", {
            hidden: isCardDelete,
          })}
        >
          {name}
        </div>
      </div>
      <SmallModal
        key={idx}
        isOpen={isModalOpen}
        onClose={closeModal}
        text="Delete"
        onDelete={() => {
          setIsCardDelete(true);
          const timer = setTimeout(() => {
            deletePokemon(idx);
            setIsCardDelete(false);
          }, 500);
          return () => clearTimeout(timer);
        }}
      />
    </div>
  );
};

export default CollectedCard;
