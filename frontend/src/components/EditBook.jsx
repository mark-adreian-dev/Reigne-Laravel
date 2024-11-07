import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EditBook = () => {
    const [book, setBook] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
    const { BookID } = useParams();

    const [formValues, setFormValues] = useState({
        title: '',
        author: '',
        published_year: '',
        genre: '',
        description: ''
      });

    useEffect(() => {
        fetch(`http://localhost:8000/api/books/${BookID}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((response) => {
            setBook(response)
            setFormValues({
                title: response.title,
                author: response.author,
                published_year: response.published_year,
                genre: response.genre,
                description: response.description
            })
            setIsLoaded(true)
        });
    }, [BookID]);
    
    if (!book) {
        return <h1>Loading...</h1>;
    }

    const handleTitleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
        ...formValues,
        [name]: value
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault() 

        for (const [value] of Object.entries(formValues)) {
            if (value == "") {
                alert("Do not leave any fields empty")
                return
            }
        }

        const payload = {
            BookId: BookID,
            title: formValues.title,
            author: formValues.author,
            published_year: Number(formValues.published_year),
            genre: formValues.genre,
            description: formValues.description
              
        }

        console.log(payload)

        fetch(`http://localhost:8000/api/books/${BookID}`, {
            method: "PUT", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),   
        })
        .then(response => response.json())
        .then(response => {
            alert(`Book Updated Successfully`)
            window.location.href = `/books/${BookID}`
        })
        .catch(err => console.log(err
        ))
    }

    return (
        <>
        <div className="w-screen h-screen flex justify-center items-center flex-col">
       
       <form className="w-[550px] p-7 bg-slate-200 drop-shadow-lg rounded-lg">
       <h1 className="text-black text-center font-bold text-5xl mb-16">Edit Book</h1>
           {
               Object.keys(formValues).map((item, index) => {
                   return <div key={index} className="mb-7">
                        <p className="font-bold">{Object.keys(formValues)[index].toUpperCase()}</p> 
                        <label  className="input input-bordered flex items-center mb-2">
                           <input type="text" name={item} onChange={handleTitleChange} className="grow ml-3" value={!isLoaded ? book[item]: formValues[item]} placeholder={`Enter book ${item}`}/>
                       </label>
                   </div>
                   
                  
               })
           }

           <button onClick={handleSubmit} className="w-full btn bg-black text-white mt-10">Edit Book</button>
           <Link className="w-full" to={"/"}>
               <button className="btn w-full mt-2 bg-transparent border-black">Homepage</button>
           </Link>
           
       </form>
       </div>  
        </>
    )
}

export default EditBook