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
    ADD_CONTRIBUTOR: (projectId: string) =>
      `/projects/${projectId}/contributors`,
    REMOVE_CONTRIBUTOR: (projectId: string, userId: string) =>
      `/projects/${projectId}/contributors/${userId}`,
  },
  TASKS: {
    LIST: (projectId: string) => `/projects/${projectId}/tasks`,
    DETAIL: (projectId: string, taskId: string) =>
      `/projects/${projectId}/tasks/${taskId}`,
    GENERATE: (projectId: string) => `/projects/${projectId}/tasks/generate`,
  },
  COMMENTS: {
    LIST: (projectId: string, taskId: string) =>
      `/projects/${projectId}/tasks/${taskId}/comments`,
    CREATE: (projectId: string, taskId: string) =>
      `/projects/${projectId}/tasks/${taskId}/comments`,
    DETAIL: (projectId: string, taskId: string, commentId: string) =>
      `/projects/${projectId}/tasks/${taskId}/comments/${commentId}`,
  },
};
