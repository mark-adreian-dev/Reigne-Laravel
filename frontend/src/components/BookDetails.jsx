import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetails = () => {
  const [book, setBook] = useState();
  const { BookID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/books/${BookID}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setBook(response));
  }, [BookID]);

  if (!book) {
    return <h1>Loading...</h1>;
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/books/${id}`, { method: "DELETE"})
    .then(response => response.json())
    .then(response => {
        alert(`${response.message}`)
        window.location.href = '/'
    })
  }

  return (
    <section className="w-full px-6 pb-12 antialiased bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="container max-w-sm py-32 mx-auto mt-px text-left sm:max-w-md sm:px-4 md:max-w-none md:text-center">
              <h1 className="text-3xl font-bold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:text-4xl md:text-7xl lg:text-8xl">{book.title}</h1>
              <div className="mx-auto mt-5 text-gray-400 md:mt-8 md:max-w-lg md:text-center md:text-xl">{book.description}</div>
              <div className="mx-auto mt-5 text-gray-400 md:mt-8 md:max-w-lg md:text-center md:text-xl">{book.published_year} {book.genre} </div>
              <div className="flex flex-col items-center justify-center mt-8 space-y-4 text-center sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Link to={`/books/${book.id}/edit`}>
                    <span className="relative inline-flex w-full md:w-auto">
                        <p className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium leading-6 text-white bg-gray-900 border border-transparent rounded-full xl:px-10 md:w-auto hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            Edit
                        </p>
                    </span>
                  </Link>
                  <Link to={`/`}>
                    <span className="relative inline-flex w-full md:w-auto">
                        <p className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium leading-6 text-white bg-gray-900 border border-transparent rounded-full xl:px-10 md:w-auto hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            Homepage
                        </p>
                    </span>
                  </Link>
               
                    <span onClick={() => handleDelete(book.id)} className="relative inline-flex w-full md:w-auto">
                        <p className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-medium leading-6 text-white bg-red-600 border border-transparent rounded-full xl:px-10 md:w-auto hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            Delete
                        </p>
                    </span>
              </div>
          </div>
      </div>
    </section>
  )
    
    

}


export default BookDetails;
