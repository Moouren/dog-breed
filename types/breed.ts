export interface Breed {
  name: string;
  image: string;
}

export interface DogApiResponse {
  message: Record<string, string[]>;
  status: string;
}

export interface DogImageResponse {
  message: string;
  status: string;
}

export interface ErrorType {
  message: string;
}
