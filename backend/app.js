const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config()

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// on utilise mongoose pour communiquer avec notre BDD MongoDB
mongoose
  .connect(
    process.env.SECRET_DATABASE, // on utilise dotenv
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Express récup toute les requests avec comme CONTENT TYPE json et met à dispo leur body sur l'objet req
app.use(express.json());

app.use((req, res, next) => {
  /* (*) permet d'accéder à une API depuis n'importe quelle origine */
  res.setHeader('Access-Control-Allow-Origin', '*');
  /* permet d'ajouter les headers mentionnés aux requêtes envoyés vers notre API (Origin, X-Requested-With etc..) */
  res.setHeader('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  /* permet d'envoyer des requêtes avec les méthodes mentionnées (GET, POST etc..) */
  res.setHeader('Access-Control-Allow-Methods', 
  'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/*Aide à protéger l'application de certaines des vulnérabilités connues du Web en configurant de manière
appropriée des en-têtes HTTP.*/
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;