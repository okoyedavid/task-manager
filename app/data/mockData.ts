import { Project, Category, User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    role: "admin",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    role: "member",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    role: "member",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar:
      "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    role: "member",
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Monicca - Saas Product",
    description: "Main SaaS product development",
    color: "#3B82F6",
    members: mockUsers,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "ERICA - CRM Web App",
    description: "Customer relationship management system",
    color: "#10B981",
    members: mockUsers.slice(0, 2),
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "3",
    name: "Monicca - Landing Page",
    description: "Marketing landing page",
    color: "#F59E0B",
    members: mockUsers.slice(1, 3),
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    name: "Portfolio Project",
    description: "Personal portfolio website",
    color: "#8B5CF6",
    members: [mockUsers[0]],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "5",
    name: "Sample - Social Media Project",
    description: "Social media management tool",
    color: "#EF4444",
    members: mockUsers.slice(2, 4),
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-20"),
  },
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "SaaS Product",
    color: "#3B82F6",
    projectCount: 2,
  },
  {
    id: "2",
    name: "Web Apps",
    color: "#10B981",
    projectCount: 3,
  },
  {
    id: "3",
    name: "Mobile Apps",
    color: "#F59E0B",
    projectCount: 1,
  },
];
