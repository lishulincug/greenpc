let url='http://localhost:3000'
export const addWork=(data)=>{
  return axios.get(url+`/work/addWork?${data}`)
}
export const addBch=(data)=>{
  return axios.get(url+`/bch/addBch?${data}`)
}
export const findWork=()=>{
  return axios.get(url+`/work/findWork`)
}
