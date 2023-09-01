if (!import.meta.env.VITE_SERVER) {
  throw new Error("missing VITE_SERVER in .env file");
}

export const server = import.meta.env.VITE_SERVER;
