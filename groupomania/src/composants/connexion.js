import logo from "../assets/logo.svg";
import background_image from "../assets/corporarte-banner.jpg";
import "../styles/connexion_panel.css";
import {useEffect , useState} from "react"
import {useNavigate } from "react-router";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Connexion_Panel() {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
      if(rendered){

        const preloadMail = localStorage.getItem("email")
        if(preloadMail === undefined || preloadMail === null || preloadMail === "" ){
          document.getElementById("inputEmail").value = "";

        }else{
          document.getElementById("inputEmail").value = `${preloadMail}`;
        }
      }else if( !rendered ) {
          setRendered(true);
      }

      
  },[rendered]);


  const navigate = useNavigate(); 



  function PostedData(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target["email"].value,
        password: e.target["password"].value,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          succeslogin(e.target["email"].value);
          return res.json();
        }
        errorlogin();
        
      })
      .then(function (value) {
        localStorage.setItem ("token", value.token)
        localStorage.setItem ("userid", value.userId)
      });
  }

  function Redirectregister() {
    navigate("/register");
  }


  const succeslogin = (email) => {
    toast.success(`Connexion réussi sur le compte ${email}`, {
      className : "connexionNotify",
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss : false,
      zindex : 9999,
      })
      document.getElementById("loginButton").setAttribute("disabled", "");
      document.getElementById("loginButton").classList.add("disabled");
      document.getElementById("registerButton").setAttribute("disabled", "");
      document.getElementById("registerButton").classList.add("disabled");
      setTimeout(function () {
        document.getElementById("loginButton").removeAttribute("disabled", "");
        document.getElementById("loginButton").classList.remove("disabled");
        document.getElementById("registerButton").removeAttribute("disabled", "");
        document.getElementById("registerButton").classList.remove("disabled");
        localStorage.setItem("isLoggedIn" , true);
        navigate("/accueil");
      }, 1000);
     
  }
  
  
  const errorlogin = () => {
    toast.error('Identifiant ou mot de passe incorrect  !', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      zindex : 9999,
      })
      document.getElementById("loginButton").setAttribute("disabled", "");
      document.getElementById("loginButton").classList.add("disabled");
      document.getElementById("registerButton").setAttribute("disabled", "");
      document.getElementById("registerButton").classList.add("disabled");
      setTimeout(function () {
        document.getElementById("loginButton").removeAttribute("disabled", "");
        document.getElementById("loginButton").classList.remove("disabled");
        document.getElementById("registerButton").removeAttribute("disabled", "");
        document.getElementById("registerButton").classList.remove("disabled");
      }, 4000);
  }

   


  return (
    <div className="div_corps">
      <img className="background_image" src={background_image} alt="" />
      <div className="gpm_logo_div">
        <img src={logo} alt="Logo Groupomania" className="gpm-logo" />
      </div>
      <form className="connexion_form" onSubmit={PostedData}>
        <input
          id="inputEmail"
          name="email"
          type="email"
          placeholder="Adresse e-mail"
          autoComplete="email"
          required
        ></input>
        <input
          id="inputPassword"
          name="password"
          type="password"
          placeholder="Mot de passe"
          autoComplete="current-password"
          required
        ></input>
        <button
          id="loginButton"
          name="login_button"
          className="login_button"
          type="submit"
        >
          Connexion
        </button>
        <button
          id="registerButton"
          name="register_button"
          className="register_button"
          onClick={Redirectregister}
        >
          Créer un nouveau Compte
        </button>
      </form>
      <div id="notification_panel_login" className="notification_panel_login">
        <p id="notification_text_login"></p>
      </div>
    </div>
  );
}

export default Connexion_Panel;
