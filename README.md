# BookShelf - Katalog Buku

Nama: Chalieta Gabriella Tangkau  
NIM: 2410501012  
Tema: Tema C - BookShelf Katalog Buku

## Deskripsi

BookShelf adalah aplikasi katalog buku berbasis React Native dan Expo. Aplikasi ini menggunakan Open Library API untuk menampilkan daftar buku trending, detail buku, pencarian buku, dan daftar buku favorit.

## Fitur

1. HomeScreen  
   Menampilkan daftar buku trending dari Open Library API.

2. DetailScreen  
   Menampilkan detail buku:
   - Judul
   - Author
   - Tahun terbit pertama
   - Jumlah edisi
   - Subject
   - Deskripsi

3. FavoritesScreen  
   Menampilkan buku yang ditambahkan ke favorit.

4. SearchScreen  
   Mencari buku berdasarkan judul atau penulis dengan validasi:
   - Tidak boleh kosong
   - Minimal 3 karakter

5. AboutScreen  
   Menampilkan nama, NIM, tema aplikasi, API yang digunakan, dan foto profil.

## Tech Stack

- React Native
- Expo
- JavaScript
- React Navigation
- Native Stack Navigator
- Bottom Tab Navigator
- Context API
- useReducer
- Fetch API
- Open Library API

## API

- Trending Books: https://openlibrary.org/trending/daily.json
- Detail Book: https://openlibrary.org/works/{id}.json
- Search Book: https://openlibrary.org/search.json?q={keyword}

## Cara Install

```bash
npm install