export interface User {
    id: string;
    email: string;
    role: {
      type: string,
      default:'Admin'
    }
  }