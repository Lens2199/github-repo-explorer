import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      repoId: Number,
      name: String,
      html_url: String,
    }
  ]
}, { timestamps: true })

export default mongoose.model('User', userSchema)