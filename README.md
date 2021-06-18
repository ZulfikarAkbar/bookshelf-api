# **Submission Bookshelf API**
## Kriteria 1 : API dapat menyimpan buku
\
1. API harus dapat menyimpan buku melalui route: <br/>
    Method : POST <br/>
    URL : /books <br/>
    Body Request: <br/>
```javascript
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
    }
```
\
2. Objek buku yang disimpan pada server harus memiliki struktur seperti contoh di bawah ini: <br/> 
```javascript
    {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "year": 2010,
        "author": "John Doe",
        "summary": "Lorem ipsum dolor sit amet",
        "publisher": "Dicoding Indonesia",
        "pageCount": 100,
        "readPage": 25,
        "finished": false,
        "reading": false,
        "insertedAt": "2021-03-04T09:11:44.598Z",
        "updatedAt": "2021-03-04T09:11:44.598Z"
    }
```
\
3. Properti yang ditebalkan diolah dan didapatkan di sisi server. Berikut penjelasannya:
<br/><br/>
    id : nilai id haruslah unik. Untuk membuat nilai unik, Anda bisa memanfaatkan nanoid.
<br/><br/>
    finished : merupakan properti boolean yang menjelaskan apakah buku telah selesai dibaca atau belum. Nilai finished didapatkan dari observasi pageCount === readPage.
<br/><br/>
    insertedAt : merupakan properti yang menampung tanggal dimasukkannya buku. Anda bisa gunakan new Date().toISOString() untuk menghasilkan nilainya.
<br/><br/>
    updatedAt : merupakan properti yang menampung tanggal diperbarui buku. Ketika buku baru dimasukkan, berikan nilai properti ini sama dengan insertedAt.
<br/><br/>
4. Server harus merespons gagal bila:\
    - Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan: <br/>
        Status Code : 400 <br/>
        Response Body: <br/>
```javascript
        {
	   "status": "fail",
	   "message": "Gagal menambahkan buku. Mohon isi nama buku"
    	}
```
\
    - Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan: <br/>
    	Status Code : 400 <br/>
	Response Body: <br/>
```javascript
	{
	  "status": "fail",
	  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    	}
```
\
    - Server gagal memasukkan buku karena alasan umum (generic error). Bila hal ini terjadi, maka server akan merespons dengan: <br/>
    	Status Code : 500 <br/>
    	Response Body: <br/>
```javascript
    	{
           "status": "error",
           "message": "Buku gagal ditambahkan"
    	}
```
\
5. Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan: \
    Status Code : 201 <br/>
    Response Body: <br/>
```javascript
    {
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "bookId": "1L7ZtDUFeGs7VlEt"
        }
    }
```
\
## Kriteria 2 : API dapat menampilkan seluruh buku
1. API  harus dapat menampilkan seluruh buku yang disimpan melalui route: <br/>
    Method : GET <br/>
    URL: /books
<br/><br/>
2. Server harus mengembalikan respons dengan: <br/>
    Status Code : 200 <br/>
    Response Body: <br/>
```javascript
    {
       "status": "success",
       "data": {
          "books": [
           {
             "id": "Qbax5Oy7L8WKf74l",
             "name": "Buku A",
             "publisher": "Dicoding Indonesia"
           },
                
         ]
      }
   }
```
\
3. Jika belum terdapat buku yang dimasukkan, server bisa merespons dengan array books kosong. <br/>
```javascript
    {
      "status": "success",
      "data": {
          "books": []
      }
    }
```
\
## Kriteria 3 : API dapat menampilkan detail buku
1. API  harus dapat menampilkan seluruh buku yang disimpan melalui route: <br/>
    Method : GET <br/>
    URL: /books/{bookId} 
<br/><br/>
2. Bila buku dengan id yang dilampirkan oleh client tidak ditemukan, maka server harus mengembalikan respons dengan: <br/>
    Status Code : 404 <br/>
    Response Body: <br/>
```javascript
    {
      "status": "fail",
      "message": "Buku tidak ditemukan"
    }
```
\
3. Bila buku dengan id yang dilampirkan ditemukan, maka server harus mengembalikan respons dengan: <br/>
    Status Code : 200 <br/>
    Response Body: <br/>
```javascript
    {
      "status": "success",
      "data": {
         "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
         }
       }
    }
```
\
## Kriteria 4 : API dapat mengubah data buku
1. API yang Anda buat harus dapat mengubah data buku berdasarkan id melalui route: <br/>
    Method : PUT <br/>
    URL : /books/{bookId} <br/>
    Body Request: <br/>
```javascript
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
```
\
2. Server harus merespons gagal bila:<br/>
    Client tidak melampirkan properti name pada request body. Bila hal ini terjadi, maka server akan merespons dengan: <br/>
    Status Code : 400 <br/>
    Response Body: <br/>
```javascript
    {
        "status": "fail",
        "message": "Gagal memperbarui buku. Mohon isi nama buku"
    }
 ```
\
3. Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan: <br/>
    Status Code : 400 <br/>
    Response Body: <br/>
```javascript
    {
        "status": "fail",
        "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    }
```
\
4. Id yang dilampirkan oleh client tidak ditemukkan oleh server. Bila hal ini terjadi, maka server akan merespons dengan: &nbsp;
    Status Code : 404 <br/>
    Response Body: <br/>
```javascript
    {
        "status": "fail",
        "message": "Gagal memperbarui buku. Id tidak ditemukan"
    }
```
\
5. Bila buku berhasil diperbarui, server harus mengembalikan respons dengan: <br/>
    Status Code : 200 <br/>
    Response Body: <br/>
```javascript
    {
        "status": "success",
        "message": "Buku berhasil diperbarui"
    }
```
\
## Kriteria 5 : API dapat menghapus buku
1. API yang Anda buat harus dapat menghapus buku berdasarkan id melalui route berikut: <br/>
    Method : DELETE <br/>
    URL: /books/{bookId} <br/>
<br/><br/>
2. Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka server harus mengembalikan respons berikut: <br/>
    Status Code : 404 <br/> 
    Response Body: <br/>
```javascript
    {
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    }
```
\
3. Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan server mengembalikan respons berikut: <br/>
    Status Code : 200 <br/>
    Response Body: <br/>
```javascript
    {
        "status": "success",
        "message": "Buku berhasil dihapus"
    }
```
\

