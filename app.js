const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
var studentmodel=Mongoose.model("students",
new Mongoose.Schema({
    admno:String,
    rollno:String,
    name:String,
    classn:String,
    parentname:String,
    mobileno:String,
    address:String

})
)
var facultymodel=Mongoose.model("faculties",
new Mongoose.Schema({
    name:String,
    education:String,
    mobile:String,
    address:String,
    pincode:String,
    district:String
})
)
app.post("/api/school",(req,res)=>{
    var getadmno=req.body.admno
    var getrollno=req.body.rollno
    var getname=req.body.name
    var getclassn=req.body.classn
    var getparentname=req.body.parentname
    var getmobileno=req.body.mobileno
    var getaddress=req.body.address

data={"admno":getadmno,"rollno":getrollno,"name":getname,"classn":getclassn,"parentname":getparentname,"mobileno":getmobileno,"address":getaddress}
let mystud=new studentmodel(data)
mystud.save((error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})    

    }
    else
    {
        res.send({"status":"success","data":data})
    }

})
})

Mongoose.connect("mongodb+srv://bookapp:3456@cluster0.9e3p4.mongodb.net/collegeDb")

app.post("/api/faculty",(req,res)=>{
    var data=req.body
    let ob =new facultymodel(data)
    ob.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})    

        }
        else
        {
            res.send({"status":"success","data":data})
        }


    })
    
})


app.get("/api/school",(req,res)=>{
    
    res.send("welcome")
})

app.listen(3500,()=>{
    console.log("server running")
})