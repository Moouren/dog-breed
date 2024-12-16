import type {
  Breed,
  DogApiResponse,
  DogImageResponse,
  ErrorType,
} from "~/types/breed";

export const useBreeds = () => {
  const breeds = useState<Breed[]>("breeds", () => []);
  const isLoading = useState<boolean>("breeds-loading", () => true);
  const error = useState<ErrorType | null>("breeds-error", () => null);

  const fetchBreeds = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch<DogApiResponse>(
        "https://dog.ceo/api/breeds/list/all"
      );

      if (response.message) {
        const breedNames = Object.keys(response.message);
        const initialBreeds = await Promise.all(
          breedNames.map(async (breedName): Promise<Breed> => {
            const imageResponse = await $fetch<DogImageResponse>(
              `https://dog.ceo/api/breed/${breedName}/images/random`
            );
            return {
              name: breedName,
              image: imageResponse.message,
            };
          })
        );
        breeds.value = initialBreeds;
        error.value = null;
      }
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Failed to fetch breeds";
      error.value = { message: errorMessage };
    } finally {
      isLoading.value = false;
    }
  };

  return {
    breeds,
    isLoading,
    error,
    fetchBreeds,
  };
};
