import { useEffect } from 'react';
import '../global.css';



const usersList = [
    {userName : "Ashrith"},
    {userName : "Gunnu"},
    {userName : "Bhanu"},
    {userName : "Ravi"},
    {userName : "Raghava"},
    {userName : "Sanju"},
    {userName : "Naveen"},
    
]

const AdminDashboard = () => {
   

    useEffect(() =>{
        const getAdminDashboardDetails = async () => {
            const api = import.meta.env.VITE_API_URL;
            try{
                const res = await fetch(`${api}/admin/dashboard`,{method:"GET",credentials:'include'})
                const data = await res.json();
                console.log(data);
                if(!res){
                    //set message as error while fetching 
                }
                // add number of users to list in (usestate)
            }catch{
                console.log("error ")
            }
        }
        getAdminDashboardDetails();
    },[])
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='flex justify-center items-center'>
            <div className='flex flex-col w-half'>
                {usersList.map((value,index) => (
                    <li key={index}>{value.userName}</li>
                ))}
            </div>
            <div className='flex flex-col'>
                <p>hiiii</p>
            </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
