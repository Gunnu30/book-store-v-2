import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/admin.css';

const Operations = () => {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const actions = [
    {
      title: "Add New Book",
      desc: "Upload cover to Cloudinary, set details, and link genres.",
      icon: "fa-plus-circle",
      color: "border-blue-500",
      lightBg: "bg-white",
      lightShadow: "shadow-blue-100/50", 
      hoverBg: "group-hover:bg-blue-500/10",
      path: "/admin/add-book"
    },
    {
      title: "Edit Inventory",
      desc: "Change book prices, titles, or update genre relevance scores.",
      icon: "fa-pen-to-square",
      color: "border-amber-500",
      lightBg: "bg-white",
      lightShadow: "shadow-amber-100/50",
      hoverBg: "group-hover:bg-amber-500/10",
      path: "/admin/edit-inventory"
    },
    {
      title: "Manage Genres",
      desc: "Add new categories or delete unused genres from the list.",
      icon: "fa-tags",
      color: "border-emerald-500",
      lightBg: "bg-white",
      lightShadow: "shadow-emerald-100/50",
      hoverBg: "group-hover:bg-emerald-500/10",
      path: "/admin/manage-genres"
    },
    {
      title: "User Permissions",
      desc: "View users like Ashrith and manage admin access.",
      icon: "fa-users-gear",
      color: "border-purple-500",
      lightBg: "bg-white",
      lightShadow: "shadow-purple-100/50",
      hoverBg: "group-hover:bg-purple-500/10",
      path: "/admin/users"
    }
  ];

  return (
    <div className={`main-operation-container min-h-screen w-full transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 mt-4 px-4">
          <h1 className={`text-xl font-bold `}>
            Store Operations
          </h1>
          <p className={`mt-2`}>
            Welcome back, Admin. Manage your books and database relationships.
          </p>
        </header>
        <ul>
          {actions.map((action,index) =>(
            <li key={index} className={`hover:${hoverBg}`} onClic={navigate(action.paht)}>
              <i className={`fa-solid ${action.icon}`}></i>
              <h3>{action.title}</h3>

              <p>{action.desc}</p>


            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Operations;
