const { supabaseServiceRole } = require("../config/db")




exports.getAllUsers = async () =>{
    try{
        const {data,error} = await supabaseServiceRole 
        .from("users")
        .select("*")
        .eq("role" , 'user');

        if(error)throw error;
        console.log("hii" , data)
        return data;
    }catch(err){
        return err;
    }
}
