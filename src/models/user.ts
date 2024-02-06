import mongoose, {Schema, Document,Model} from "mongoose";
import bcrypt from "bcrypt"


// create interfaces

interface Iuser{
    password: string,
    firstname:string,
    lastname:string,
    email:string,
    verified:boolean,
    token:string
}

// methods
interface IUserDocument extends Iuser, Document {
    setPassword: (password:string) => Promise <void>;
    checkPassword: (password: string) => Promise <boolean>;
    
};

// Statics
interface IUserModel extends Model<IUserDocument> {
    findByemail:(email:string) => Promise<IUserDocument>;
}

// userSchema

const userSchema: Schema<IUserDocument> = new Schema({
    email:{type:String, required: true},
    password:{type:String, required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    verified:{type:Boolean, required:false, default: false},
    token:{type:String, required:false,default:""}
})

userSchema.methods.setPassword = async function (password:string){
    const hash = await  bcrypt.hash(password, 10);
    this.password = hash
};

userSchema.methods.checkPassword = async function (password:string) {
    const result = await bcrypt.compare(password, this.password)
    return result;
    
}

userSchema.statics.findByemail = function (email:string) {
    return this.findOne({email})
    
}

const User = mongoose.model<IUserDocument,IUserModel>("User", userSchema);
export default User

