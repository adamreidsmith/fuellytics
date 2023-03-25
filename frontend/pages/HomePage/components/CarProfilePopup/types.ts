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

export type CarProfileProps = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};
