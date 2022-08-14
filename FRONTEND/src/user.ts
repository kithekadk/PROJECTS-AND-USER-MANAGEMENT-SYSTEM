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

                if ( assignedProject[0].email == localStorage.getItem("normalUser")){
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