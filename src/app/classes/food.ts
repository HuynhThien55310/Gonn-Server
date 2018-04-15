import { Ingredient } from './ingredient';
export interface Food {
  author: String;
  backdrop: string;
  body: String;
  comment: number;
  like: number;
  postedAt: Date;
  share: number;
  title: string;
  view: number;
  tags: {};
  ingredients: [Ingredient];
  id: String;
}
