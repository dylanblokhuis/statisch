export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string | null;
  updated_at: string | null;
  administrator: boolean;
}

export interface IDomain {
  updated_at?: string
  created_at?: string
  id: number
  name: string
  vhost: string
  www: string
  root: string
  build_command: string
  directory_name: string
  has_ssl: boolean
}

export interface IGitProviders {
  updated_at?: string
  created_at?: string
  id: number
  name: string
}
