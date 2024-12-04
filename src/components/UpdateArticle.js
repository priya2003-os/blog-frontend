import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UpdateArticle = () => {
    const URL = "http://localhost:3011";

    const [articleById, setArticleById] = useState([]);
    const [titleValueInput, setTitleValueInput] = useState();
    const [descriptionValueInput, setDescriptionValueInput] = useState();
    const [pictureValueInput, setPictureValueInput] = useState();
    const [authorValueInput, setAuthorValueInput] = useState();

    const retrievedId = useSelector((state) => state.updateId.value);
    console.log("RETRIEVEDID",retrievedId);

    useEffect(() => {
        fetch(`${URL}/articleById/${retrievedId}`, {
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            setArticleById(data.result);
            setTitleValueInput(data.result.title);
            setDescriptionValueInput(data.result.description);
            setPictureValueInput(data.result.picture);
            setAuthorValueInput(data.result.author);
        })
    }, []);

    console.log({articleById: articleById});
    const {
        register,
        handleSubmit,
        formState: { errors},
        reset
    } = useForm({
        mode: "onBlur",
    });
    console.log({titleValueInput});
    
    const handleSubmitUpdatedArticle = async (data) => {
        const res = await fetch(`${URL}/updateArticle/${retrievedId}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const dataFromBack = await res.json();
        console.log({dataFromBack});
        
        if(dataFromBack.result){
            reset();
            toast.success("Article successfully updated")
        } else {
            toast.error("Aticle not exist", {
                position: "top-right",
            })
        }
    };


    return(

        <>
        <div className="container-fluid">
            <form
                onSubmit={handleSubmit(handleSubmitUpdatedArticle)}
            >
                <div>
                    <h3>
                        Mettre à jour un article
                    </h3>
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Titre</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleFormControlInput1"
                    value={titleValueInput}
                    {...register("title", {
                        onChange:(e) => {
                            console.log(e.target.value);
                            setTitleValueInput(e.target.value);
                          }
    
                    })}
                    />
                    {errors.title && (
                    <span>
                    {errors.title.message}
                    </span>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea 
                    className="form-control"
                     id="exampleFormControlTextarea1" 
                     rows="3"
                     value={descriptionValueInput}
                     {...register("description", {
                        onChange:(e) => {
                            console.log(e.target.value);
                            setDescriptionValueInput(e.target.value);
                          }
                     })}
                     >
                     </textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Picture</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleFormControlInput1"
                    value={pictureValueInput}
                    {...register("picture", {
                        onChange:(e) => {
                            console.log(e.target.value);
                            setPictureValueInput(e.target.value);
                          }
                    })}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Nom de l'auteur</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleFormControlInput1"
                    value={authorValueInput}
                    {...register("author")}
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-auto">
                    <button className="btn btn-primary p-2 col-sm-15" type="submit">enregistrer</button>
                    </div>
                    <div className="col-auto">
                    <a href="/" className="btn btn-primary p-2 col-sm-15" type="submit">Annuler</a>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
};

export default UpdateArticle;