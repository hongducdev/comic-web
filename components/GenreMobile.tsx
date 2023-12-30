import { RiContractUpDownLine, RiSearch2Line } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Genre } from "@/types/comic";

interface GenreMobileProps {
  genres: Genre[];
  selectedGenre: string;
  setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
}

const GenreMobile: React.FC<GenreMobileProps> = ({
  genres,
  selectedGenre,
  setSelectedGenre,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="mt-3 lg:hidden">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {genres.find((genre) => genre.id === selectedGenre)?.name}
            <RiContractUpDownLine className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[94vw] p-0">
          <Command>
            <CommandInput placeholder="Tìm kiếm thể loại..." className="h-9" />
            <CommandEmpty>Không tìm thấy thể loại nào phù hợp</CommandEmpty>
            <CommandGroup>
              {genres.map((genre) => (
                <CommandItem
                  key={genre.id}
                  value={genre.id}
                  onSelect={(currentValue) => {
                    setSelectedGenre(
                      currentValue === selectedGenre ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {genre.name}
                  <RiSearch2Line
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedGenre === genre.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default GenreMobile;
