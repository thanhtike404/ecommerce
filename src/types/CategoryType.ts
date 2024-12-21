export type CategoryTableProps = {
  categories: Array<{
    id: string;
    name: string;
    iconUrl: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type Category = {
  id: string;
  name: string;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
};
