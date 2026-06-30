const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const {USER_STATUS,USER_TYPE}=require("../utils/constants");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "please fill valid email",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    userType: {
      type: String,
      required: true,
      enum: {
        values: [USER_TYPE.customer, USER_TYPE.client, USER_TYPE.admin],
        message: "Invalid user type",
      },
      default: USER_TYPE.customer,
    },
    userStatus: {
      type: String,
      required: true,
      enum: {
        values: [USER_STATUS.approved, USER_STATUS.pending, USER_STATUS.rejected],
        message: "Invalid status type",
      },
      default: USER_STATUS.approved
    },
  },
  { timestamps: true },
);

userSchema.pre("save",async function(next){
  const user=this;
  const hash=await bcrypt.hash(this.password,10);
  this.password=hash
})
userSchema.methods.isValidPassword=async function (plainPassword){
  const currentUser=this;
  const compare=await bcrypt.compare(plainPassword,this.password);
  return compare;
}
const User=mongoose.model("User",userSchema);
module.exports=User