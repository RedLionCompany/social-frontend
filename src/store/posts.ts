import { create } from 'zustand';
import { api } from '../api/client';
import type { Paged, Post } from '../types';

type PostsState = {
  list: Paged<Post> | null;
  loading: boolean;
  load: (page?: number, size?: number) => Promise<void>;
  create: (message: string) => Promise<void>;
  like: (id: number) => Promise<void>;
};

export const usePosts = create<PostsState>((set, get) => ({
  list: null, loading: false,

  async load(page = 1, size = 10) {
    set({ loading: true });
    const { data } = await api.get<Paged<Post>>('/posts', { params: { page, size } });
    set({ list: data, loading: false });
  },

  async create(message) {
    await api.post('/posts', { message });
    await get().load();
  },

  async like(id) {
    await api.post(`/posts/${id}/like`);
    await get().load(get().list?.page ?? 1, get().list?.size ?? 10);
  },
}));
