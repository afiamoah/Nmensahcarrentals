export let Info,info2
export const HideContact=()=>{
Info=document.getElementById("info").style.visibility="hidden"
return Info;
}

export const ShowInfo=()=>{
    
document.getElementById("submit").addEventListener('click',()=>{
    info2=document.getElementById("info").style.visibility="visible"
    return info2;
})
}

