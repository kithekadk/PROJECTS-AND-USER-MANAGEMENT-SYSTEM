let logoutAdmin = document.querySelector(".logoutAdmin") as HTMLAnchorElement
logoutAdmin.addEventListener('click',(e)=>{
    e.preventDefault();
    location.href="index.html"
})

const userMail= document.getElementById("userRole") as HTMLParagraphElement;
const Mail = localStorage.getItem('usrMail')
interface project{
    projectId: string,
    projectName: string,
    description: string,
    deadline: string,
    email:string,
    userId:number
}
interface users{
    userId: number
    firstName: string
    lastName: string
    email: string
}

if (Mail){
    userMail.textContent = `${Mail}`
}

const projectname =document.getElementById("prjName") as HTMLInputElement;
const projectDesc =document.getElementById("projectDesc") as HTMLInputElement;
const Deadline =document.getElementById("Deadline") as HTMLInputElement;
const createProjectbtn = document.getElementById("btnPrjtcreate") as HTMLButtonElement;
const projectCreateError = document.querySelector(".projectCreateError") as HTMLDivElement;
createProjectbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const pjname = projectname.value
    const pjdesc = projectDesc.value
    const due = Deadline.value
    const user = idleuserEmails.value
    console.log(user);
    

    if(!pjname || !pjdesc || !due){
        projectCreateError.style.color="red";
        projectCreateError.textContent="All fields required";
        setTimeout(() => {
           projectCreateError.textContent="" 
        }, 4000);
    }else{
        Project.getProject().createProject(pjname, pjdesc, due, user)
        projectCreateError.style.color="green";
        projectCreateError.textContent="Project created successfully";
        setTimeout(() => {
           projectCreateError.textContent="" 
        }, 3000);
        
        projectname.value="";
        projectDesc.value="";
        Deadline.value=""
        idleuserEmails.value=""
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
})
class Project{
    static getProject(){
        return new Project;
    }

    constructor(){}

    createProject(projectname:string, description:string, enddate:string, userId:string){
        const promise = new Promise<{error?:string, message?:string}>((resolve, reject)=>{
            fetch('http://localhost:5000/projects/create',{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method:'POST',
                body:JSON.stringify({
                    "projectName":projectname,
                    "description":description,
                    "endDate":enddate,
                    "userId": userId
                })
            }).then(res=>{
                resolve(res.json())
            }).catch(err=>{
                reject(err)
            })
        })
        promise.then(data=> console.log(data)).catch(err=>console.log(err));
        
    }
}
//assigning projects
const idleuserEmails = document.getElementById("idleuserEmails") as HTMLSelectElement
fetch("http://localhost:5000/users/allusers",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                console.log(data);
                
                let pendingUsers: users[]= data.allusers
                // console.log(pendingUsers);
                
                if(pendingUsers.length>0){
                const userIdno = pendingUsers.filter((el)=>{
                    return el.userId
                })
                userIdno.forEach((el)=>{
                    let userID = el.userId
                    
                    const option= document.createElement("option")
                    option.innerHTML = `${userID}`
                    idleuserEmails.appendChild(option)
                })
                
                }
            }
        )
    }
)

fetch("http://localhost:5000/projects/pendingProjects",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                console.log(data)
                const myproject : project[] = data.project
                
                console.log(myproject)
                if (myproject.length > 0){

                    
                    
                    let temp = "<table border>"

                    temp += '<thead>'+ '<b>'
                    temp += '<tr>'
                    temp += '<td>' + 'ID' + '</td>'
                    temp += '<td>' + 'PROJECT NAME' + '</td>'
                    temp += '<td>' + 'PROJECT DESCRIPTION' + '</td>'
                    temp += '<td>' + 'PROJECT DEADLINE' + '</td>'
                    temp += '<td>' + 'USERID' + '</td>'
                    temp += '</tr>'
                    temp += '</b>'+'</thead>'
                    
                    myproject.forEach(({projectId,projectName, description, deadline,userId})=>{
                        
                    temp += '<tr>'
                    temp += '<td>' + projectId + '</td>'
                    temp += '<td>' + projectName + '</td>'
                    temp += '<td>' + description + '</td>'
                    temp += '<td>' + deadline + '</td>'
                    temp += '<td>' + userId + '</td>'
                    temp += '</tr>'

                    })
                    const displayPending=document.querySelector('.displayPending') as HTMLDivElement;
                    displayPending.innerHTML=temp
                    
                }else{
                    const displayPending=document.querySelector(".displayPending") as HTMLDivElement;
                    displayPending.innerHTML="No Pending Projects at the moment";
                }
            }
        )
    }
)

