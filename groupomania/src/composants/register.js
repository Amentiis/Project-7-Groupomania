import logo from "../assets/logo.svg";
import "../styles/register_panel.css";
import { useNavigate } from "react-router-dom";
import {useEffect , useState} from "react"
import { toast } from 'react-toastify';
import background_image from "../assets/corporarte-banner.jpg";

function Register_Panel() {

  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if(rendered){

     
    }else if( !rendered ) {
        setRendered(true);
    }
},[rendered]);

const navigate = useNavigate();
// if (!sessionStorage.getItem('isLoggedIn') === false || sessionStorage.getItem('isLoggedIn') === null ){
//   navigate("/accueil");
// }
  const messageErrorInvalidMail = `L'email rempli ne respecte pas le format obligatoire`;
  const messageErrorMail = `Problème à la création du compte, cela peut venir d'un compte déjà existant ou d'un problème serveur `;
 
  const succesnotify = (email) => toast.success(`Votre compte ${email} a bien été créé` ,{
    position: "bottom-right",
    className : 'succes_register_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const errornotify = (messagenotif) => toast.error(`${messagenotif}`, {
      className : 'error_register_notify',
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      zindex : 9999,
      });

  

  function Redirectlogin() {
    navigate("/login");
  }


  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setMessage("L'adresse email semble correct");
    } else {
      if (
        event.target.value === "" ||
        event.target.value === null ||
        event.target.value === undefined
      ) {
        setIsValid(false);
        setMessage("");
      } else {
        setIsValid(false);
        setMessage("L'adresse email est incorrect");
      }
    }
  };


  
  return (
    <div className="div_corps">
      <img className="background_image" src={background_image} alt="" />
      <div className="gpm_logo_div">
        <img src={logo} alt="Logo Groupomania" className="gpm-logo" />
      </div>

      <form className="register_form" onSubmit={PostedDataRegister}>
       
        <div className="informationRow">
          
        <input
          id="inputLastName"
          className="inputLastName"
          name="lastname"
          type="lastname"
          placeholder="Nom"
          required
        ></input>
        <input
          id="inputFirstname"
          className="inputFirstname"
          name="firstname"
          type="firstname"
          placeholder="Prenom"
          required
        ></input>
         <div
          className={`message ${isValid ? "message_succes " : "message_error"}`}
        >
          {message}
        </div>
        </div>
        <input
          id="inputEmail"
          name="email"
          type="email"
          placeholder="Adresse e-mail"
          onChange={validateEmail}
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
          id="registerButton"
          name="register_button"
          className="register_button"
          type="submit"
        >
          Créer un Compte
        </button>
        <button
          id="loginButton"
          name="login_button"
          className="login_button"
          onClick={Redirectlogin}
        >
          Vous avez déjà un compte cliquez-ici
        </button>
      </form>
      <div id="notification_panel" className="notification_panel_register">
        <p id="notification_text"></p>
      </div>
    </div>
  );

  function showNotification(email) {
    document.getElementById("loginButton").setAttribute("disabled", "");
    document.getElementById("loginButton").classList.add("disabled");
    document.getElementById("registerButton").setAttribute("disabled", "");
    document.getElementById("registerButton").classList.add("disabled");
    succesnotify(email);

    setTimeout(function () {
      document.getElementById("loginButton").removeAttribute("disabled", "");
      document.getElementById("loginButton").classList.remove("disabled");
      document.getElementById("registerButton").removeAttribute("disabled", "");
      document.getElementById("registerButton").classList.remove("disabled");
      sessionStorage.setItem("email", email );
      Redirectlogin();
    }, 2000);
  }

  function showNotificationError(messagenotif) {
    document.getElementById("loginButton").setAttribute("disabled", "");
    document.getElementById("loginButton").classList.add("disabled");
    document.getElementById("registerButton").setAttribute("disabled", "");
    document.getElementById("registerButton").classList.add("disabled");
    errornotify(messagenotif);
    setTimeout(function () {
      document.getElementById("loginButton").removeAttribute("disabled", "");
      document.getElementById("loginButton").classList.remove("disabled");
      document.getElementById("registerButton").removeAttribute("disabled", "");
      document.getElementById("registerButton").classList.remove("disabled");
    }, 5000);
  }




  function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

  function PostedDataRegister(e) {
    e.preventDefault();
    if (isValid) {
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastname: capitalizeFirstLetter(e.target["lastname"].value),
          firstname: capitalizeFirstLetter(e.target["firstname"].value),
          email: e.target["email"].value,
          password: e.target["password"].value,
        }),
      })
        .then(function (res) {
          if (res.ok) {
            showNotification(e.target["email"].value);
            return res.json();
          }
          showNotificationError(messageErrorMail);
        })
        .then(function (value) {});
    } else {
      showNotificationError(messageErrorInvalidMail);
    }
  }
}
export default Register_Panel;
