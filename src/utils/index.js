import axios from "axios"

export const fetch_get=async(url)=>{
    const response=await axios(url, {
      method: "GET",
      headers : {
        "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
      }
    });
    console.log("->>>>>>>>>",response)

    return response
}

export const create_User = async (url,data)=>{
  const response = await fetch(url,{
    method: "POST",
    headers : {
      "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
  });
  // console.log(response.json())
  return response;
}

export const fetch_getNotAuth=async(url)=>{
  const response=await axios(url, {
    method: "GET",
    headers : {
"Content-Type":"application/json",
    }
  });

  return response
}


export const create_post = async (url,formData) =>{
  try {
    const response = await axios(url,{
      method:"POST",
      headers : {
        "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
      },
      data:formData
    })
    console.log(response.status)
    return response.data;
  } catch (error) {
    console.log("Media Upload->> ERROR",error)
  }
}

// export const fetch_post=async(url)=>{
//   const response=await axios(url, {
//     method: "GET",
//     headers : {
//       "Authorization":"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
//     }
//   });
//   console.log("->>>>>>>>>",response)

//   return response
// }
