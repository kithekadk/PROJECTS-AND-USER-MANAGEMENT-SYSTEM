const userMail= document.getElementById("userRole") as HTMLParagraphElement;
const Mail = localStorage.getItem('usrMail')
interface project{
    projectId: string,
    projectName: string,
    description: string,
    deadline: string,
    userId:string
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

    if(!pjname || !pjdesc || !due){
        projectCreateError.style.color="red";
        projectCreateError.textContent="All fields required";
        setTimeout(() => {
           projectCreateError.textContent="" 
        }, 4000);
    }else{
        Project.getProject().createProject(pjname, pjdesc, due)
        projectCreateError.style.color="green";
        projectCreateError.textContent="Project created successfully";
        setTimeout(() => {
           projectCreateError.textContent="" 
        }, 3000);
        projectname.value="";
        projectDesc.value="";
        Deadline.value=""
        
    }
})
class Project{
    static getProject(){
        return new Project;
    }

    constructor(){}

    createProject(projectname:string, description:string, enddate:string){
        const promise = new Promise((resolve, reject)=>{
            fetch('http://localhost:5000/projects/create',{
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                method:'POST',
                body:JSON.stringify({
                    "projectName":projectname,
                    "description":description,
                    "endDate":enddate
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
                    temp += '<td>' + 'USER INCHARGE' + '</td>'
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
                
                console.log(completeProject)
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
                    displayComplete.textContent="No Pending Projects at the moment";
                }
            }
        )
    }
)