const formContainer = document.querySelector(".formContainer") as HTMLDivElement;
const loginContainer = document.querySelector(".loginContainer") as HTMLDivElement;



const toLogin = document.querySelector(".toLogin") as HTMLAnchorElement;
const toRegister = document.querySelector(".toRegister") as HTMLAnchorElement;

toLogin.addEventListener('click',()=>{
    if(formContainer.style.display = "flex"){
        formContainer.style.display ="none"
    loginContainer.style.display = "flex"
    
    }else{
        formContainer.style.display="flex"
        loginContainer.style.display="none"
    }
})

toRegister.addEventListener('click',()=>{
    if(formContainer.style.display = "none"){
        formContainer.style.display ="flex"
    loginContainer.style.display = "none"
    
    }else{
        formContainer.style.display="flex"
        loginContainer.style.display="none"
    }
})
const regForm = document.querySelector(".regForm") as HTMLFormElement;
const firstName = document.getElementById("firstName") as HTMLInputElement;
const lastName = document.getElementById("lastName") as HTMLInputElement;
const RegEmail = document.getElementById("RegEmail") as HTMLInputElement;
const Regpassword = document.getElementById("Regpassword") as HTMLInputElement;
const btnRegister = document.querySelector(".btnRegister") as HTMLButtonElement;
const regError = document.querySelector(".regError") as HTMLDivElement;

//Register Logic
class RegUser{
    static getUser(){
        return new RegUser
    }
    constructor(){}

    registerUser(fname:string, lname:string, email:string, password:string){
        const promise2= new Promise<{error?:string, message?:string }>((resolve, reject)=>{
            fetch('http://localhost:5000/users/create', {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body:JSON.stringify({
                    "firstName":fname,
                    "lastName":lname,
                    "email":email,
                    "password":password
                })
            }).then(res=>{
                resolve(res.json())
            }).catch(err=>{
                reject(err)
            })
        })
        promise2.then((data=>console.log(data))).catch(err=>console.log(err))
    }
}
btnRegister.addEventListener('click',(e)=>{
    e.preventDefault();
    const RegfName = firstName.value
    const ReglName = lastName.value
    const EmailReg = RegEmail.value
    const passwordReg = Regpassword.value
    
    
    if (!RegfName || !ReglName || !EmailReg || !passwordReg){
        regError.style.color="red"
        regError.textContent="All the fields are required"
        setTimeout(() => {
            regError.textContent=""
        }, 3000);
    }
    else{
        RegUser.getUser().registerUser(RegfName, ReglName, EmailReg,passwordReg)

        regError.style.color="green"
        regError.textContent="Registration Successful..."

        firstName.value = ""
        lastName.value = ""
        RegEmail.value = ""
        Regpassword.value = ""

        setTimeout(() => {
            formContainer.style.display="none"
            loginContainer.style.display = "flex"
            
        }, 3000);
        setTimeout(() => {
            regError.textContent=""
        }, 1000);

    }
})


//Login Logic
const loginForm = document.querySelector(".loginForm") as HTMLFormElement;
const txtemail = document.getElementById("txtemail") as HTMLInputElement;
const txtpassword = document.getElementById("txtpassword") as HTMLInputElement;
const btnLogin = document.querySelector(".btnLogin") as HTMLButtonElement;
const loginError= document.querySelector(".loginError")as HTMLDivElement;
    
class Users{
    static getUser(){
        return new Users()
    }
    constructor(){}

    loginUser(email:string, password:string){
        const promise1 = new Promise<{error?:string, token?:string, message?:string}>((resolve, reject)=>{
           
            
            fetch('http://localhost:5000/users/login',{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method:"POST",

                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(res=>{
                resolve(res.json())
            }).catch(err=>{
                loginError.textContent=(err.json(onmessage))
            })
        })
        promise1.then(data=> {
            data.token?localStorage.setItem('token', data.token):''
            this.redirect()
        }).catch(err=>console.log(err))
    }
    redirect(){
        const token = localStorage.getItem('token') as string

        new Promise <{email?:string, role?:string, userId?:number, password? :string}>((resolve, reject)=>{
            fetch('http://localhost:5000/projects/check',{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token':token
                },
                method:"GET"
            }).then(res=>resolve(res.json()))
            .catch(err=> reject(err))
        }).then(data=>{
            if (data.role === '1' && data.password !=="password"){
                localStorage.setItem('usrMail', data.email!);
                location.href ='admin.html'
            }else if(data.role === '0' && data.password !=="password"){
                localStorage.setItem('normalUser', data.email!)
                location.href = 'user.html'
            }
        })
}
}

btnLogin.addEventListener('click',(e)=>{
    e.preventDefault();
    const emailLog =txtemail.value
    const pwdLog =txtpassword.value

    if (!emailLog || !pwdLog){
        
        loginError.style.color="red"
        loginError.textContent="All Input Fieds Required"
        setTimeout(() => {
        loginError.textContent=""   
        }, 3000); 
    }else{        
        Users.getUser().loginUser(emailLog, pwdLog);   
        txtemail.value=""
        txtpassword.value=""     
    }
})



