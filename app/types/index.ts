export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "member";
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  members: User[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "in-review" | "completed";
  priority: "low" | "medium" | "high";
  assignees: User[];
  dueDate?: string;
  projectId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  progress?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  projectCount: number;
}

export type Theme = "light" | "dark";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  name?: string;

  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date?: string;
  release_date: string; // ISO format YYYY-MM-DD
  title: string;
  video: boolean;
  status: "watched" | "to-watch" | "rewatch";
  vote_average: number;
  vote_count: number;
  userRating?: number | string | undefined;
  notes?: string;
  dateWatched?: Date | undefined;
};

export interface ShoppingItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  priority: "low" | "medium" | "high";
  status: "wishlist" | "planned" | "purchased";
  url?: string;
  image?: string;
  dateAdded: Date;
  datePurchased?: Date;
  notes?: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: Date;
  description?: string;
  recurring?: boolean;
  recurringPeriod?: "weekly" | "monthly" | "yearly";
}

export interface ExpenseCategory {
  id: string;
  name: string;
  color: string;
  type: "income" | "expense" | "both";
}
