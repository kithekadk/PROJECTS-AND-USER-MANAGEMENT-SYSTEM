const regForm = document.querySelector(".regForm") as HTMLFormElement;


const formContainer = document.querySelector(".formContainer") as HTMLDivElement;
const loginContainer = document.querySelector(".loginContainer") as HTMLDivElement;


const btnLogin = document.querySelector(".btnLogin") as HTMLButtonElement;
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

const firstName = document.querySelector(".firstName") as HTMLInputElement;
const lastName = document.querySelector(".lastName") as HTMLInputElement;
const txtemail = document.querySelector(".txtemail") as HTMLInputElement;
const txtpassword = document.querySelector(".txtpassword") as HTMLInputElement;
const btnRegister = document.querySelector(".btnRegister") as HTMLButtonElement;
const loginForm = document.querySelector(".loginForm") as HTMLFormElement;
    
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
                resolve(err)
            })
        })
        promise1.then((data=> console.log(data))).catch(err=>console.log(err))
    }
}
const userEmail=txtemail.value 
const userpwd=txtpassword.value 
const inputs = (userEmail !== " " && userpwd !==" ")

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (!inputs){
        console.log('input all fields');    
    }else{
        Users.getUser().loginUser(userEmail,userpwd);
    }
})


