const BASE_URL = "https://openlibrary.org";

// Open Library API Service
// digunakan untuk fetch data buku trending, detail, dan search

export async function getTrendingBooks() {
  const response = await fetch(`${BASE_URL}/trending/daily.json`);

  if (!response.ok) {
    throw new Error("Gagal memuat buku trending");
  }

  const data = await response.json();
  return data.works || [];
}

export async function getBookDetail(workKey) {
  const cleanKey = workKey.replace("/works/", "");
  const response = await fetch(`${BASE_URL}/works/${cleanKey}.json`);

  if (!response.ok) {
    throw new Error("Gagal memuat detail buku");
  }

  return await response.json();
}

export async function searchBooks(keyword) {
  const response = await fetch(
    `${BASE_URL}/search.json?q=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error("Gagal mencari buku");
  }

  const data = await response.json();
  return data.docs || [];
}

export function getCoverUrl(coverId) {
  if (!coverId) {
    return null;
  }

  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}