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
  tag: {};
  ingredients: Ingredient[];
  id: String;
  alias: string;
  ingreTag: {};
}
