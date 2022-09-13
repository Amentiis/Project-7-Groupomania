const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const modifyRoutes = require('./routes/modify');
const commentRoutes = require('./routes/comment');

mongoose.connect(`mongodb+srv://amentiis:alpine0753@cluster0.ab4tqtw.mongodb.net/Groupomania`,

  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // accéder à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With , Content, Accept, Content-Type, Authorization'); // ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoyer des requêtes avec les méthodes mentionnées
  next();


});

app.use(express.json());
app.use(express.urlencoded())
app.use('/api/auth',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/modify',modifyRoutes);
app.use('/api/comment',commentRoutes);
app.use('/images',express.static(path.join(__dirname,'images')));

module.exports = app;



