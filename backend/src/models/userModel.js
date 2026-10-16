// src/models/userModel.js
const {supabase,supabaseServiceRole} = require("../config/db");


exports.findByEmailOrUserName = async (username, email) => {
    const {data,error }= await supabaseServiceRole
    .from('users')
    .select('*')
    .or(`username.eq.${username},email.eq.${email}`)
    .maybeSingle();
    if(error){
      throw error;
    }
    console.log("obj",data)
    return data;
};

// Change 'password' to 'password_hash' in the INSERT query
exports.createUser = async (username, email, password, role) => {
  console.log(username,email,password,role)
  const {data,error} = await supabaseServiceRole
  .from("users")
  .insert([{username:username,email:email,password_hash:password,role:role}])  
  .select()
  .single();
  if(error)throw error;
  console.log(data,"hii")
  return data;
};

// Ensure this query selects the right columns
exports.findUserByEmail = async (email) => {
  console.log(email)
    const {data,error} = await supabaseServiceRole
    .from("users")
    .select("*")
    .eq('email',email);
    if(error)throw error;
    console.log(data,"data");
  return data[0];
};


exports.saveResetToken = async (adminId,token)=>{
  const expireDate = new Date(Date.now() + 15 * 60 * 1000) //15 mins expiary
  const {data,error} = await supabaseServiceRole
  .from("password_resets")
  .insert([{'admin_id':adminId,'token':token,'expires_at':expireDate,'used':false}])
  .select()
  .single();
  if(error)throw error;

  return data
}
exports.getUser = async (token) => {
  try{
  const {data,error} = await supabaseServiceRole
  .from("password_resets")
  .select("admin_id")
  .eq("used",false)
  .eq('token',token)
  .single();
  if(error)throw error;
  console.log(data);
  return data;
  }catch(e){
    return e;
  }
}

exports.updatePasswrod = async (user,newPassword) => {
  console.log(user)
  try{
    const {data,error } = await supabaseServiceRole
    .from("users")
    .update({"password_hash":newPassword})
    .eq("id" , user.admin_id)
    .select()
    .single();
    if(error)throw error;
    return data;
  }catch(e){
    console.log(e);
  }
}

