export interface Card {
  id: string;
  title: string;
  description: string;
  list: {
    title: string,
    id: string
  }
}
