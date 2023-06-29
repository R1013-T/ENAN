import { Clue, Person, Story, User } from "@/types/tableType";
import { create } from "zustand";

interface userState {
  user: User;
  updateUser: (payload: User) => void;
}

interface getStoriesState {
  getStories: Story[] | undefined;
  updateGetStories: (payload: Story[]) => void;
}

interface PeopleState {
  people: Person[] | undefined;
  updatePeople: (payload: Person[]) => void;
}

interface CluesState {
  clues: Clue[] | undefined;
  updateClues: (payload: Clue[]) => void;
}

export const useUserStore = create<userState>((set) => ({
  user: {
    id: "",
    name: "",
    get_people: "",
    get_clues: "",
    get_stories: "",
    created_at: "",
    finished_at: null,
  },
  updateUser: (payload) =>
    set({
      user: payload,
    }),
}));

export const useGetStoriesStore = create<getStoriesState>((set) => ({
  getStories: undefined,
  updateGetStories: (payload) =>
    set({
      getStories: payload,
    }),
}));

export const usePeopleStore = create<PeopleState>((set) => ({
  people: undefined,
  updatePeople: (payload) =>
    set({
      people: payload,
    }),
}));

export const useCluesStore = create<CluesState>((set) => ({
  clues: undefined,
  updateClues(payload) {
    set({
      clues: payload,
    });
  },
}));
