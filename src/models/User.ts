import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUser> {
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: [true, "User's name is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    // TODO: Auto update
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [3, "Password must be at least 3 characters"],
    select: false,
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    // Handle nested subdocuments
    for (let key in ret) {
      if (ret[key] instanceof Document) {
        ret[key] = ret[key].toJSON();
      }
    }

    // Ignore password, _id, and __v fields
    delete ret.password;
    delete ret._id;
    delete ret.__v;

    // Add id field using toHexString()
    if (doc._id) {
      ret.id = doc._id.toHexString();
      delete ret._id;
    }

    return ret;
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default model<IUser, IUserModel>("User", userSchema);
