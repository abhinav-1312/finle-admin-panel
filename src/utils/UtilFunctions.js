import axios from "axios"
import { TOKEN } from "./BaseUrl"

export const apiCall = async (method, url, payload= null) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN
      }
    }
    if(method === "GET") {
      try{
        const {data} = await axios.get(url, header)
        return data
      }
      catch(error){
        console.log("Error occured.", error)
        alert("Some error occured.")
      }
    }
    else if(method === "POST"){
      try{
        const {data} = await axios.post(url, payload, header)
        return data
      }catch(error){
        console.log("Error occured.", error)
        alert("Some error occured.")
      }
    }
  }

  export const  convertToDDMMYYYY = (dateString) => {
    // Create a Date object from the ISO string
    const date = new Date(dateString);
    
    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();
    
    // Format the date as dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

export const userVerified = async () => {
  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType")

  if(userType !== "admin" && userType !== "superAdmin"){
    alert("You are not an admin to perform the action.")
    return false;
  }

  const password = prompt("Please enter password to authenticate action.");
  if(!password){
    alert("Please enter password")
    return false;
  }
  else{
    try{
  
      const data = await axios.post("/auth-service/login", {userId, password})
      
      if(data.data.responseStatus.statusCode === 2){ // we get statuscode 2 when password is incorrect
        alert("Incorrect password. Cannot perform the action.")
        return false;
      } 
      return true;
    }catch(error){
      alert("Error authenticting user. Cannot perform the action.");
      console.log("error: ", error)
      return false
    }
  }

}