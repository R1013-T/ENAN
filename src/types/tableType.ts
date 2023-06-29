export type User = {
  id: string;
  name: string;
  get_clues: string | null;
  get_people: string | null;
  get_stories: string | null;
  created_at: string;
  finished_at: string | null;
};

export type Story = {
  id: number;
  person_id: number;
  person: string;
  group: string;
  title: string;
  content: string;
};

export type Person = {
  id: number;
  name: string;
  post: string;
  detail: string;
  testimony_story_id: string;
  conversation_story_id: string;
};

export type Clue = {
  details: string;
  id: number;
  name: string;
  story_id: string;
};
