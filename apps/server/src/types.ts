export interface Author {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  year: number;
  authorId: string;
}

export interface BookConnection {
  edges: BookEdge[];
  pageInfo: PageInfo;
}

export interface BookEdge {
  node: Book;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}