fetch("http://localhost:5000/projects/completeProjects",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                const completeProject : project[] = data.projectcomplete
                
                // console.log(completeProject)
                if (completeProject.length > 0){
                    let temp = "<table border>"

                    temp += '<thead>'+ '<b>'
                    temp += '<tr>'
                    temp += '<td>' + 'ID' + '</td>'
                    temp += '<td>' + 'PROJECT NAME' + '</td>'
                    temp += '<td>' + 'PROJECT DESCRIPTION' + '</td>'
                    temp += '<td>' + 'PROJECT DEADLINE' + '</td>'
                    temp += '</tr>'
                    temp += '</b>'+'</thead>'
                    completeProject.forEach(({projectId,projectName, description, deadline})=>{
                 
                        temp += '<tr>'
                        temp += '<td>' + projectId + '</td>'
                        temp += '<td>' + projectName + '</td>'
                        temp += '<td>' + description + '</td>'
                        temp += '<td>' + deadline + '</td>'
                        temp += '</tr>'
                    })
                    const displayComplete=document.querySelector(".displayComplete") as HTMLDivElement;
                    displayComplete.innerHTML=temp;
                    
                }else{
                    const displayComplete=document.querySelector(".displayComplete") as HTMLDivElement;
                    displayComplete.textContent="No Completed Projects at the moment";
                }
            }
        )
    }
)

const availableusers = document.querySelector(".availableusers") as HTMLDivElement
const createprojectDiv = document.getElementById("createprojectDiv") as HTMLAnchorElement
const checkuserDiv = document.getElementById("checkuserDiv") as HTMLAnchorElement
const uncompleted = document.querySelector(".uncompleted") as HTMLDivElement
const displayUsers = document.querySelector(".displayUsers") as HTMLDivElement
const createProjectForm = document.querySelector(".createProjectForm") as HTMLFormElement

createprojectDiv.addEventListener('click', ()=>{
    uncompleted.style.display="flex" 
    availableusers.style.display="none"   
})

checkuserDiv.addEventListener('click', ()=>{
    availableusers.style.display="block" 
    uncompleted.style.display="none"
})

fetch("http://localhost:5000/users/allusers",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                 
                const allUsers : users[] = data.allusers
                
                if (allUsers.length > 0){
                    let temp = "<table border>"

                    temp += '<thead>'+ '<b>'
                    temp += '<tr>'
                    temp += '<td>' + 'ID' + '</td>'
                    temp += '<td>' + 'PROJECT NAME' + '</td>'
                    temp += '<td>' + 'PROJECT DESCRIPTION' + '</td>'
                    temp += '<td>' + 'PROJECT DEADLINE' + '</td>'
                    temp += '</tr>'
                    temp += '</b>'+'</thead>'
                    allUsers.forEach(({userId,firstName,lastName,email})=>{
                 
                        temp += '<tr>'
                        temp += '<td>' + userId + '</td>'
                        temp += '<td>' + firstName + '</td>'
                        temp += '<td>' + lastName + '</td>'
                        temp += '<td>' + email + '</td>'
                        temp += '</tr>'
                    })
                    
                    displayUsers.innerHTML=temp;
                    
                }else{
                    
                    displayUsers.textContent="No users at the moment";
                }
            }
        )
    }
)



const pendingjob = document.getElementById("pendingjob") as HTMLSelectElement
fetch("http://localhost:5000/projects/pendingProjects",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                
                let pendingprojs :project[]= data.project
                if(pendingprojs.length>0){
                    const projIDs = pendingprojs.filter((el)=>{
                        return el.projectId
                    })
                    projIDs.forEach((el)=>{
                        let projid= el.projectId
                        const option1= document.createElement("option")
                        option1.innerHTML=`${projid}`
                        pendingjob.appendChild(option1)
                    })
                }else{
                    pendingjob.innerText="no pending projects"
                }
            }
        )
    }
)

const deleteProject = document.querySelector(".deleteProject") as HTMLButtonElement
deleteProject.addEventListener('click',(e)=>{
    e.preventDefault()
const taskid = (pendingjob.value)
console.log(taskid);

if (taskid){
    
    delProject.getProject().deleteNow(taskid)
    console.log(pendingjob.innerText);
    setTimeout(() => {
        window.location.reload()
    }, 3000);
}
})

class delProject{
    static getProject(){
        return new delProject
    }
    constructor(){}
    deleteNow(projectId:string){
        const promise5 = new Promise<{error?:string, message?:string}>((resolve, reject)=>{
            fetch("http://localhost:5000/projects/delete",{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method:"POST",
                body:JSON.stringify({
                    "projectId": projectId
                })
            }).then(res=>{
                resolve(res.json())
            }).catch(err=>{
                reject(err)
            })
        })
        promise5.then((data=>console.log(data))).catch(err=>console.log(err)
        )
    }
}
