import "../styles/home_panel.css";
import "../styles/all.min.css";
import { useEffect, useState, useCallback} from "react";
import ReactDOM from 'react-dom/client'
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import defaultProfilPicture from "../assets/profiluser.png"
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import openTrash from "../assets/trash-solid-open.svg"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartsolid } from '@fortawesome/free-solid-svg-icons';
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home_Panel() {
  const [rendered, setRendered] = useState(false);
  const [lastname, setlastname] = useState("");
  const [firstname, setfirstname] = useState("");
  const [isAdministrator, setisAdministrator] = useState(false);

  const [profile_picture, setprofile_picture] = useState("");
  const [DarkModeOn, setDarkModeOn] = useState(localStorage.getItem('darkModeOn'));
  const [postId, setpostId] = useState("");

  var [commentshow, setcommentshow] = useState("");


  //Si l'utilisateur a activé le mode sombre il s'active au chargement de la page
  function showDarkMode(){
    if(localStorage.getItem('darkModeOn') === 'true'){
      EnableDarkMode();
    }
  }

  //Si l'utilisateur a activé le mode sombre il s'active au chargement de la page
  function EnableDarkMode() {
    document.getElementById("enabledarkmod").checked = true;
    document.getElementById('panel_profil_block').classList.add('darkmode');
    document.getElementsByClassName('container_change_personalinformation')[0].classList.add('darkmode');
    document.getElementsByClassName('container_change_password')[0].classList.add('darkmode');
    document.getElementsByClassName('menu')[0].classList.add('input_darkmode');
    document.getElementsByClassName('right')[0].classList.add('input_darkmode');
    document.querySelectorAll(`input[type='file']`).forEach(element => element.classList.add('input_darkmode'));
    document.querySelectorAll(`input[type='text']`).forEach(element => element.classList.add('input_darkmode_text'));
    document.querySelectorAll(`input[type='password']`).forEach(element => element.classList.add('input_darkmode_text'));
    document.getElementsByClassName('input_file_icon_container')[0].classList.add('input_darkmode');
    document.getElementsByClassName('button_apply')[0].classList.add('button_darkmode');
    document.getElementsByClassName('button_apply_password')[0].classList.add('button_darkmode');
    //document.querySelectorAll('span').forEach(element => element.classList.add('span_darkmode'));

    document.getElementById('container_panel_post').classList.add('darkmode_post');
    document.getElementById('container_panel_modify').classList.add('darkmode_modify');
    document.getElementById('container_panel_commentary').classList.add('darkmode_comment');


        // document.getElementsByClassName('body_home')[0].classList.add('body_home_darkmode');
       // document.querySelectorAll(`.article_container`).forEach(element => element.classList.add('darkmode_article'));
  }

  //Action sur le bouton permettant d'activer ou de désactivé le mode sombre
  function darkmodtoggle() {
    if(localStorage.getItem('darkModeOn') === 'true'){
      localStorage.setItem('darkModeOn',false)
      setDarkModeOn('false');
    }
    else{
      localStorage.setItem('darkModeOn',true)
      setDarkModeOn('true');
    }
    
    document.getElementById('panel_profil_block').classList.toggle('darkmode');
    document.getElementsByClassName('container_change_personalinformation')[0].classList.toggle('darkmode');
    document.getElementsByClassName('container_change_password')[0].classList.toggle('darkmode');
    document.getElementsByClassName('menu')[0].classList.toggle('input_darkmode');
    document.getElementsByClassName('right')[0].classList.toggle('input_darkmode');
    document.querySelectorAll(`input[type='file']`).forEach(element => element.classList.toggle('input_darkmode'));
    document.querySelectorAll(`input[type='text']`).forEach(element => element.classList.toggle('input_darkmode_text'));
    document.querySelectorAll(`input[type='password']`).forEach(element => element.classList.toggle('input_darkmode_text'));
    document.getElementsByClassName('input_file_icon_container')[0].classList.toggle('input_darkmode');
    document.getElementsByClassName('button_apply')[0].classList.toggle('button_darkmode');
    document.getElementsByClassName('button_apply_password')[0].classList.toggle('button_darkmode');
    document.getElementById('container_panel_post').classList.toggle('darkmode_post');
    document.getElementById('container_panel_modify').classList.toggle('darkmode_modify');
    document.getElementById('container_panel_commentary').classList.toggle('darkmode_comment');

    if((document.querySelectorAll(`.article_container`).length) !== 0){
      document.querySelectorAll(`.article_container`).forEach(element => element.classList.add('darkmode_article'));
      document.querySelectorAll(`.article_container`).forEach(element => element.classList.remove('article_container'));
    }else{
      document.querySelectorAll(`.darkmode_article`).forEach(element => element.classList.add('article_container'))
      document.querySelectorAll(`.darkmode_article`).forEach(element => element.classList.remove('darkmode_article'))
    }

    if((document.querySelectorAll(`.body_home`).length) !== 0){
      document.getElementsByClassName('body_home')[0].classList.add('body_home_darkmode');
      document.getElementsByClassName('body_home')[0].classList.remove('body_home');
    }else{
      document.getElementsByClassName('body_home_darkmode')[0].classList.add('body_home');
      document.getElementsByClassName('body_home')[0].classList.remove('body_home_darkmode');
    }

    if(document.getElementsByClassName('header')[0]){
      document.getElementsByClassName('header')[0].classList.add('header_darkmode')
      document.getElementsByClassName('header_darkmode')[0].classList.remove('header');

    }else{
      document.getElementsByClassName('header_darkmode')[0].classList.add('header');
      document.getElementsByClassName('header')[0].classList.remove('header_darkmode');

    }
    
    if(document.getElementsByClassName('first_header')[0]){
      document.getElementsByClassName('first_header')[0].classList.add('first_header_darkmode');
      document.getElementsByClassName('first_header_darkmode')[0].classList.remove('first_header');
    }else{
      document.getElementsByClassName('first_header_darkmode')[0].classList.add('first_header');
      document.getElementsByClassName('first_header')[0].classList.remove('first_header_darkmode');

    }
  }

  //Notification de succès pour la publication d'un poste
  const succesnotify = () => toast.success('Article posté !', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification de succès pour la suppression d'un poste  
  const succesnotifydelete = () => toast.success('Article supprimé !', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification de succès pour la modification d'un poste  
  const succesnotifymodify = () => toast.success('Article modifié !', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification de succès pour la publication d'un commentaire
  const succesnotifyCommentary = () => toast.success('Commentaire posté !', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });  

   //Notification de succès pour la suppression d'un commentaire  
  const succesnotifyCommentarydelete = () => toast.success('Commentaire supprimé !', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification de succès pour la modification de l'image de profil 
  const succesnotifymodifyprofil = () => toast.success('Modification photo de profil effectué !', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification du non support de format de fichier
  const Formatnotsupport= (format) => toast.error(`Format .${format} non supporté` , {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });  

  //Notification de succès pour la modification de mot de passe 
  const succesnotifymodifypassword = () => toast.success('Mot de passe modifié , déconnexion', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification de d'erreur de mot de passe
  const errornotifymodifypassword = () => toast.error('Mot de passe incorrect!', {
    position: "bottom-right",
    className : 'succes_notify',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  //Notification d'erreur
  const errornotify = () => toast.error('Une erreur est survenu !', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    zindex : 9999,
  });

  //Notification d'erreur de modification
  const errornotifymodify = () => toast.error('Erreur modification !', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    zindex : 9999,
  });

  //Notification d'erreur de suppression
  const errornotifydelete = () => toast.error('Erreur suppresion !', {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    zindex : 9999,
  });

  //Quand l'utilisateur appuie sur echap cela ferme les panels ouvert
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  },);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      hidepanelpost();
      hidepanelCommentary();
      hidepanelModify();
      showOptionPanel_commentary()
      showOptionPanel();
      hidepanelProfil();
    }
  }, []);

  //Récupération de tous les posts et affichage sur la page
  useEffect(() => {
    localStorage.removeItem("email");
    const userid = localStorage.getItem("userid");
    if (!rendered) {
      fetch("http://localhost:3000/api/auth/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: userid,
        }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }else if(res.status === 401){
            returntologinpage();
          }
        })
        .then(function (value) {
          setlastname(value.lastname);
          setfirstname(value.firstname);
          if (value.iconurl){
            setprofile_picture(value.iconurl);
          }else{
            setprofile_picture(defaultProfilPicture)
          }
          setisAdministrator(value.isAdministrator)
          refreshPostInPage(value.isAdministrator);
          if(!localStorage.getItem('notifyOff') === true){
            if(lastname && firstname){
              localStorage.setItem('darkModeOn',false)
              localStorage.setItem('notifyOff', true);
              toast.success(`👋 Bienvenue ${lastname} ${firstname} `, {
                position: "bottom-right",
                className : 'welcomenotify', 
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }
          }
        });
      setRendered(true);
    }
    
    // eslint-disable-next-line
  }, [rendered,lastname,firstname,profile_picture]);

  //Retourne le Panel d'option du post si le post appartient à l'utilisateur ou si l'utilisateur est un administrateur
  function OptionPanel(props) {
    const itsYourPost = props.itsYourPost;
    if (itsYourPost) {
      return <div className="option_container">
      <button className="option_button" type="button" onClick={showOptionPanel} >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <div className="option_panel">
        <ul>
          <li>
          <i className="fa-regular fa-pen-to-square"></i>
          <p onClick={showpanelModify}> Modifier</p>
          </li>
          <li>
          <i className="fa-solid fa-trash-can"></i>
          <p onClick={deletePost}>Supprimer</p>
          </li>
        </ul>
      </div>
    </div>
    }
    return "";
  }

  //Retourne le Panel d'option du commentaire si le commentaire appartient à l'utilisateur ou si l'utilisateur est un administrateur
  function OptionPanelCommentary(props) {
    const itsYourComment = props.itsYourComment;
    if (itsYourComment) {
      return <div className="option_container_commentary">
      <button className="option_button_commentary" type="button" onClick={showOptionPanel_commentary} >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      <div className="option_panel_commentary">
        <ul>
          <li>
          <i className="fa-solid fa-trash-can"></i>
          <p onClick={deleteComment}>Supprimer</p> 
          </li>
        </ul>
      </div>
    </div>
    }
    return "";
  }

  //Action effectué dans l'utilisateur appuie sur le bouton pour ouvrir le menu d'option d'un post
  function showOptionPanel(x){
    if(x){
    var option_panel = x.target.parentElement.parentElement.querySelector('.option_panel');
    var text = x.target.parentElement.parentElement.querySelector('ul');
    if (!(option_panel.classList.contains('option_panel_show'))){
      option_panel.classList.add('option_panel_show');
      option_panel.classList.remove('option_panel_show_reverse');
      text.classList.add('option_panel_show_text');
    }else{
      option_panel.classList.add('option_panel_show_reverse');
      option_panel.classList.remove('option_panel_show');
      text.classList.remove('option_panel_show_text');
    }
  }else{
      option_panel = document.querySelectorAll('.option_panel')
      option_panel.forEach(function(option_panel_item) {
      if(option_panel_item.classList.contains('option_panel_show')){
        option_panel_item.classList.add('option_panel_show_reverse');
        option_panel_item.classList.remove('option_panel_show');
      }
    });
    }  
  }
  //Action effectué dans l'utilisateur appuie sur le bouton pour ouvrir le menu d'option d'un commentaire
  function showOptionPanel_commentary(x){
    if(x){
      var option_panel = x.target.parentElement.parentElement.querySelector('.option_panel_commentary');
      var text = x.target.parentElement.parentElement.querySelector('ul');
      
      if (!(option_panel.classList.contains('option_panel_show_commentary'))){
        option_panel.classList.add('option_panel_show_commentary');
        option_panel.classList.remove('option_panel_show_reverse_commentary');
        text.classList.add('option_panel_show_text_commentary');
      }else{
        option_panel.classList.add('option_panel_show_reverse_commentary');
        option_panel.classList.remove('option_panel_show_commentary');
        text.classList.remove('option_panel_show_text_commentary');
      }
      }else{
        option_panel = document.querySelectorAll('.option_panel_commentary')
        option_panel.forEach(function(option_panel_item) {
        if(option_panel_item.classList.contains('option_panel_show_commentary')){
          option_panel_item.classList.add('option_panel_show_reverse_commentary');
          option_panel_item.classList.remove('option_panel_show_commentary');
        }
      });
      }
    
      
      
  }

  //Permet lors d'une publication de commentaire d'ouvrir l'onglet des commentaires correspondant
  function openCommentary(){
    if(commentshow){
      document.querySelector(`[data-id='${commentshow}']`).querySelector('.commentary_container').classList.add('commentary_open'); 
      document.querySelector(`[data-id='${commentshow}']`).querySelector('.commentary_container').classList.remove('commentary_close');
      setcommentshow(null)
    }
  }

  //Action effectué dans l'utilisateur appuie sur le bouton pour ouvrir et fermer l'onglet des commantaires d'un post
  function openAndCloseCommentary(x){
    if(x.target.closest('.article_container')){
      var commentary_container = x.target.closest('.article_container').querySelector('.commentary_container');
    }else{
      commentary_container = x.target.closest('.darkmode_article').querySelector('.commentary_container');
    }
  
   if (!(commentary_container.classList.contains('commentary_open'))){
    commentary_container.classList.add('commentary_open');
    commentary_container.classList.remove('commentary_close');

  }else{
    commentary_container.classList.add('commentary_close');
    commentary_container.classList.remove('commentary_open');
  }
  }

  //Fonction qui permet de récupérer tous les posts et de les créer à l'intérieur de la page à l'aide de createElement et de react render
  async function displayPostOnScreen(allposts,Administrator){

    let propsAdministrator = await fetch("http://localhost:3000/api/auth/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: localStorage.getItem('userid'),
        }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          return value.isAdministrator
        });

    allposts = allposts.reverse();
    for(let post in allposts){
      var author_id = allposts[post].userId;
      var textOfThePost = allposts[post].text;
      var image = allposts[post].imageUrl;
      var dateOfThePost = allposts[post].date;
      var idOfThePost = allposts[post]._id;
      var listOfLike = allposts[post].usersLiked;
      var numberOfLikes = allposts[post].likes;
      var allCommentary = allposts[post].commentary_list

      function containvideo() {
        var listofformat = ['mp4','webm','avi','mov','flv','mkv'];   
        var imageformat = allposts[post].imageUrl;
        if (imageformat.split('.')[1] === listofformat.find(format => format === imageformat.split('.')[1]))
          return true
          return false
      }


       let data = await fetch("http://localhost:3000/api/auth/getall", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: author_id,
        }),
      })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        return data
      });
      
      var author_firstname = data.firstname;
      var author_lastname = data.lastname;  
      var author_profile_picture = data.iconurl;  
      var author_profile_isAdministrator = data.isadministrator;

      var main_container = document.getElementById('main_container');
      var article_container = document.createElement('div');

      if(localStorage.getItem('darkModeOn') === 'true'){ 
        article_container.classList.add("darkmode_article");
      }else{
        article_container.classList.add("article_container");
      }

      article_container.setAttribute("data-id",idOfThePost)
      main_container.appendChild(article_container);

      var poster_information = document.createElement('div');
      poster_information.classList.add("poster_information");
      article_container.appendChild(poster_information)


      var profilpicture = document.createElement('img');
      profilpicture.classList.add('profil');

      if (author_profile_picture !== ""){
        profilpicture.setAttribute('src',author_profile_picture)
      }else{
        profilpicture.setAttribute('src',defaultProfilPicture)
      }
      
      poster_information.appendChild(profilpicture);

      var nameAndDate = document.createElement('div');
      nameAndDate.classList.add('nameanddate');
      poster_information.appendChild(nameAndDate);

      var authorOfThePost = document.createElement('p');
      authorOfThePost.innerHTML = author_profile_isAdministrator? `Poste de <span class="author_name_post">  ${author_lastname} ${author_firstname} <i class="fa-solid fa-star"></i> `  : `Poste de <span>  ${author_lastname} ${author_firstname}`
      nameAndDate.appendChild(authorOfThePost);

      var date = document.createElement('p');
      date.classList.add('date')
      
      date.textContent = `Publié le ${dateOfThePost}`;
      nameAndDate.appendChild(date);

      var article = document.createElement('article');
      article.classList.add('article');
      article_container.appendChild(article);
      
      const likeAndComment = ReactDOM.createRoot(article);
      
      if(image){
        likeAndComment.render(
          <div>
            <p>{textOfThePost}</p>
            <div className="image_container">
            {!containvideo()? 
            <a className="link" href={image} target='_blank' rel="noreferrer"> 
            <img className="article_image" src={image} alt="" /> </a> 
            : <video className="article_image" src={image} controls alt="" target='_blank'/>}
            </div>
            <form onSubmit={likeanddisliked} className="likeandcomment_container">
            <button type="submit" className="button_icon_heart" >
                <FontAwesomeIcon className={(listOfLike.find(user => user === localStorage.getItem('userid')))? "icon_heart like" : "icon_heart"} icon={(listOfLike.find(user => user === localStorage.getItem('userid')))? faHeartsolid : faHeart}/>
                <p className="numberoflikes">{numberOfLikes}</p>
              </button>
              <div className="comment" onClick={openAndCloseCommentary}>
                <FontAwesomeIcon className="icon_comment" icon={faComments}/>
                <button type="button">Commentaire</button>
              </div>
              <OptionPanel itsYourPost={((author_id === localStorage.getItem('userid')) || isAdministrator || Administrator || propsAdministrator)} />
              </form>
          </div>
        );
      }else{
        likeAndComment.render(
          <div>
            <p>{textOfThePost}</p>
          <form onSubmit={likeanddisliked} className="likeandcomment_container">
            <button className="button_icon_heart" >
              <FontAwesomeIcon className={(listOfLike.find(user => user === localStorage.getItem('userid')))? "icon_heart like" : "icon_heart"} icon={(listOfLike.find(user => user === localStorage.getItem('userid')))? faHeartsolid : faHeart}/>
              <p className="numberoflikes">{numberOfLikes}</p>
            </button>
            <div className="comment" onClick={openAndCloseCommentary}>
              <FontAwesomeIcon className="icon_comment" icon={faComments}/>
              <button type="button">Commentaire</button>
            </div>
            <OptionPanel itsYourPost={((author_id === localStorage.getItem('userid')) || isAdministrator || Administrator || propsAdministrator)} />
           </form>
        </div>
        );
      }

      var commentary_container = document.createElement('div');
      commentary_container.classList.add('commentary_container');
      article_container.appendChild(commentary_container);

      var button_commentary_container = document.createElement('div');
      button_commentary_container.classList.add('button_commentary_container');
      commentary_container.appendChild(button_commentary_container)

      const button_commentary_container_render = ReactDOM.createRoot(button_commentary_container);
      button_commentary_container_render.render(
        <button onClick={showpanelCommentary} className="button_commentary">Créer un commentaire</button>
      )



      for(let singlecommentary in allCommentary){
        var commentary_Id = allCommentary[singlecommentary]._id;
        var commentary_text = allCommentary[singlecommentary].text;
        // var author_commentary_firstname = allCommentary[singlecommentary].firstname;
        // var author_commentary_lastname = allCommentary[singlecommentary].lastname;
        var author_commentary_userId = allCommentary[singlecommentary].userId;
        var commentary_date = allCommentary[singlecommentary].date;
        let data = await fetch("http://localhost:3000/api/auth/getall", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: author_commentary_userId,
        }),
      })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (data) {
        return data
      });

      var author_commentary_firstname =  data.firstname;
      var author_commentary_lastname = data.lastname;
      var author_commentary_profilepicture =  data.iconurl;
      var author_commentary_isadministrator =  data.isadministrator

        var commentary = document.createElement('div');
        commentary.classList.add('commentary');
        commentary.setAttribute("data-id",commentary_Id)
        commentary_container.appendChild(commentary);

        var author_information = document.createElement('div')
        author_information.classList.add('author_information')
        commentary.appendChild(author_information);
       
        var profile_icon = document.createElement('img');
        profile_icon.classList.add('profile_icon')

        if (author_commentary_profilepicture !== ""){
          profile_icon.setAttribute('src',author_commentary_profilepicture)
        }else{
          profile_icon.setAttribute('src',defaultProfilPicture)
        }

        author_information.appendChild(profile_icon)
        
        var authorAndDate = document.createElement('div')
        authorAndDate.classList.add('authoranddate')
        author_information.appendChild(authorAndDate);

        var author_name = document.createElement('p');
        author_name.classList.add("author_name");
        author_name.innerHTML = author_commentary_isadministrator? `Commentaire de <span class="author_name_post">  ${author_commentary_lastname} ${author_commentary_firstname} <i class="fa-solid fa-star"></i> `  : `Commentaire de <span>  ${author_commentary_lastname} ${author_commentary_firstname}`
        authorAndDate.appendChild(author_name);

        var commentary_date_element = document.createElement('p')
        commentary_date_element.classList.add("commentary_date")
        commentary_date_element.textContent = `Commenté le ${commentary_date}`
        authorAndDate.appendChild(commentary_date_element);

        var commentary_text_element = document.createElement('p');
        commentary_text_element.classList.add('commentary_text');
        commentary_text_element.textContent = commentary_text;
        commentary.appendChild(commentary_text_element);

        var container_render_commentary = document.createElement('div')
        commentary.appendChild(container_render_commentary);

        const container_commentary_option = ReactDOM.createRoot(container_render_commentary)
        container_commentary_option.render(
          <OptionPanelCommentary itsYourComment={((author_commentary_userId === localStorage.getItem('userid')) || isAdministrator || ( author_id === localStorage.getItem('userid')))} />
        );
      }
         
    }
    if(document.getElementById('.loader_container')){
      document.getElementById('.loader_container').remove();
    }

    openCommentary();
    showDarkMode();
  } 

  //Fonction permettant la mise en place du système de like de la page
  function likeanddisliked(x){
    x.preventDefault()
    if(x.target.parentElement.closest(".article_container")){
      var idPost = x.target.parentElement.closest(".article_container").dataset.id;
    }else{
      idPost = x.target.parentElement.closest(".darkmode_article").dataset.id;
    }
    

    if(x.target.parentElement.disabled === true){
    }else{
      if(( x.target.querySelector('svg').classList.contains('like'))){
        x.target.querySelector('svg').classList.remove('like')
        x.target.querySelector('p').textContent = parseInt(x.target.querySelector('p').textContent) -1 ;
        x.target.querySelector('path').setAttribute('d',"M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z")
        x.target.parentElement.disabled = true;
        fetch(`http://localhost:3000/api/post/${idPost}/like`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            like:  0,
            userId : localStorage.getItem('userid'),
          }),
          })
          .then(function (res) {
          })
          .then(function (value) {});
        setTimeout(function () {
          x.target.parentElement.disabled = false;
        }, 250);
      }else{

        x.target.querySelector('svg').classList.add('like')
        x.target.querySelector('p').textContent = parseInt(x.target.querySelector('p').textContent) +1 ;
        x.target.querySelector('path').setAttribute('d',"M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z")
        x.target.parentElement.disabled = true;
        fetch(`http://localhost:3000/api/post/${idPost}/like`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            like:  1,
            userId : localStorage.getItem('userid'),
          }),
          })
          .then(function (res) {
          })
          .then(function (value) {});
        setTimeout(function () {
          x.target.parentElement.disabled = false;
        }, 250);
      }
    }
  }

  //Fonction qui permet l'actualisation des posts quand il y a modification suppression ou ajout
  async function refreshPostInPage(value){
    await fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (allposts) {
        document.getElementById('main_container').remove();
        var main_container = document.createElement('div')
        main_container.classList.add('main_container')
        main_container.setAttribute('id','main_container');
        document.getElementById('main').appendChild(main_container)
        displayPostOnScreen(allposts,value);
      })
  }
  const navigate = useNavigate();

  const placeholder_textarea = 'Que souhaitez-vous dire, ' + firstname + " ?";

  return (
    <div className={(DarkModeOn === "true")? "body_home_darkmode" : "body_home"}>
      <header className={(DarkModeOn === "true")? "first_header_darkmode" : "first_header"}> 
        <div className={(DarkModeOn === "true")? "header_darkmode" : "header"}>
          <div className="left">
            <img src={logo} alt="Logo Groupomania" className="logo" />
          </div>
          <div className={(DarkModeOn === "true")? "right input_darkmode" : "right"}> 
            <button onClick={showpanelpost} className="createpost">
              Créer un nouveau post
            </button>
            <div className="container_name">
              <p id="profile_button" className="profile" onClick={showpanelProfil}>
                <FontAwesomeIcon className="icon_profile" icon={faUser} />
                {lastname} {firstname}
              </p>
              <div className="container_gear">
                <FontAwesomeIcon
                  className="param"
                  icon={faGear}
                  onClick={opendisconnect}
                />
              </div>

              <button
                id="button_disconnect"
                onClick={returntologinpage}
                className="returnbutton"
              >
                Se Déconnecter
              </button>
            </div>
          </div>
        </div>
      </header>
      <main id="main">
        <div id="container_panel_post" className={(DarkModeOn === "true")? "container_panel_post darkmode_post" : "container_panel_post"}> 
          <div id="panel_post_block" className="panel_post_block">
            <form className="panel_post" onSubmit={postPost}>
              <div className="header_panel">
                <h2 className="panel_post_title">Créer une publication</h2>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="exit_cross"
                  onClick={hidepanelpost}
                />
              </div>
              <div className="container_area_and_image">
                <textarea
                  name=""
                  id="post_textarea"
                  className="post_textarea"
                  cols="30"
                  rows="10"
                  onChange={textareaIsClicked}
                  placeholder={placeholder_textarea}
                ></textarea>
                <img id="importedimage"className="importedimage"src="" alt=""/>
              </div>
              <FontAwesomeIcon
                id="delete_file"
                icon={faTrash}
                onClick={resetFile}
                className="delete_file"
              />
              <img
                id="opentrashicon"
                className="opentrashicon"
                src={openTrash}
                alt=""
              />
              <div className="footer_panel">
                <div id="addimage_button" className="addimage_button ">
                  <input
                    id="file_input"
                    type="file"
                    className="file_input"
                    onChange={fileAddToPanel}
                  />
                  <span id="addimage_text" className="addimage_text">
                    Ajouter une image
                  </span>
                  <div id="container_file" className="container_file">
                    <span id="file-name" className="file-name"></span>
                    <span id="file-size" className="file-size"></span>
                  </div>
                </div>
                <button id="publish_button" className="publish_button" disabled>
                  Publier
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="container_panel_modify" className={(DarkModeOn === "true")? "container_panel_modify darkmode_modify" : "container_panel_modify"}>
          <div id="panel_modify_block" className="panel_modify_block">
            <form className="panel_modify" onSubmit={modifyPost}>
              <div className="header_panel">
                <h2 className="panel_modify_title">Modifier une publication</h2>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="exit_cross"
                  onClick={hidepanelModify}
                />
              </div>
              <div className="container_area_and_image">
                <textarea
                  name=""
                  id="modify_textarea"
                  className="post_textarea"
                  cols="30"
                  rows="10"
                  onChange={textareaIsClickedModify}
                  placeholder={placeholder_textarea}
                ></textarea>
                <img
                  id="importedimage_modify"
                  className="importedimage"
                  src=""
                  alt=""
                />
              </div>
              <FontAwesomeIcon
                id="delete_file_modify"
                icon={faTrash}
                onClick={resetFile2}
                className="delete_file"
              />
              <img
                id="opentrashicon_modify"
                className="opentrashicon"
                src={openTrash}
                alt=""
              />
              <div className="footer_panel">
                <div id="addimage_button" className="addimage_button ">
                  <input
                    id="file_input_modify"
                    type="file"
                    className="file_input"
                    onChange={fileAddToPanel3}
                  />
                  <span id="addimage_text_modify" className="addimage_text">
                    Ajouter une image
                  </span>
                  <div id="container_file_modify" className="container_file">
                    <span id="file-name_modify" className="file-name"></span>
                    <span id="file-size_modify" className="file-size"></span>
                  </div>
                </div>
                <button id="publish_button_modify" className="publish_button" disabled>
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="container_panel_commentary" className={(DarkModeOn === "true")? "container_panel_commentary darkmode_comment" : "container_panel_commentary"}>
          <div id="panel_commentary_block" className="panel_commentary_block">
            <form className="panel_commentary" onSubmit={sendCommentary}>
              <div className="header_panel">
                <h2 className="panel_commentary_title">Ajouter un commentaire</h2>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="exit_cross"
                  onClick={hidepanelCommentary}
                />
              </div>
              <div className="container_area_and_image">
                <textarea
                  name=""
                  id="commentary_textarea"
                  className="post_textarea"
                  cols="30"
                  rows="10"
                  onChange={textareaIsClickedCommentary}
                  placeholder={placeholder_textarea}
                ></textarea>
              </div>
              <div className="footer_panel">
                <button id="publish_button_commentary" className="publish_button" disabled>
                  Publier le commentaire
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="container_panel_profil" className="container_panel_profil">
          <div id="panel_profil_block" className={(DarkModeOn === "true")? "panel_profil_block darkmode" : "panel_profil_block"}>
            <div className="panel_profil">
                <FontAwesomeIcon icon={faXmark}className="exit_cross" onClick={hidepanelProfil}/>
                <div className={(DarkModeOn === "true")? "menu input_darkmode" : "menu"}>
                  <ul>
                    <li id="menu_personnaldata" className="clicked" onClick={menupersonnaldata}>
                      Données personnelles
                    </li>
                    <li id="menu_password" onClick={menupassword}>
                      Mot de passe
                    </li>
                  </ul>
                </div>
                <div className="container_change_profil_icon">
                  <div className="container_darkmod">
                    <input id="enabledarkmod" className="enabledarkmod" type="checkbox" onChange={darkmodtoggle}/>
                    <label className="labeldarkmod" htmlFor="checkbox">
                      <i className="fas fa-moon"></i>
                      <i className='fas fa-sun'></i>
                      <div className='ball'/>
                    </label>
                  </div>
                  <img id="profileImg" className="profileImg" src={profile_picture} alt="" />
                  <p id= "profile_firstname_lastname" className="profile_firstname_lastname">{firstname} {lastname}</p>
                  <div className={(DarkModeOn === "true")? "input_file_icon_container input_darkmode" : "input_file_icon_container"}>
                    <input className={(DarkModeOn === "true")? "file_input_icon input_darkmode" : "file_input_icon"} type="file" onChange={PostChangeProfilePicture}/>
                    <span id="addimage_text" className="addimage_text">
                      Changer de photo de profil
                    </span>
                  </div>
                </div>
                <form className={(DarkModeOn === "true")? "container_change_personalinformation darkmode" : "container_change_personalinformation"} onSubmit={PostChangeOnProfil}>
                    <div className="container_change_firstname">
                      <label className="label_firstname" htmlFor="firstname">Prénom</label>
                      <input id="change_firstname" type="text" className={(DarkModeOn === "true")? "change_firstname input_darkmode_text" : "change_firstname"} name="firstname" autoComplete="given-name"/>
                    </div>
                    <div className="container_change_lastname">
                      <label className="label_lastname" htmlFor="lastname">Nom</label>
                      <input id="change_lastname" type="text" className={(DarkModeOn === "true")? "change_lastname input_darkmode_text" : "change_lastname"} name="lastname" autoComplete="family-name"/>
                    </div>
                    <div className="container_confirm_password">
                      <label className="label_confirmpassword" htmlFor="confirmpassword">Mot de passe</label>
                      <input id="confirmpassword" type="password" className={(DarkModeOn === "true")? "confirmpassword input_darkmode_text" : "confirmpassword"} name="confirmpassword" required  autoComplete="new-password"/>
                    </div>
                    <button className={(DarkModeOn === "true")? "button_apply button_darkmode" : "button_apply"}>Appliquer les modifications</button>
                  </form>
                  <form className={(DarkModeOn === "true")? "container_change_password darkmode" : "container_change_password"} onSubmit={PostChangePassword}>
                    <div className="container_oldpassword">
                      <label className="label_oldpassword" htmlFor="oldchange_password" autoComplete="current-password">Mot de passe actuel</label>
                      <input id="oldpassword" type="password" className={(DarkModeOn === "true")? "change_oldpassword input_darkmode_text" : "change_oldpassword"} name="oldchange_password" />
                    </div>
                    <div className="container_newpassword">
                    <label className="label_newpassword" htmlFor="change_newpassword" autoComplete="new-password">Nouveau mot de passe</label>
                    <input id="newpassword" type="password" className={(DarkModeOn === "true")? "change_newpassword input_darkmode_text" : "change_newpassword"} name="change_newpassword" />
                    </div>
                    <button className={(DarkModeOn === "true")? "button_apply_password button_darkmode" : "button_apply_password"}>Appliquer les modifications</button> 
                  </form>
            </div>
          </div>
        </div>
        <div id="main_container" className="main_container">
          <div id ="loader_container" className="loader_container">
            <div className={(DarkModeOn === "true")? "darkmode_article" : "article_container"}>
              <div className={(DarkModeOn === "true")? "poster_information_loader_darkmode" : "poster_information_loader"}>
                <div className={(DarkModeOn === "true")? "profil_loader_darkmode" : "profil_loader"}></div>
                <div className="nameanddate">
                  <p></p>
                  <p className="date"></p>
                </div>
              </div>
              <article className="article">
                <div className="likeandcomment_container">
                  <div className="button_icon_heart">
                  <i className={(DarkModeOn === "true")? "fa-solid fa-heart icon_heart_loader_darkmode" : "fa-solid fa-heart icon_heart_loader"}></i>
                  </div>
                  <div className={(DarkModeOn === "true")? "comment_loader_darkmode" : "comment_loader"}>
                  </div>
                </div>
              </article>
            </div>
            <div className={(DarkModeOn === "true")? "darkmode_article" : "article_container"}>
              <div className={(DarkModeOn === "true")? "poster_information_loader_darkmode" : "poster_information_loader"}>
                <div className={(DarkModeOn === "true")? "profil_loader_darkmode" : "profil_loader"}></div>
                <div className="nameanddate">
                  <p></p>
                  <p className="date"></p>
                </div>
              </div>
              <article className="article">
                <p></p>
                <div className={(DarkModeOn === "true")? "image_container_loader_darkmode" : "image_container_loader"}> 
                  <div className="image_loader">
                  </div>
                </div>
                <div className="likeandcomment_container">
                  <div className="button_icon_heart"> 
                  <i className={(DarkModeOn === "true")? "fa-solid fa-heart icon_heart_loader_darkmode" : "fa-solid fa-heart icon_heart_loader"}></i>
                  </div>
                  <div className={(DarkModeOn === "true")? "comment_loader_darkmode" : "comment_loader"}>
                  </div>
                </div>
              </article>
            </div>
          </div>
        
          
        </div>
      </main>
      <footer></footer>
    </div>
  );

  //Permet de retourner à la page d'accueil en supprimant certains élements du localstorage
  function returntologinpage() {
    let keysToRemove = ["isLoggedIn", "userid","token"];
    keysToRemove.forEach(k =>localStorage.removeItem(k))
    navigate("/login");
  }

  //Envoi la requête au backend pour publier un post
  function postPost (e){
    e.preventDefault();
    let data = new FormData();
    const textareavalue = document.getElementById('post_textarea').value;
    const fileinput = document.getElementById('file_input');
    const image = fileinput.files[0];

    data.append('text', textareavalue);
    data.append('firstname' , firstname)
    data.append('lastname' , lastname)
    if (image){
      data.append('image', image);
    }
        fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: data,
      })
        .then(function (res) {
          if (res.ok) {
            succesnotify();
            hidepanelpost();
            refreshPostInPage();
            return res.json();
          }
          errornotify();
        })
        .then(function (value) {
         
        });
  }

  //Envoi la requête au backend pour publier un commentaire
  function sendCommentary (e){
    e.preventDefault();
    const textareavalue = document.getElementById('commentary_textarea').value;
    const userId = localStorage.getItem('userid')

    
        fetch(`http://localhost:3000/api/comment/${postId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          text: textareavalue,
          firstname: firstname,
          lastname: lastname,
          userId: userId,
        }),
      })
        .then(function (res) {
          if (res.ok) {
            succesnotifyCommentary();
            hidepanelCommentary();
            refreshPostInPage();
            return res.json();
          }
          errornotify();
        })
        .then(function (value) {
         
        });
  }

  //Envoi la requête au backend pour modifier un post
  async function modifyPost (e){
   
    e.preventDefault();
    let data = new FormData();
    const textareavalue = document.getElementById('modify_textarea').value;
    const fileinput = document.getElementById('file_input_modify');

    const inputimage = document.getElementById('importedimage_modify')
    const inputvideo = document.getElementById('importedvideo_modify');
    const image = fileinput.files[0];
    const userId = localStorage.getItem('userid')
    data.append('text', textareavalue);
    data.append('firstname' , firstname)
    data.append('lastname' , lastname)
    data.append('userId' , userId)


    if(inputimage){
      if(!image && inputimage.src !== 'http://localhost:3001/accueil' ){
        data.append('imageexiste',inputimage.src)
      }
    }else{
      if(!image && inputvideo.src !== 'http://localhost:3001/accueil' ){
        data.append('imageexiste',inputvideo.src)
      }
    }
   

    if (image && image !== ""){
      data.append('image', image);
    }
        fetch(`http://localhost:3000/api/modify/${postId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: data,
      })
        .then(function (res) {
          if (res.ok) {
            succesnotifymodify();
            hidepanelModify();
            refreshPostInPage();
            return res.json();
          }
          errornotifymodify();
        })
        .then(function (value) {
         
        });
  }

  //Envoi la requête au backend pour supprimer un post
  function deletePost (e){
        e.preventDefault();
        if (e.target.closest('.article_container')){
          var postIddelete = (e.target.closest('.article_container').dataset.id);
        }else{
          postIddelete = (e.target.closest('.darkmode_article').dataset.id);
        }
        
        fetch(`http://localhost:3000/api/post/${postIddelete}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(function (res) {
          if (res.ok) {
            succesnotifydelete();
            commentshow = null
            refreshPostInPage();
            return res.json();
          }
          errornotifydelete();
        })
        .then(function (value) {
         
        });
  }

  //Envoi la requête au backend pour supprimer un commentaire
  function deleteComment (e){
    e.preventDefault();
    const userId = localStorage.getItem('userid')
    var commentIddelete = (e.target.closest('.commentary').dataset.id)

    if(e.target.closest('.article_container')){
      var postIddelete = (e.target.closest('.article_container').dataset.id);
    }else{
      postIddelete = (e.target.closest('.darkmode_article').dataset.id);
    }

    fetch(`http://localhost:3000/api/comment/${postIddelete}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify({
      commentId: commentIddelete,
      userId: userId,
    }),
  })
    .then(function (res) {
      if (res.ok) {
        succesnotifyCommentarydelete();
        refreshPostInPage();
        return res.json();
      }
      errornotifydelete();
    })
    .then(function (value) {
     
    });
}

 //Envoi la requête au backend pour changement d'information personnel
  function PostChangeOnProfil (e){
    e.preventDefault();
    var changeLastname = document.getElementById('change_lastname').value;
    var changeFirstname = document.getElementById('change_firstname').value;
    var confirmpassword = document.getElementById('confirmpassword').value;
    if (confirmpassword){
      fetch(`http://localhost:3000/api/auth/change/${localStorage.getItem('userid')}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          lastname : changeLastname,
          firstname : changeFirstname,
          password : confirmpassword,
        }),
      })
        .then(function (res) {
          if (res.ok) {
            succesnotifymodifyprofil();
            //window.location.reload();
            document.getElementById('profile_button').textContent = `${changeLastname} ${changeFirstname}`
            document.getElementById('profile_firstname_lastname').textContent = `${changeLastname} ${changeFirstname}`
            refreshPostInPage();
            return res.json();
          }
          errornotify();
        })
        .then(function (value) {
        
        });
    }else{
      errornotify()
    }


  }

 //Envoi la requête au backend pour changement de mot de passe
  function PostChangePassword(e){
    e.preventDefault();
    var newpassword = document.getElementById('newpassword').value
    var oldpassword = document.getElementById('oldpassword').value

    fetch(`http://localhost:3000/api/auth/changepassword/${localStorage.getItem('userid')}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization': "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        oldpassword : oldpassword,
        newpassword : newpassword,
      }),
    })
      .then(function (res) {
        if (res.ok) {
          succesnotifymodifypassword();
          let keysToRemove = ["isLoggedIn", "userid","token"];
          keysToRemove.forEach(k =>localStorage.removeItem(k))
          setTimeout(function () {
            window.location.reload();
          }, 4000);
          return res.json();
        }
        errornotifymodifypassword();
      })
      .then(function (value) {
      
      });
  }
 //Envoi la requête au backend pour changement de photo de profil
  function PostChangeProfilePicture(x){
    let data = new FormData();
    var fileinputPicture =  x.target;
    const image = fileinputPicture.files[0];

    var listofformat= ['jpeg','jpg','png','gif','webp'];

    if (image.type.split('/')[1] === listofformat.find(format => format === image.type.split('/')[1])){
      if(image){
        data.append('_id' , localStorage.getItem('userid'))
        data.append('image', image);
      
        fetch(`http://localhost:3000/api/auth/changeProfilePicture`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            'Authorization': "Bearer " + localStorage.getItem("token"),
          },
          body: data
        })
          .then(function (res) {
            if (res.ok) {
              succesnotifymodifyprofil();
              refreshPostInPage();
      
              return res.json();
            }
            errornotify();
          })
          .then(function (value) {
          document.getElementById('profileImg').src = value.iconurl     
          });
      }
    }else{
      Formatnotsupport(image.type.split('/')[1])
    }
  }

  //Ajout de fichier vidéo et image à la création de post
  function fileAddToPanel(x){
    var fileinput =  x.target;
    var filename = fileinput.files[0].name;
    var filesize = fileinput.files[0].size;
    var image = document.getElementById('importedimage')
    var video = document.getElementById('importedvideo')
    var [file] = fileinput.files;

    var listofformat= ['jpeg','jpg','png','gif','webp','mp4','webm','avi','mov','flv','mkv'];

    if (file.type.split('/')[1] === listofformat.find(format => format === file.type.split('/')[1])){
      if ([file.type][0].split('/')[0] === 'video'){
          if(!image){
            video.src = URL.createObjectURL(file)
            video.style.border = "solid 4px #fd2d01"
            video.classList.add("display_block")
          }else{
            video = document.createElement('video')
            video.classList.add('importedimage')
            video.setAttribute('controls',"")
            video.setAttribute('id',"importedvideo")
            video.src = URL.createObjectURL(file)
            video.classList.add("display_block")
            image.parentNode.replaceChild(video, image)
          }
      }else{
        if(!image){
          image = document.createElement('img')
          image.setAttribute('id','importedimage')
          image.classList.add('importedimage')
          video.parentNode.replaceChild(image, video)
        }
      
        image.src = URL.createObjectURL(file)
        image.style.border = "solid 4px #fd2d01"
        image.classList.add("display_block")
      }
      document.getElementById('addimage_text').classList.add('display_none')
      document.getElementById('panel_post_block').classList.add('panel_post_block_extend')
      document.getElementById('post_textarea').classList.add('post_textarea_extended')
      document.getElementById('container_file').classList.add('display_flex')
      document.getElementById('opentrashicon').classList.add('display_block')
      document.getElementById('delete_file').classList.add('display_block')
      document.getElementById('addimage_text').textContent ="";
      document.getElementById("file-name").textContent = filename; 
      document.getElementById("file-size").textContent = ((filesize/1024)).toFixed(1) + " KB";
    }else{
      Formatnotsupport(file.type.split('/')[1])
    }
  }

  //Ajout de fichier seulement avec des vidéos dans modificaton de post
  function fileAddToPanel2(x){
    var listofformat = ['mp4','webm','avi','mov','flv','mkv'];   
    var image = document.getElementById('importedimage_modify')
    var video = document.getElementById('importedvideo_modify')
    if(image && !video){
      if (x.src.split('.')[1] === listofformat.find(format => format === x.src.split('.')[1])){
        video = document.createElement('video')
        video.classList.add('importedimage')
        video.setAttribute('controls',"")
        video.setAttribute('id',"importedvideo_modify")
        video.src = x.src
        video.classList.add("display_block")
        video.style.border = "solid 4px #fd2d01"
        image.parentNode.replaceChild(video, image)
      }else{
        image.src = x.src;
        image.style.border = "solid 4px #fd2d01"
        image.classList.add("display_block")
      }
    }else{
      if ((x.src.split('.')[1] === listofformat.find(format => format === x.src.split('.')[1]))){
        video.src = x.src
        video.style.border = "solid 4px #fd2d01"
        video.classList.add("display_block")
      }else{
        image = document.createElement('img')
        image.setAttribute('id','importedimage_modify')
        image.classList.add('importedimage')
        video.parentNode.replaceChild(image, video)
        image.src = x.src;
        image.style.border = "solid 4px #fd2d01"
        image.classList.add("display_block")
      }
    }
       
    document.getElementById('panel_modify_block').classList.add('panel_modify_block_extend')
    document.getElementById('modify_textarea').classList.add('post_textarea_extended')
    document.getElementById('container_file_modify').classList.add('display_none')
    document.getElementById('opentrashicon_modify').classList.add('display_block')
    document.getElementById('delete_file_modify').classList.add('display_block')
    document.getElementById('addimage_text_modify').textContent = "Remplacer l'image";
  }

  //Ajout de fichier vidéo et image modification de post
  function fileAddToPanel3(x){
  var fileinput =  x.target;
  var image = document.getElementById('importedimage_modify')
  var video = document.getElementById('importedvideo_modify')
  var [file] = fileinput.files;

  var listofformat= ['jpeg','jpg','png','gif','webp','mp4','webm','avi','mov','flv','mkv'];

  if (file.type.split('/')[1] === listofformat.find(format => format === file.type.split('/')[1])){   
    if ([file.type][0].split('/')[0] === 'video'){
        if(!image){
          video.src = URL.createObjectURL(file)
          video.style.border = "solid 4px #fd2d01"
          video.classList.add("display_block")
        }else{
          video = document.createElement('video')
          video.classList.add('importedimage')
          video.setAttribute('controls',"")
          video.setAttribute('id',"importedvideo_modify")
          video.src = URL.createObjectURL(file)
          video.classList.add("display_block")
          image.parentNode.replaceChild(video, image)
        }
    }else{

      if(!image){
        image = document.createElement('img')
        image.setAttribute('id','importedimage_modify')
        image.classList.add('importedimage')
        video.parentNode.replaceChild(image, video)
      }
    
      image.src = URL.createObjectURL(file)

      image.style.border = "solid 4px #fd2d01"
      image.classList.add("display_block")
    }


    document.getElementById('panel_modify_block').classList.add('panel_modify_block_extend')
    document.getElementById('modify_textarea').classList.add('post_textarea_extended')
    document.getElementById('container_file_modify').classList.add('display_none')
    document.getElementById('opentrashicon_modify').classList.add('display_block')
    document.getElementById('delete_file_modify').classList.add('display_block')
    document.getElementById('addimage_text_modify').textContent = "Remplacer l'image";
  }else{
    Formatnotsupport(file.type.split('/')[1])
  }
  }

  //Evenement OnChange sur le textarea tant que aucun text le bouton de publication est désactivé
  function textareaIsClicked(){
    if(!(document.getElementById('post_textarea').value === "")){
      document.getElementById('publish_button').classList.add('text_area_clicked')
      document.getElementById('publish_button').disabled = false; 
    }else{
      document.getElementById('publish_button').classList.remove('text_area_clicked')
      document.getElementById('publish_button').disabled = true; 
    }
  }

  //Evenement OnChange sur le textarea tant que aucun text le bouton de publication est désactivé
  function textareaIsClickedModify(){
    if(!(document.getElementById('modify_textarea').value === "")){
      document.getElementById('publish_button_modify').classList.add('text_area_clicked')
      document.getElementById('publish_button_modify').disabled = false; 
    }else{
      document.getElementById('publish_button_modify').classList.remove('text_area_clicked')
      document.getElementById('publish_button_modify').disabled = true; 
    }
  }

  //Evenement OnChange sur le textarea tant que aucun text le bouton de publication est désactivé
  function textareaIsClickedCommentary(){
    if(!(document.getElementById('commentary_textarea').value === "")){
      document.getElementById('publish_button_commentary').classList.add('text_area_clicked')
      document.getElementById('publish_button_commentary').disabled = false; 
    }else{
      document.getElementById('publish_button_commentary').classList.remove('text_area_clicked')
      document.getElementById('publish_button_commentary').disabled = true; 
    }
  }

  //Ouvre le menu de deconnexion
  function opendisconnect() {
    if (!document.getElementById("profile_button").classList.contains("disabled_profile")){
      document.getElementById("profile_button").classList.add("disabled_profile");
      setTimeout(function () {
        document.getElementById("profile_button").classList.remove("disabled_profile");
      }, 1000);
      if (
        document.getElementById("button_disconnect").classList.contains("onclick")
      ) {
        document.getElementById("button_disconnect").disabled = true;
        document.getElementById("button_disconnect").classList.remove("onclick");
        document.getElementById("button_disconnect").classList.add("onclick_reverse");
      } else {
        document.getElementById("button_disconnect").disabled = true;
        document.getElementById("profile_button").classList.add("disabled_profile");
        setTimeout(function () {
          document.getElementById("button_disconnect").disabled = false;
        }, 1000);
        document.getElementById("button_disconnect").classList.remove("onclick_reverse");
        document.getElementById("button_disconnect").classList.add("onclick");
      }
    }
  }

  //Ouvre le panel de publication de post
  function showpanelpost() {
    if (document.getElementById("container_panel_post").classList.contains("container_panel_post_active")){
      document.getElementById("container_panel_post").classList.remove("container_panel_post_active");
    } else {
      document.getElementById("container_panel_post").classList.add("container_panel_post_active");
    }
  }


  //Ferme le panel de publication de post
  function hidepanelpost() {
    if (document.getElementById("container_panel_post").classList.contains("container_panel_post_active")){
      document.getElementById("container_panel_post").classList.remove("container_panel_post_active");
        resetFile();
        if(!(document.getElementById('post_textarea').value === "")){
          document.getElementById('publish_button').disabled = false; 
          document.getElementById('publish_button').classList.remove('text_area_clicked');
        }
        document.getElementById("post_textarea").value = "";
  }
  }

  //Ouvre le panel de modification de post
  function showpanelModify(x){
    var imageurlmodify;
    var  oldtext = x.target.closest(".article").querySelector('p').textContent
    document.getElementById('modify_textarea').value = oldtext;
    if(x.target.closest(".article").querySelector('.article_image')){
      imageurlmodify = x.target.closest(".article").querySelector('.article_image');
    }

    if(x.target.closest(".article_container")){
      setpostId((x.target.closest(".article_container").dataset.id));
    }else{
      setpostId((x.target.closest(".darkmode_article").dataset.id));
    }
   
    if (x.target.closest(".article").querySelector('.image_container')){
      fileAddToPanel2(imageurlmodify);
    }
    if (document.getElementById("container_panel_modify").classList.contains("container_panel_modify_active")){
      document.getElementById("container_panel_modify").classList.remove("container_panel_modify_active");
    } else {
      document.getElementById("container_panel_modify").classList.add("container_panel_modify_active");

      textareaIsClickedModify()
    }
  }

  //Ferme le panel de modification de post
  function hidepanelModify(){
    if (document.getElementById("container_panel_modify").classList.contains("container_panel_modify_active")){
      document.getElementById("container_panel_modify").classList.remove("container_panel_modify_active");
        resetFile2();
        if(!(document.getElementById('post_textarea').value === "")){
          document.getElementById('publish_button').disabled = false; 
          document.getElementById('publish_button').classList.remove('text_area_clicked');
        }
        document.getElementById("post_textarea").value = "";
    }
  }

  //Ouvre le panel de création de commentaire
  function showpanelCommentary(e) {
    setcommentshow(e.target.parentElement.parentElement.parentElement.dataset.id)
    if(e.target.closest(".article_container")){
      setpostId((e.target.closest(".article_container").dataset.id));
    }else{
      setpostId((e.target.closest(".darkmode_article").dataset.id));
    }
    
    if (document.getElementById("container_panel_commentary").classList.contains("container_panel_commentary_active")){
      document.getElementById("container_panel_commentary").classList.remove("container_panel_commentary_active");
    } else {
      document.getElementById("container_panel_commentary").classList.add("container_panel_commentary_active");
    }
  }

  //Ferme le panel de création de commentaire
  function hidepanelCommentary() {
    if (document.getElementById("container_panel_commentary").classList.contains("container_panel_commentary_active")){
      document.getElementById("container_panel_commentary").classList.remove("container_panel_commentary_active");
        if(!(document.getElementById('commentary_textarea').value === "")){
          document.getElementById('publish_button').disabled = false; 
          document.getElementById('publish_button').classList.remove('text_area_clicked');
        }
        document.getElementById("commentary_textarea").value = "";
    }
  }

  //Ouvre le panel de profil de l'utilisateur
  function showpanelProfil() {
      if (document.getElementById("container_panel_profil").classList.contains("container_panel_profil_active")){
        document.getElementById("container_panel_profil").classList.remove("container_panel_profil_active");
      } else {
        document.getElementById("container_panel_profil").classList.add("container_panel_profil_active");
      }
  }

  //Ferme le panel de profil de l'utilisateur
  function hidepanelProfil() {
      if (document.getElementById("container_panel_profil").classList.contains("container_panel_profil_active")){
        document.getElementById("container_panel_profil").classList.remove("container_panel_profil_active");
      }
  }
}

