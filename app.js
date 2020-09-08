var express = require("express"),
 app = express(),
 methodOverride = require("method-override"),
 bodyParser = require("body-parser"),
 mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/todo");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var todoSchema = new mongoose.Schema({
  title:String,
  body:String,
  created:{type:Date,default:Date.now}
});

var Todo = mongoose.model("Todo",todoSchema);

var motSchema = new mongoose.Schema({
  image:String
});



app.get("/" , function(req,res){
  res.render("Welcome");
});

app.get("/todos",function(req,res){
  Todo.find({},function(err,todos){
    if(err){
      console.log("err");
    }
    else{
      res.render("todo",{todos:todos});
    }
  });
});

app.get("/todos/new",function(req,res){
  res.render("new");
});

app.post("/todos",function(req,res){
  Todo.create(req.body.todos,function(err,newTodo){
    if(err){
      res.redirect("/todos");
    }  else{
      res.redirect("/todos");
    }
  });
});

app.get("/todos/:id",function(req,res){
  Todo.findById(req.params.id,function(err,found){
     if(err){
       console.log("/todos");
     } else{
       res.render("moto",{todo:found});
     }
  });
});

app.delete("/todos/:title",function(req,res){
  Todo.findByIdAndRemove(req.params.title,function(err){
    if(err){
      res.redirect("/todos");
    }else{
      res.redirect("/todos");
    }
  });
});

app.listen(3000, function(){
  console.log("hey!");
});
