const {
	saveHandler,
	showHandler,
	detailHandler,
	editHandler,
	deleteHandler
} = require('./handler');
const routes = [
  {
  	method: 'POST',
  	path: '/books',
  	handler: saveHandler
  },
  {
  	method: 'GET',
  	path: '/books',
  	handler: showHandler
  },
  {
  	method: 'GET',
  	path: '/books/{bookId}',
  	handler: detailHandler
  },
  {
  	method: 'PUT',
  	path: '/books/{bookId}',
  	handler: editHandler
  },
  {
  	method: 'DELETE',
  	path: '/books/{bookId}',
  	handler: deleteHandler
  },
];