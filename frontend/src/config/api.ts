export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
    PASSWORD: "/auth/password",
  },
  USERS: {
    BASE: "/users",
    SEARCH: "/users/search",
    DETAIL: (id: string) => `/users/${id}`,
  },
  PROJECTS: {
    BASE: "/projects",
    DETAIL: (projectId: string) => `/projects/${projectId}`,
  },
  TASKS: {
    LIST: (projectId: string) => `/projects/${projectId}/tasks`,
    DETAIL: (projectId: string, taskId: string) =>
      `/projects/${projectId}/tasks/${taskId}`,
  },
  COMMENTS: {
    LIST: (projectId: string, taskId: string) =>
      `/projects/${projectId}/tasks/${taskId}/comments`,
    DETAIL: (projectId: string, taskId: string, commentId: string) =>
      `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
  },
};