//Ouvre le sous menu de changement de donnée personnel
function menupersonnaldata(x){
  if(!(x.target.classList.contains('clicked'))){
    x.target.classList.add('clicked')
    document.getElementById('menu_password').classList.remove('clicked')
    document.querySelector('.container_change_personalinformation').classList.remove('display_none')
    document.querySelector('.container_change_password').classList.remove('display_flex')
  }

}

//Ouvre le sous menu de changement de mot de passe
function menupassword(x){
  if(!(x.target.classList.contains('clicked'))){
    x.target.classList.add('clicked')
    document.getElementById('menu_personnaldata').classList.remove('clicked')
    document.querySelector('.container_change_personalinformation').classList.add('display_none')
    document.querySelector('.container_change_password').classList.add('display_flex')
  }
}

//Permet la suppression du fichier dans le fileinput à la création d'un post
function resetFile(){
  const fileinput = document.getElementById('file_input');
  fileinput.value = "";
  document.getElementById('addimage_text').textContent ="Ajouter une image";
  
  document.getElementById("file-name").textContent = "";
  document.getElementById("file-size").textContent = "";
  document.getElementById('addimage_text').classList.remove('display_none');
  document.getElementById('container_file').classList.remove('display_flex');
  document.getElementById("file_input").value = ""
  document.getElementById('opentrashicon').classList.remove('display_block');
  document.getElementById('delete_file').classList.remove('display_block');
  document.getElementById('panel_post_block').classList.remove('panel_post_block_extend')
  document.getElementById('post_textarea').classList.remove('post_textarea_extended')
  if(document.getElementById('importedimage')){
    document.getElementById('importedimage').src = ""
    document.getElementById('importedimage').classList.remove("display_block")
    document.getElementById('importedimage').style.border = ""
  }else{
    document.getElementById('importedvideo').src = ""
    document.getElementById('importedvideo').classList.remove("display_block")
    document.getElementById('importedvideo').style.border = ""
  }
 
}

