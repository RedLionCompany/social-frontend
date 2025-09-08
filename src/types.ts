export type AuthResponse = { access_token: string };

export type UserProfile = {
  firstName: string; lastName: string; alias: string; email: string; birthDate: string;
};

export type Post = {
  id: number; message: string; createdAt: string;
  author: { alias: string };
  _count?: { likes: number }; // si devuelves conteo
};

export type Paged<T> = { items: T[]; total: number; page: number; size: number };
