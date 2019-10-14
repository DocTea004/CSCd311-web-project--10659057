const express= require('express');
const router = express.Router();

router.get('/login',(req,res)=>
{
    res.render('login');
});

router.get('/register',(req,res)=>
{
    res.render('register');
});

router.get('/Hall',(req,res)=>
{
    res.render('Hall');
});

router.get('/dashboard',(req,res)=>
{
    res.render('dashboard');
});

router.post('/register',(req,res)=>
{
    const{name,ID,email,password,password2}= req.body;

    let errors =[];
    
   if(!name || !ID || !email || !password || !password2)
   {
       errors.push({msg: 'Please fill in all fields !'});
   }

   //Check passwords match

   if(password !=password2)
   {
       errors.push({msg : "Passwords do not match"});
   }

   //Check password length

   if(password.length <10)
   {
       errors.push({msg: "Password should atleast be 10 characters"});

   }

   if(errors.length>0)
   {
       res.render('register',{
           errors,
           name,
           ID,
           email,
           password,
           password2
       });
       
   }
   else{
       //res.send('pass');
       //Validation Passed

       User.findOne({ID:Id})
       .then(user =>
        {
            if(user)
            {
                //user exist
                errors.push({msg:'ID already registered'});                
       res.render('register',{
        error,
        name,
        ID,
        email,
        password,
        password2
    });
 }
    else{

        const newUser = new User({
            name,
            ID,
            email, 
            password
        });

        //hash password

        bcrypt.genSalt(10, (error,salt) =>
        {
            bcrypt.hash(newUser.password,salt, (error,hash)=>
            {
                if(error) throw error;
                //Set password to hash
                newUser.password= hash;
                //Save user
                newUser.save()
                .then(user =>
                    {
                        req.flash('success_msg', 'You are now Registered');
                        res.redirect('/users/login');
                    })
                .catch(error=> console.log(error));
            });

        });


    }
        });


   }

});


router.post('/login', (req,res)=>
{
    const {ID,password}= req.body;
    res.render('Hall')
});

router.post('/hall',(req,res)=>
{
    const{gender,Hall_name,Hall_annex}= req.body;
    res.render('Hall');
});

router.post('/dashboard',(req,res)=>
{
    res.render('dashboard');
})



module.exports= router;