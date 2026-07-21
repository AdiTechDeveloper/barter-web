const STORAGE_BASE_URL = `${import.meta.env.VITE_IMG_URL}/storage`;

export function resolveStorageUrl(path) {
  if (!path || path === "null" || path === "") return null;
  const cleanPath = path.replace(/^\/?(storage\/)?/, "");
  return `${STORAGE_BASE_URL}/${cleanPath}`;
}

export function resolveItemImage(imagesArray) {
  const fallback = "https://placehold.co/300x300/F6F7F4/6E7D75?text=No+Image";
  if (!imagesArray || !Array.isArray(imagesArray) || imagesArray.length === 0)
    return fallback;
  const imagePath = imagesArray[0]?.image_path;
  if (!imagePath) return fallback;
  return resolveStorageUrl(imagePath) || fallback;
}

export function resolveUserAvatar(user) {
  if (!user) return null;
  return (
    resolveStorageUrl(user.profile_photo) || resolveStorageUrl(user.avatar)
  );
}

export function resolveCategoryImage(imagePath) {
  const fallback = "https://placehold.co/200x200/F6F7F4/6E7D75?text=No+Image";
  return resolveStorageUrl(imagePath) || fallback;
}
