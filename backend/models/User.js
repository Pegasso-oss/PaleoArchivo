const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // No puede haber dos PEGASSO
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [
    {
      _id: false, // Esto evita que cree un ID interno y limpie la vista en Atlas
      id: { type: String, required: true },
      nombre: { type: String, required: true }
    }
  ],
  avatar: {
    type: String,
    default: "https://via.placeholder.com/150" // Por si quieres ponerle foto
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);