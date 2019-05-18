let url='http://101.200.50.47:3000'
export const login=(data)=>{
  return axios.get(url+`/user/login?${data}`)
}
export const addTask=(data)=>{
  return axios.get(url+`/work/addWork?${data}`)
}
export const addMoreTask=(data)=>{
  return axios.get(url+`/work/addMoreWork?${data}`)
}

export const addUser=(data)=>{
  return axios.get(url+`/user/addUser?${data}`)
}
export const addBch=(data)=>{
  return axios.get(url+`/bch/addBch?${data}`)
}

export const findTask=(data)=>{
  return axios.get(url+`/work/findWork?${data}`)
}
export const findAllUser=(data)=>{
  return axios.get(url+`/user/findAllUser`)
}
export const deleteUser=(data)=>{
  return axios.get(url+`/user/deleteUser?${data}`)
}
//任务完成
export const updateTask=(data)=>{
  return axios.get(url+`/work/updateWork?${data}`)
}