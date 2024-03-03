import React from "react";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";

const Information = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Info className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:w-full rounded-md">
        <DialogHeader className="flex flex-row justify-center items-end gap-3">
          <h2 className="text-2xl font-semibold">What is PokeFocus ?</h2>
          <Image
            src="/pokeball.png"
            alt="pokeball"
            width={30}
            height={30}
            className="mt-0"
          />
        </DialogHeader>
        <div className=" sm:px-4 flex flex-col gap-4 items-center">
          <p className="text-base">
            <span className="inline ml-6"></span>
            Your productivity companion! Choose Pokémon, set work and rest
            times. Stay focused with the Pomodoro Technique! and obtian a cute
            Pokémon.
          </p>
          <Image
            src="https://i.pinimg.com/564x/7d/70/8f/7d708f429ab389222e743ae88bd1c797.jpg"
            alt="pomodoro"
            width={400}
            height={300}
            className="rounded-lg"
          />
          <DialogClose asChild>
            <Button variant="default" onClick={() => {}}>
              Take a tour
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Information;
