import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/user";
import { useEffect } from "react";
import Link from "next/link";



const Headers = () => {
  const URL = "http://localhost:3011";

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  useEffect(()=> {
    console.log("NoUVEAU USER =>",user);
    
  },[user])

  const handleLogout = async () => {
    const res = await fetch(`${URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    
   const result = await res.json();
    dispatch(logout());
  };

  let logSection;
  if (user.isConnected) {
    logSection = (
        <p>
            <span style={{color:"white"}}>
                Welcome {user.username} / <button onClick={handleLogout}>Logout</button>
            </span>
        </p>
    )
  } else {
    logSection = (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <a href="/login" className="btn btn-primary" role="button" data-bs-toggle="button">Sign in</a>        
            <a href="/signup" className="btn btn-outline-warning" role="button" data-bs-toggle="button">Sign up</a> 
        </div>       
    )
  }

  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <div>
          <Link href="/" className="navbar-brand">Accueil</Link>
          <div className="row row-cols-1 row-cols-md-2 g-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/addArticle">Ajouter</Link>
          <Link href="/updateArticle">Modifier</Link>
          </div>
        </div>
        {logSection}
      </div>
    </nav>
  );
};

export default Headers;
