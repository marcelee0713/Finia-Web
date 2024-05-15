if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("Environment variable NEXT_PUBLIC_API_URL must be defined");
}

const apiUrl: string = process.env.NEXT_PUBLIC_API_URL;

export default apiUrl;
