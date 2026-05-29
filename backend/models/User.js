const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  bio: {
    type: String,
    default: "",
    maxlength: 300
  },
  avatar: {
    type: String,
    default: ""
  },
  favorites: [
    {
      _id: false,
      id: { type: String, required: true },
      nombre: { type: String, required: true },
      dieta: { type: String, default: "" }
    }
  ],
  history: [
    {
      _id: false,
      animalId: { type: String, required: true },
      animalNombre: { type: String, default: "" },
      animalEra: { type: String, default: "" },
      visitedAt: { type: Date, default: Date.now }
    }
  ],
  notes: [
    {
      _id: false,
      animalId: { type: String, required: true },
      animalNombre: { type: String, default: "" },
      text: { type: String, default: "" },
      updatedAt: { type: Date, default: Date.now }
    }
  ],
  isAdmin: { type: Boolean, default: false },
  suggestions: [{
    nombre:  { type: String, required: true },
    periodo: { type: String, required: true },
    fuente:  { type: String, default: "" },
    foto:    { type: String, default: "" },
    fecha:   { type: Date,   default: Date.now },
  }],
  achievements: [
    {
      _id: false,
      id: { type: String, required: true },
      unlockedAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);