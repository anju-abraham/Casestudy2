// Task1: initiate app and run server at 3000
const express=require("express")
const app=express();
const BodyParser=require('body-parser')
const Cors=require("cors")
const Mongoose=require("mongoose")
const {EmpModel}=require('./model/Employee')

app.use(Cors())
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({extended:true}))

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

Mongoose.connect("mongodb+srv://anjuab44:pKkKcRt9Z3j1DnQP@cluster0.vxumfkk.mongodb.net/EmployeeDB?retryWrites=true&w=majority",{ useNewUrlParser : true})
.then(()=>{
    console.log('Connected..mongodb connected!');})
.catch(()=>{
    console.log("error mongodb not connected")
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
  try{
    //console.log(req.body)
    let data=await EmpModel.find();
    //res.json(data)
    res.status(200).json(data)
  }    
  catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  } 
})

//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
  try{
    let id=req.params.id;
    //console.log(req.body)
    let data=await EmpModel.findOne({_id:id})
    //res.json(data)
    res.status(200).json(data)
   }
    catch (error) {
      console.log(error)
      res.status(400).json(error.message)
  }
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async (req,res)=>{
    try {
      let item=req.body;
      //console.log(item)
      const data=new EmpModel(item)//validating
      const savedEmp=await data.save()//adding
      res.status(200).json('added successfully')          
     }
   catch (error) {
      console.log(error)
      res.status(400).json(error.message)
  }   
})

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
  // console.log(req.body)
  // let data=await EmpModel.deleteOne(req.body.id)

  try{
    let id=req.params.id;      
    const data=await EmpModel.findByIdAndDelete(id)
    res.status(200).json('deleted successfully')
  }        
  catch (error) {
    console.log(error)
    res.status(400).json('error')
  }

})


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist',async(req,res)=>{
  //console.log(req.body)
  try {
    let item =req.body
    // let id=req.params.id
    let id=req.body._id
    let updateData={$set:item}
    let updatedEmp=await EmpModel.findByIdAndUpdate({_id:id},updateData,{new:true})
    res.status(200).json(updatedEmp)
  }  
  catch (error) {
    console.log(error)
    res.status(400).json(error.message)
  }
}) 

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000,()=>{
    console.log('server started at port 3000')
})

