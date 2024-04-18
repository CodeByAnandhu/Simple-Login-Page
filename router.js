
var express = require("express");
var router = express.Router();

const credential = {

    email :"anandhu@gmail.com",
    password : "123"
}

//login user validation checking session controll


router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
    
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');   
       

    }else{

        // const errorMessage = "Invalid username or password";
        // res.end(`<script>alert('${errorMessage}'); window.location='/login';</script>`);
        const errorMessage = "Invalid username or Password!!";
        
    res.send(`
      <script>
        alert('${errorMessage}');
        window.location='/';
      </script>
    `);
    }
});

  // res.end("Invalid Username Or Password")
        // res.render('login', { error: 'Invalid Username Or Password' });


//route for Dashboard welcom user

router.get('/dashboard',(req,res)=>{  

    if(req.session.user){
        
        res.render('dashboard',{user:req.session.user})   

    }else{

        res.redirect("/")
    }
})

//route for Logout session

router.get('/logout',(req,res)=>{

    req.session.destroy()
    res.redirect('/')
        // function(err){

    //     if(err){
    //         console.log(err);
    //         res.send("Error")
    //     }else{

    //         res.render('base',{title:"Express",logout:"Logout Successfully"})
    //     }
    // })
})

module.exports = router;