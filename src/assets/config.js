export const config = {
  apiEndpoint: 'https://gutendex.com/books/',
  sortEndpoint: 'https://gutendex.com/books/?sort=',
  searchEndpoint: 'https://gutendex.com/books/?search=',
  columns: [
    {
      header: 'Book ID',
      accessor: 'bookId'
    }, {
      header: 'Title',
      accessor: 'bookTitle'
    }, {
      header: 'Downloads',
      accessor: 'downloadCount'
    }, {
      header: 'Author',
      accessor: 'bookAuthor'
    }, {
      header: 'Actions',
      accessor: 'listActions'
    }
  ]
}