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