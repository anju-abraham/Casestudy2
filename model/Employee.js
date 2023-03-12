const Mongoose=require("mongoose")
const EmpSchema=new Mongoose.Schema(
    {
        name:String,
        location:String,
        position:String,
        salary:Number
}
)

const EmpModel=Mongoose.model(
    "Employee",EmpSchema
)
module.exports={EmpModel}
