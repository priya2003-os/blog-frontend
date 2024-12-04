import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddArticle = () => {
    const URL = "http://localhost:3011";
    const [articleData, setArticlesData] = useState([]);
    const user = useSelector(state => state.user.value);
    console.log("addArticle user----------->", user);
    const [InputValue, setInputValue] = useState('Valeur par défaut');

    const {
        register,
        handleSubmit,
        formState: { errors},
        reset
    } = useForm({
        mode: "onBlur",
    });

    const handleSubmitArticle = async (data) => {
        console.log("test------>", data);
        
        const res = await fetch(`${URL}/addArticle`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const dataFromBack = await res.json();
        console.log({dataFromBack});
        
        if(dataFromBack.result){
            reset();
            toast.success("Article successfully created")
        } else {
            toast.error("Aticle already exist", {
                position: "top-right",
            })
        }
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
      };

    return(

        <>
        <div class="container-fluid">
            <form
                onSubmit={handleSubmit(handleSubmitArticle)}
            >
                <div>
                    <h3>
                        Ajouter un article
                    </h3>
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Titre</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleFormControlInput1"
                    {...register("title", {
                        required:"Title is required"
                    })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea 
                    className="form-control"
                     id="exampleFormControlTextarea1" 
                     rows="3"
                     {...register("description", {
                        required:"Description is required"
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
                    {...register("picture", {
                        required:"Picture is required"
                    })}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Auteur</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="exampleFormControlInput1"
                    value={user.username}
                    onChange={handleChange}
                    {...register("author")}
                    />
                </div>
                <div class="row mb-3">
                    <div class="col-auto">
                    <button class="btn btn-primary p-2 col-sm-15" type="submit">enregistrer</button>
                    </div>
                    <div class="col-auto">
                    <a href="/" class="btn btn-primary p-2 col-sm-15" type="submit">Annuler</a>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
};

export default AddArticle;