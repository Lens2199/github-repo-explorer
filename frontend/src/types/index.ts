// This describes what a GitHub repo looks like
export interface Repo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
  owner: {
    login: string
    avatar_url: string
  }
}

// This describes what a User looks like
export interface User {
  id: string
  email: string
  token: string
}

// This describes a saved favorite repo
export interface Favorite {
  id: string
  repoId: number
  name: string
  html_url: string
}