export interface Todo {
  id: string;
  created: string;
  text: string;
  completed: boolean;
}

export interface IClass {
  id: string;
  grade: { name: string };
  type: { name: string };
  createdAt: string;
  updateAt: string;
}