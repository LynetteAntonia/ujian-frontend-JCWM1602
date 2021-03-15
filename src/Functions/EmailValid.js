function EmailValid(inputEmail){
    
    let splitEmail = inputEmail.split('@') //namaemail [0] @gmail.com [1]

    if(splitEmail.length !==2)return false

        let emailName = splitEmail[0]
        let hosting = splitEmail[1]
        
    if(emailName[0] >= 0)return false



    let splitHosting = hosting.split(".") //gmail[0].com[1]
    
    if(splitHosting.length <=1)return false
    for(let i =0; i < splitHosting.length; i++){
        if(splitHosting[i] === "" || splitHosting[i] ===" "){
            return false
        }
    }
    return true
}
export default EmailValid
