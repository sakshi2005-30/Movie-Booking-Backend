const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
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
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"please fill valid email"],
      lowercase:true,
      trim:true
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    userType: {
      type: String,
      required: true,
      default: "CUSTOMER",
    },
    userStatus: {
      type: String,
      required: true,
      default: "APPROVED",
    },
  },
  { timestamps: true },
);

userSchema.pre("save",async function(next){
  const user=this;
  const hash=await bcrypt.hash(this.password,10);
  this.password=hash
})
const User=mongoose.model("User",userSchema);
module.exports=User