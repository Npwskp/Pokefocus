import { useGetPokemonPic } from "@/hook/useGetPokemonPic";
import PokeCard from "./PokeCard";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import Image from "next/image";

type CollectedPokeModalProps = {
  open: boolean;
  onClose: () => void;
  pokemon: string;
};

const CollectedPokeModal: React.FC<CollectedPokeModalProps> = ({
  open: isOpen,
  onClose,
  pokemon,
}) => {
  const pokepic = useGetPokemonPic({ name: pokemon, pictype: "Gif" });

  return (
    <Dialog open={isOpen} key={2}>
      <DialogContent className="flex items-center flex-col justify-around">
        <DialogTitle>
          <span className="text-blue-600">
            {pokemon.slice(0, 1).toUpperCase() + pokemon.slice(1)}
          </span>{" "}
          Collected!
        </DialogTitle>
        <div className="">Congratulations</div>
        <Image
          src={pokepic?.toString() || "/pokeball.png"}
          alt={pokemon}
          width={100}
          height={100}
          className="object-contain grid place-items-center"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CollectedPokeModal;
