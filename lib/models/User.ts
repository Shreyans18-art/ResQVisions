


import { Schema, model, models, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'security' | 'ambulance';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      required: true, 
      enum: ['student', 'security', 'ambulance'] 
    },
  },
  { timestamps: true }
);


userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

export default models.User || model<IUser>('User', userSchema);