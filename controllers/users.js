 const models = require('../models');
 
 exports.register = (req,res)=>{
     return models.User.findOne({
         username:req.body.username
     })
     .then(users=>
        {
          if(users)
          {
              return res.status(422).json({message:"Account already exists.Please Login"})
          }
          const newUser = new models.User({
              name : req.body.name,
              username : req.body.username,
              password : req.body.password
          })
          newUser.save();
          return res.status(200).json({message:"Registration successfull"});
        })
      // or can  be exported by using module.exports = {register ;}
}
exports.login = (req,res)=>{
    return models.User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    .then(users=>{
        if(!users)
        {
            return res.status(401).json({message:"Invalid username or Password"});
        }
       
       req.session.users=users;
       console.log(req.session.users);
        return res.status(200).json({message:"Login successfull"})
    })
}
exports.createEnquiry=(req,res)=>{
    const newEnquiry = new models.Enquiry({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        note:req.body.note,
        status:req.body.status,
        created_BY:req.session.users._id
    })
    newEnquiry.save();
    return res.status(200).json({message:"Enquiry added successfully"});

    }
exports.showEnquiry=(req,res)=>
{
    return models.Enquiry.find({})
    .then(enq=>
        {
            return res.status(200).json(enq);
        })
}
exports.saveEnquiry=(req,res)=>{
    
    return models.Enquiry.findOne({
        _id:req.params.id
    })
    .then(enq=>
        {
            console.log(enq)
         enq.name=req.body.name,
         enq.phone=req.body.phoneno,
         enq.email=req.body.email,
         enq.note=req.body.note,
         enq.status=req.body.status,
         enq.save();
         
        return res.status(200).json({message:"Enquiry updated successfully"});
        })
}
exports.enquirySearch=(req,res)=>
{    const page =parseInt(req.query.page);
     const limit =parseInt(req.query.limit);
     const skip = (page*limit);
     console.log(req.session.users);
     const query = {
        $or :[
            {name:new RegExp ("^"+req.query.search, "i")},
            {email:new RegExp (req.query.search, "i")},
            {status:new RegExp (req.query.search, "i")},
            {phone:new RegExp (req.query.search, "i")},
            {note:new RegExp (req.query.search, "i")} 
        ] ,
        created_BY:req.session.users._id
       
     };
     let count = 0;
      models.Enquiry.count(query)
      .then(c=>{
          count=c;
           return models.Enquiry.find(query)
           .limit(limit)   
           .skip(skip)
           .sort({
                 createdAt:'desc'
            })
        })
           .then(user=>
           {
            
            return res.status(200).json({total : count , data : user});
           

      });
    
    
}