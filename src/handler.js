const {nanoid} = require('nanoid');
const bookshelf = require('./bookshelf');
const saveBookHandler = (request, h) => {
	const {
		name,
    	year,
    	author,
    	summary,
    	publisher,
    	pageCount,
    	readPage,
    	reading
	} = request.payload;
	if (name == "") {
    	const response = h.response(
		    {
		        "status": "fail",
		        "message": "Gagal menambahkan buku. Mohon isi nama buku"
		    }
    	);
    	response.code(400);
    	return response;
    }
    if (readPage > pageCount) {
    	const response = h.response(
		    {
		        "status": "fail",
		        "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
		    }
    	);
    	response.code(400);
    	return response;
    }
	const id = nanoid(16);
	const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;
    bookshelf.push({
    	id,
    	name,
    	year,
    	author,
    	summary,
    	publisher,
    	pageCount,
    	readPage,
    	finished,
    	reading,
    	insertedAt,
    	updatedAt
    });
    const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
    	const response = h.response(
		    {
		        "status": "success",
		        "message": "Buku berhasil ditambahkan",
		        "data": {
		            "bookId": id
		        }
		    }
    	);
    	response.code(201);
    	return response;
    }
    const response = h.response(
    {
        "status": "error",
        "message": "Buku gagal ditambahkan"
    }
    );
    response.code(500);
    return response;
};
const getAllBooksHandler = () => ({
	status: "success",
    data: {
        bookshelf,
    }
});
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = bookshelf.filter((b) => b.id === id)[0];
  if (book !== undefined) {
	return {
      status: 'success',
	  data: {
	    book,
	  },
	};
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
const editBookByIdHandler = (request, h) => {
	const { id } = request.params;
	const {
		name,
    	year,
    	author,
    	summary,
    	publisher,
    	pageCount,
    	readPage,
    	reading
	} = request.payload;
	if (name == "") {
    	const response = h.response(
		    {
		        "status": "fail",
		        "message": "Gagal memperbarui buku. Mohon isi nama buku"
		    }
    	);
    	response.code(400);
    	return response;
    }
    if (readPage > pageCount) {
    	const response = h.response(
		    {
		        "status": "fail",
		        "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
		    }
    	);
    	response.code(400);
    	return response;
    }
    const updatedAt = new Date().toISOString();
    const index = bookshelf.findIndex((book) => book.id === id);
    if (index !== -1) {
	    bookshelf[index] = {
	      ...bookshelf[index],
	      name,
	      year,
	      author,
	      summary,
	      publisher,
	      pageCount,
	      readPage,
	      reading,
	      updatedAt,
	    };
	    const response = h.response({
	      status: 'success',
	      message: 'Buku berhasil diperbarui',
	    });
	    response.code(200);
	    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = bookshelf.findIndex((book) => book.id === id);
  if (index !== -1) {
    bookshelf.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
	saveBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdHandler,
	deleteBookByIdHandler
};