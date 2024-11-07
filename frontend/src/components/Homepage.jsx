import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



const Header = () => {
    const [books, setBookList] = useState();

    useEffect(() => {
        fetch("http://localhost:8000/api/books", {
            method: "GET"
        }) 
        .then(response => response.json())
        .then(response => {
            setBookList(response)
        })
    }, [])

    if (!books) {
        return <div> loading </div>;
    }

    const handleclick = (id) => {
        window.location.href = `/books/${id}/edit`
    }

    const handleAddBook = () => {
        window.location.href = '/books/add'
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
        <>
        <div className="p-10 flex justify-center  items-start">
            <div className="w-full flex justify-start items-start mb-16">
                <h1 className="w-11 font-bold text-7xl ">Book Management System</h1>
            </div>
            <div className=" w-full grid grid-cols-1 gap-4 ">
                <button type="button" onClick={handleAddBook} className="h-12 inline-flex items-center justify-center px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:shadow-outline focus:outline-none">
        Add Book
    </button>
            
                        {
                             books.map(book => {
                                return  <div  key={book.id} className="flex justify-between border rounded-lg shadow-sm p-7 bg-slate-200">
                                    <div>
                                        <a href="#_" className="block mb-3">
                                            <h5 className="text-xl font-bold leading-none tracking-tight text-neutral-900">{book.title}</h5>
                                        </a>
                                        <p className="mb-4 text-neutral-500">{book.description}</p>
                                        <Link to={`books/${book.id}`}>
                                            <button className="mr-2 inline-flex items-center justify-between w-auto h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90">
                                                <span>See More</span>
                                            </button>
                                        </Link>
                                        <button  onClick={() => handleclick(book.id)} className="inline-flex items-center justify-between w-auto h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90">
                                            <span>Edit</span>
                                        </button>
                                    </div>
                                    
                                    <button onClick={() => handleDelete(book.id)} className="inline-flex items-center justify-between w-auto h-10 px-4 py-2 text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-red-600 hover:bg-neutral-950/90">
                                        <span>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                    </button>
                                </div>
                         
                            }) 
                        }
                       
                    
              
            </div>
            
            {/* <div className="w-full grid grid-cols-3 gap-y-6">
            
                {
                    books.data.map(book => {
                        return <div key={book.id} className="card bg-base-300 w-[96%] shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{book.title}</h2>
                                    <p className="text-left mb-11">{book.description}</p>
                                    <div className="card-actions justify-start">
                                        <button onClick={() => handleclick(book.id)} className="btn btn-warning text-black mr-2">Edit</button>
                                        <button onClick={() => handleDelete(book.id)} className="btn btn-error text-white mr-2">Delete</button>
                                        <Link to={`books/${book.id}`}>
                                            <button className="btn btn-success text-white">See More</button>
                                        </Link>
                                    </div>
                                </div>
                            </div> 
                    })
                }
            </div> */}
        </div>
        </>
    )
}

export default Header
