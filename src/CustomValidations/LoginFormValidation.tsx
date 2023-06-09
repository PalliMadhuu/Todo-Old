export const validateEmail=(recievedEmail:any)=>
{
  let regExp=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if(!regExp.test(recievedEmail))
    {
      return 'Please Enter Valid Email'
    }
    return ''
}
export const validatePassword=(recievedValue:any)=>
  {
let regexp=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!regexp.test(recievedValue))
    {
      return 'Use at least 8 characters Include uppercase and lowercase letters'
    }
    return ''
  }