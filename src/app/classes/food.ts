export interface Food {
  author: String;
  backdrop: string;
  body: String;
  comments: number;
  like: number;
  postedAt: Date;
  share: number;
  title: string;
  view: number;
  tags: Object;
  ingredients: Array<Object>;
}
