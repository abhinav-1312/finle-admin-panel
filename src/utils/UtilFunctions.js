import axios from "axios"
import { BASE_URL, TOKEN } from "./BaseUrl"

export const apiCall = async (method, url, payload=null) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN
      }
    }
    if(method === "GET") {
      try{
        const {data} = await axios.get(BASE_URL + url, header)
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