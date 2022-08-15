const usrEmail = document.getElementById("usrEmail") as HTMLParagraphElement
const userEmail=localStorage.getItem('normalUser')

if (userEmail){
    usrEmail.textContent=`${userEmail}`
}

fetch("http://localhost:5000/users/assigned",{
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
                
                const assignedProject : project[] = data.assignedProj
                console.log(assignedProject) 
                if (assignedProject.length ==0){
                    const assignedProjectDiv = document.querySelector(".assignedProjectDiv") as HTMLDivElement;
                    assignedProjectDiv.textContent="No task at the moment" 
                }
                else if ( assignedProject[0].email == localStorage.getItem("normalUser")){
                    let temp = "<table border width='700px' height='300px'>"

                    temp += '<thead>'+ '<b>'
                    temp += '<tr>'
                    temp += '<td>' + 'PROJECT ID' + '</td>'
                    temp += '<td>' + 'PROJECT NAME' + '</td>'
                    temp += '<td>' + 'PROJECT DESCRIPTION' + '</td>'
                    temp += '<td>' + 'PROJECT DEADLINE' + '</td>'
                    temp += '</tr>'
                    temp += '</b>'+'</thead>'
                    assignedProject.forEach(({projectId,projectName, description, deadline})=>{
                 
                        temp += '<tr>'
                        temp += '<td>' + projectId + '</td>'
                        temp += '<td>' + projectName + '</td>'
                        temp += '<td>' + description + '</td>'
                        temp += '<td>' + deadline + '</td>'
                        temp += '</tr>'
                    })
                    const assignedProjectDiv=document.querySelector(".assignedProjectDiv") as HTMLDivElement;
                    assignedProjectDiv.innerHTML=temp;
                    
                }else{
                    const assignedProjectDiv=document.querySelector(".assignedProjectDiv") as HTMLDivElement;
                    assignedProjectDiv.textContent="No Pending Projects at the moment";
                }
            }
            
        )
    }
)
//COMPLETING A PROJECT
const taskToComplete= document.getElementById("taskToComplete") as HTMLSelectElement
const completeThisTask = document.getElementById("completeThisTask") as HTMLInputElement
fetch("http://localhost:5000/users/assigned",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                               
                const assignedProject : project[] = data.assignedProj
                    if (assignedProject.length==0){
                        taskToComplete.innerHTML="no task"; 
                    }
                    else if ( assignedProject[0].email == localStorage.getItem("normalUser") ){
                    
                    assignedProject.forEach(({projectId})=>{
                                              
                        taskToComplete.innerHTML  = projectId 
                    })                   
                    
                }else{
                    taskToComplete.innerHTML="no task";
                } 
            }
        )
    }
)
completeThisTask.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!taskToComplete.innerHTML){
        taskToComplete.innerHTML="No task at the moment"
    }else{
       CompleteProject.getprojectId().getProject(taskToComplete.innerHTML)
    }
})

class CompleteProject{
    static getprojectId(){
        return new CompleteProject
    }
    constructor(){}
    
    getProject( projectId:string){
        const promise4= new Promise((resolve, reject)=>{
            fetch('http://localhost:5000/users/setDone',{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },method:"POST",
                body:JSON.stringify({
                    "projectId": projectId
                })
            }).then(res=>{
                resolve(res.json())
            }).catch(err=>{
                reject(err)
            })
        })
        promise4.then((data=>console.log(data))).catch(err=>console.log(err));
        setTimeout(() => {
        window.location.reload()   
        }, 1000);
        
    }
}

