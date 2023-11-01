import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command.tsx';
import { Check, ChevronsUpDown, Loader2, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { useState } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { CuratorReview } from '@/utils/interfaces.ts';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { FormControl } from '@/components/ui/form.tsx';
import { getFilmTitles } from '@/services/films.ts';
import { useQuery } from '@tanstack/react-query';

export const FilmComboBox = ({
  field,
  form,
}: {
  field: ControllerRenderProps<CuratorReview, 'filmId'>;
  form: UseFormReturn<CuratorReview, any, any>;
}) => {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['films', search],
    queryFn: () => getFilmTitles(search),
    staleTime: 1000,
  });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button variant="outline" role="combobox" className={cn('w-[300px] justify-between', !field.value && 'text-muted-foreground')}>
            {field.value ? data?.find(film => film.id == field.value)?.title || field.value : 'Select film'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search film..." onValueChange={value => setSearch(value)} />
          <CommandEmpty>
            <div className="w-full items-center justify-center flex flex-col">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                  <p>Loading...</p>
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-8 w-8" />
                  <p>No film found</p>
                </>
              )}
            </div>
          </CommandEmpty>
          <CommandGroup>
            {data?.map(film => (
              <CommandItem
                value={film.title}
                key={film.id}
                onSelect={() => {
                  form.setValue('filmId', film.id);
                  field.value = film.id;
                }}
              >
                <Check className={cn('mr-2 h-4 w-4', film.id == field.value ? 'opacity-100' : 'opacity-0')} />
                {film.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
