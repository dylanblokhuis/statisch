export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
  administrator: boolean;
}
