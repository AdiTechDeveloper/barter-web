import { useState, useEffect } from "react";
import { itemService } from "../services/app";

export function useCatalog({ search, categoryId, condition } = {}) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalogData() {
      try {
        setLoading(true);
        const params = {};
        if (search) params.search = search;
        if (categoryId) params.category_id = categoryId;
        if (condition) params.condition = condition;

        const [{ items: fetchedItems }, fetchedCategories] = await Promise.all([
          itemService.getAll(params),
          itemService.getCategories(),
        ]);

        setItems(fetchedItems);
        setCategories(
          Array.isArray(fetchedCategories) ? fetchedCategories : ["All"],
        );
      } catch (error) {
        console.error("Failed to fetch catalog data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCatalogData();
  }, [search, categoryId, condition]);

  return { items, categories, loading };
}
