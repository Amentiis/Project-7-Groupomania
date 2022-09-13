import "../styles/home_panel.css";
import "../styles/all.min.css";
import { useEffect, useState, useCallback } from "react";
import ReactDOM from 'react-dom/client'
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";
import React from "react";
import profil from "../assets/profil.gif";
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
  const [postId, setpostId] = useState("");
  var [commentshow, setcommentshow] = useState("");
  const [isAdministrator, setisAdministrator] = useState("");


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



  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      hidepanelpost();
      hidepanelCommentary();
      hidepanelModify();
      showOptionPanel_commentary()
      showOptionPanel();
    }
  }, []);


  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  },);

  useEffect(() => {
    sessionStorage.removeItem("email");
    const userid = sessionStorage.getItem("userid");
    if (rendered) {
      fetch("http://localhost:3000/api/auth/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: userid,
        }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          setlastname(value.lastname);
          setfirstname(value.firstname);
          setisAdministrator(value.isAdministrator)
          refreshPostInPage();
          if(!sessionStorage.getItem('notifyOff') === true){
            if(lastname && firstname){
              sessionStorage.setItem('notifyOff', true);
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
  
    } else if (!rendered) {
      setRendered(true);
    }
    // eslint-disable-next-line
  }, [rendered,lastname,firstname]);


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

  function openCommentary(){
    if(commentshow){
      document.querySelector(`[data-id='${commentshow}']`).querySelector('.commentary_container').classList.add('commentary_open'); 
      document.querySelector(`[data-id='${commentshow}']`).querySelector('.commentary_container').classList.remove('commentary_close');
      setcommentshow(null)
    }
  }


  function openAndCloseCommentary(x){
   var commentary_container = x.target.closest('.article_container').querySelector('.commentary_container');

   if (!(commentary_container.classList.contains('commentary_open'))){
    commentary_container.classList.add('commentary_open');
    commentary_container.classList.remove('commentary_close');

  }else{
    commentary_container.classList.add('commentary_close');
    commentary_container.classList.remove('commentary_open');
  }
  }

  function displayPostOnScreen(allposts){
    allposts = allposts.reverse();
    for(let post in allposts){
      var author_firstname = allposts[post].firstname;
      var author_lastname = allposts[post].lastname;
      var author_id = allposts[post].userId;
      var textOfThePost = allposts[post].text;
      var image = allposts[post].imageUrl;
      var dateOfThePost = allposts[post].date;
      var idOfThePost = allposts[post]._id;
      var listOfLike = allposts[post].usersLiked;
      var numberOfLikes = allposts[post].likes;
      var allCommentary = allposts[post].commentary_list

      var main_container = document.getElementById('main_container');
      var article_container = document.createElement('div');
      article_container.classList.add("article_container");
      article_container.setAttribute("data-id",idOfThePost)
      main_container.appendChild(article_container);

      var poster_information = document.createElement('div');
      poster_information.classList.add("poster_information");
      article_container.appendChild(poster_information)


      var profilpicture = document.createElement('img');
      profilpicture.classList.add('profil');
      profilpicture.setAttribute('src',profil)
      poster_information.appendChild(profilpicture);

      var nameAndDate = document.createElement('div');
      nameAndDate.classList.add('nameanddate');
      poster_information.appendChild(nameAndDate);

      var authorOfThePost = document.createElement('p');
      authorOfThePost.innerHTML = `Poste de <span> ${author_firstname} ${author_lastname} <span>`
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
              <a className="link" href={image} target='_blank' rel="noreferrer">
              <img className="article_image" src={image} alt="" />
              </a>
            </div>
            <form onSubmit={likeanddisliked} className="likeandcomment_container">
            <button type="submit" id="test" className="button_icon_heart" >
                <FontAwesomeIcon className={(listOfLike.find(user => user === sessionStorage.getItem('userid')))? "icon_heart like" : "icon_heart"} icon={(listOfLike.find(user => user === sessionStorage.getItem('userid')))? faHeartsolid : faHeart}/>
                <p className="numberoflikes">{numberOfLikes}</p>
              </button>
              <div className="comment" onClick={openAndCloseCommentary}>
                <FontAwesomeIcon className="icon_comment" icon={faComments}/>
                <button type="button">Commentaire</button>
              </div>
              <OptionPanel itsYourPost={((author_id === sessionStorage.getItem('userid')) || isAdministrator)} />
              </form>
          </div>
        );
      }else{
        likeAndComment.render(
          <div>
            <p>{textOfThePost}</p>
          <form onSubmit={likeanddisliked} className="likeandcomment_container">
            <button id="test" className="button_icon_heart" >
              <FontAwesomeIcon className={(listOfLike.find(user => user === sessionStorage.getItem('userid')))? "icon_heart like" : "icon_heart"} icon={(listOfLike.find(user => user === sessionStorage.getItem('userid')))? faHeartsolid : faHeart}/>
              <p className="numberoflikes">{numberOfLikes}</p>
            </button>
            <div className="comment" onClick={openAndCloseCommentary}>
              <FontAwesomeIcon className="icon_comment" icon={faComments}/>
              <button type="button">Commentaire</button>
            </div>
            <OptionPanel itsYourPost={((author_id === sessionStorage.getItem('userid')) || isAdministrator)} />
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
        var author_commentary_firstname = allCommentary[singlecommentary].firstname;
        var author_commentary_lastname = allCommentary[singlecommentary].lastname;
        var author_commentary_userId = allCommentary[singlecommentary].userId;
        var commentary_date = allCommentary[singlecommentary].date;

        var commentary = document.createElement('div');
        commentary.classList.add('commentary');
        commentary.setAttribute("data-id",commentary_Id)
        commentary_container.appendChild(commentary);

        var author_information = document.createElement('div')
        author_information.classList.add('author_information')
        commentary.appendChild(author_information);
       
        var profile_icon = document.createElement('img');
        profile_icon.classList.add('profile_icon')
        profile_icon.src = 'http://localhost:3001/static/media/profil.c1441085a8157ae7561f.gif';
        author_information.appendChild(profile_icon)
        
        var authorAndDate = document.createElement('div')
        authorAndDate.classList.add('authoranddate')
        author_information.appendChild(authorAndDate);

        var author_name = document.createElement('p');
        author_name.classList.add("author_name");
        author_name.innerHTML = `Poste de <span> ${author_commentary_firstname} ${author_commentary_lastname} <span>`;
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
          <OptionPanelCommentary itsYourComment={((author_commentary_userId === sessionStorage.getItem('userid')) || isAdministrator || ( author_id === sessionStorage.getItem('userid')))} />
        );
      }
         


    }
    if(document.getElementById('.loader_container')){
      document.getElementById('.loader_container').remove();
    }

    openCommentary();
    
  } 


  
  function likeanddisliked(x){
    var idPost = x.target.parentElement.closest(".article_container").dataset.id;
    x.preventDefault()
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
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            like:  0,
            userId : sessionStorage.getItem('userid'),
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
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
          },
          body: JSON.stringify({
            like:  1,
            userId : sessionStorage.getItem('userid'),
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



  function refreshPostInPage(){
    fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': "Bearer " + sessionStorage.getItem("token"),
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
        displayPostOnScreen(allposts);
      })
  }
  const navigate = useNavigate();

  const placeholder_textarea = 'Que souhaitez-vous dire, ' + firstname + " ?";

  return (
    <div className="body_home">
      <header>
        <div className="header">
          <div className="left">
            <img src={logo} alt="Logo Groupomania" className="logo" />
          </div>
          <div className="right">
            <button onClick={showpanelpost} className="createpost">
              Créer un nouveau post
            </button>
            <div className="container_name">
              <p id="profile_button" className="profile">
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
        <div id="container_panel_post" className="container_panel_post">
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
                <img
                  id="importedimage"
                  className="importedimage"
                  src=""
                  alt=""
                />
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
        <div id="container_panel_modify" className="container_panel_modify">
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
                    onChange={fileAddToPanel2}
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
        <div id="container_panel_commentary" className="container_panel_commentary">
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
        <div id="main_container" className="main_container">
          <div id ="loader_container" className="loader_container">
            <div className="article_container">
              <div className="poster_information_loader">
                <div className="profil_loader"></div>
                <div className="nameanddate">
                  <p></p>
                  <p className="date"></p>
                </div>
              </div>
              <article className="article">
                <div className="likeandcomment_container">
                  <div className="button_icon_heart">
                  <i className="fa-solid fa-heart icon_heart_loader"></i>
                  </div>
                  <div className="comment_loader">
                  </div>
                </div>
              </article>
            </div>
            <div className="article_container">
              <div className="poster_information_loader">
                <div className="profil_loader"></div>
                <div className="nameanddate">
                  <p></p>
                  <p className="date"></p>
                </div>
              </div>
              <article className="article">
                <p></p>
                <div className="image_container_loader">
                  <div className="image_loader">
                  </div>
                </div>
                <div className="likeandcomment_container">
                  <div className="button_icon_heart">
                  <i className="fa-solid fa-heart icon_heart_loader"></i>
                  </div>
                  <div className="comment_loader">
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

  function returntologinpage() {
    sessionStorage.clear();
    navigate("/login");
  }



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
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
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

  function sendCommentary (e){
    e.preventDefault();
    const textareavalue = document.getElementById('commentary_textarea').value;
    const userId = sessionStorage.getItem('userid')

    
        fetch(`http://localhost:3000/api/comment/${postId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
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


  function modifyPost (e){
   
    e.preventDefault();
    let data = new FormData();
    const textareavalue = document.getElementById('modify_textarea').value;
    const fileinput = document.getElementById('file_input_modify');
    const image = fileinput.files[0];
    const userId = sessionStorage.getItem('userid')
    data.append('text', textareavalue);
    data.append('firstname' , firstname)
    data.append('lastname' , lastname)
    data.append('userId' , userId)
    console.log(image)
    
    if (image && image !== ""){
      data.append('image', image);
    }
        fetch(`http://localhost:3000/api/modify/${postId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
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


  function deletePost (e){
        e.preventDefault();
        var postIddelete = (e.target.closest('.article_container').dataset.id);
        fetch(`http://localhost:3000/api/post/${postIddelete}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': "Bearer " + sessionStorage.getItem("token"),
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

  function deleteComment (e){
    e.preventDefault();
    const userId = sessionStorage.getItem('userid')
    var commentIddelete = (e.target.closest('.commentary').dataset.id)
    var postIddelete = (e.target.closest('.article_container').dataset.id);

    fetch(`http://localhost:3000/api/comment/${postIddelete}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': "Bearer " + sessionStorage.getItem("token"),
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


  function fileAddToPanel(x){
    var fileinput =  x.target;
    var filename = fileinput.files[0].name;
    var filesize = fileinput.files[0].size;
    var image = document.getElementById('importedimage')
    var [file] = fileinput.files;
    image.src = URL.createObjectURL(file)
    document.getElementById('addimage_text').classList.add('display_none')
    document.getElementById('panel_post_block').classList.add('panel_post_block_extend')
    document.getElementById('post_textarea').classList.add('post_textarea_extended')
    document.getElementById('container_file').classList.add('display_flex')
    document.getElementById('opentrashicon').classList.add('display_block')
    document.getElementById('delete_file').classList.add('display_block')
    document.getElementById('addimage_text').textContent ="";
    image.style.border = "solid 4px #fd2d01"
    image.classList.add("display_block")
    document.getElementById("file-name").textContent = filename; 
	  document.getElementById("file-size").textContent = ((filesize/1024)).toFixed(1) + " KB";
  }

  function fileAddToPanel2(x){
    if(!(x.target === "_blank")){
      var fileinput =  x.target;
      var filename = fileinput.files[0].name;
      var filesize = fileinput.files[0].size;
      var image = document.getElementById('importedimage_modify')
      var [file] = fileinput.files;
      image.src = URL.createObjectURL(file)
      image.style.border = "solid 4px #fd2d01"
      image.classList.add("display_block")
    }else{
      image = document.getElementById('importedimage_modify')
      image.src = (x.getAttribute('href'));
      image.style.border = "solid 4px #fd2d01"
      image.classList.add("display_block")
    }
    

    document.getElementById('panel_modify_block').classList.add('panel_modify_block_extend')
    document.getElementById('modify_textarea').classList.add('post_textarea_extended')
    document.getElementById('container_file_modify').classList.add('display_none')
    document.getElementById('opentrashicon_modify').classList.add('display_block')
    document.getElementById('delete_file_modify').classList.add('display_block')
    document.getElementById('addimage_text_modify').textContent = "Remplacer l'image";

    document.getElementById("file-name_modify").textContent = filename? filename : ""; 
	  document.getElementById("file-size_modify").textContent = filesize? (((filesize/1024)).toFixed(1) + " KB") : "";
  }


  function textareaIsClicked(){
    if(!(document.getElementById('post_textarea').value === "")){
      document.getElementById('publish_button').classList.add('text_area_clicked')
      document.getElementById('publish_button').disabled = false; 
    }else{
      document.getElementById('publish_button').classList.remove('text_area_clicked')
      document.getElementById('publish_button').disabled = true; 
    }
  }

  function textareaIsClickedModify(){
    if(!(document.getElementById('modify_textarea').value === "")){
      document.getElementById('publish_button_modify').classList.add('text_area_clicked')
      document.getElementById('publish_button_modify').disabled = false; 
    }else{
      document.getElementById('publish_button_modify').classList.remove('text_area_clicked')
      document.getElementById('publish_button_modify').disabled = true; 
    }
  }

  
  function textareaIsClickedCommentary(){
    if(!(document.getElementById('commentary_textarea').value === "")){
      document.getElementById('publish_button_commentary').classList.add('text_area_clicked')
      document.getElementById('publish_button_commentary').disabled = false; 
    }else{
      document.getElementById('publish_button_commentary').classList.remove('text_area_clicked')
      document.getElementById('publish_button_commentary').disabled = true; 
    }
  }

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

  function showpanelpost() {
    if (document.getElementById("container_panel_post").classList.contains("container_panel_post_active")){
      document.getElementById("container_panel_post").classList.remove("container_panel_post_active");
    } else {
      document.getElementById("container_panel_post").classList.add("container_panel_post_active");
    }
  }
  
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

  function showpanelModify(x){
    var  oldtext = x.target.closest(".article").querySelector('p').textContent
    document.getElementById('modify_textarea').value = oldtext;
    var imageurlmodify = x.target.closest(".article").querySelector('.link');
    setpostId((x.target.closest(".article_container").dataset.id));
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
  function showpanelCommentary(e) {
    setcommentshow(e.target.parentElement.parentElement.parentElement.dataset.id)
    setpostId((e.target.closest(".article_container").dataset.id));
    if (document.getElementById("container_panel_commentary").classList.contains("container_panel_commentary_active")){
      document.getElementById("container_panel_commentary").classList.remove("container_panel_commentary_active");
    } else {
      document.getElementById("container_panel_commentary").classList.add("container_panel_commentary_active");
    }
  }
  
}



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



function resetFile(){
  const fileinput = document.getElementById('file_input');
  fileinput.value = "";
  document.getElementById('addimage_text').textContent ="Ajouter une image";
  document.getElementById('importedimage').style.border = ""
  document.getElementById("file-name").textContent = "";
  document.getElementById("file-size").textContent = "";
  document.getElementById('addimage_text').classList.remove('display_none');
  document.getElementById('container_file').classList.remove('display_flex');
  document.getElementById("file_input").value = ""
  document.getElementById('opentrashicon').classList.remove('display_block');
  document.getElementById('delete_file').classList.remove('display_block');
  document.getElementById('panel_post_block').classList.remove('panel_post_block_extend')
  document.getElementById('post_textarea').classList.remove('post_textarea_extended')
  document.getElementById('importedimage').src = ""
  document.getElementById('importedimage').classList.remove("display_block")
}

function resetFile2(){
  const fileinput = document.getElementById('file_input');
  fileinput.value = "";
  document.getElementById('addimage_text_modify').textContent ="Ajouter une image";
  document.getElementById("file_input_modify").value = ""
  document.getElementById('importedimage_modify').style.border = ""
  document.getElementById("file-name_modify").textContent = "";
  document.getElementById("file-size_modify").textContent = "";
  document.getElementById('addimage_text_modify').classList.remove('display_none');
  document.getElementById('container_file_modify').classList.remove('display_flex');
  document.getElementById('opentrashicon').classList.remove('display_block');
  document.getElementById('delete_file_modify').classList.remove('display_block');
  document.getElementById('panel_modify_block').classList.remove('panel_modify_block_extend')
  document.getElementById('modify_textarea').classList.remove('post_textarea_extended')
  document.getElementById('importedimage_modify').src = ""
  document.getElementById('importedimage_modify').classList.remove("display_block")

}





export default Home_Panel;
