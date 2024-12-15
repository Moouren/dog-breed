import type { Ref } from "vue";
import type { Breed } from "~/types/breed";

export const useBreeds = () => {
  const breeds: Ref<Breed[]> = useState("breeds", () => []);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const fetchBreeds = async () => {
    if (breeds.value.length) return;

    try {
      isLoading.value = true;
      const { data: breedsData } = await useFetch<{ message: string[] }>(
        "https://dog.ceo/api/breeds/list"
      );

      if (breedsData.value?.message) {
        const breedsList = await Promise.all(
          breedsData.value.message.map(async (breedName) => {
            const { data: image } = await useFetch<{ message: string }>(
              `https://dog.ceo/api/breed/${breedName}/images/random`
            );
            return {
              name: breedName,
              image: image.value?.message || "",
            };
          })
        );
        breeds.value = breedsList;
      }
    } catch (e) {
      error.value = e instanceof Error ? e : new Error("Unknown error");
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
