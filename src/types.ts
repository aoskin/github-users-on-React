export interface Users {
  items: User[];
}

export interface User {
  userCount: number | string;
  repos: number;
  reposList: [];
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  blog: string;
  repos_url: string;
  public_repos: number;
  company: string;
  followers: number;
  following: number;
}