//Permet la suppression du fichier dans le fileinput à la modification d'un post
function resetFile2(){
  if(document.getElementById('importedimage_modify')){
    document.getElementById('importedimage_modify').src = ""
    document.getElementById('importedimage_modify').classList.remove("display_block")
    document.getElementById('importedimage_modify').style.border = ""
  }else{
    document.getElementById('importedvideo_modify').src = ""
    document.getElementById('importedvideo_modify').classList.remove("display_block")
    document.getElementById('importedvideo_modify').style.border = ""
  }

  
  const fileinput = document.getElementById('file_input');
  fileinput.value = "";
  document.getElementById('addimage_text_modify').textContent ="Ajouter une image";
  document.getElementById("file_input_modify").value = ""

  document.getElementById("file-name_modify").textContent = "";
  document.getElementById("file-size_modify").textContent = "";
  document.getElementById('addimage_text_modify').classList.remove('display_none');
  document.getElementById('container_file_modify').classList.remove('display_flex');
  document.getElementById('opentrashicon').classList.remove('display_block');
  document.getElementById('delete_file_modify').classList.remove('display_block');
  document.getElementById('panel_modify_block').classList.remove('panel_modify_block_extend')
  document.getElementById('modify_textarea').classList.remove('post_textarea_extended')


}

export default Home_Panel;
