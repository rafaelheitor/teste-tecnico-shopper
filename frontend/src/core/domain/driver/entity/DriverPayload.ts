export type Driver = {
  id: number;
  description: string;
  name: string;
  review: {
    rating: number;
    comment: string;
  };
  vehicle: string;
  value: number;
};
