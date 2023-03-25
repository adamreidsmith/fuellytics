export type FormattedCar = {
  id: string;
  title: string;
  item: {
    id: number;
    make: string;
    model: string;
    displacement: number;
    year: number;
    isSupercharged: boolean;
    drag: number;
    imageUrl: string | null;
  };
};
