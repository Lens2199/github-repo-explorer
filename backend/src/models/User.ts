import mongoose, { Document } from 'mongoose'

export interface IFavorite {
  repoId: number
  name: string
  html_url: string
}

export interface IUser extends Document {
  email: string
  password: string
  favorites: IFavorite[]
}

const userSchema = new mongoose.Schema<IUser>({
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

export default mongoose.model<IUser>('User', userSchema)