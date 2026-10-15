import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/admin.css';

const Operations = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const actions = [
    {
      title: "Add New Book",
      desc: "Upload cover to Cloudinary, set details, and link genres.",
      icon: "fa-plus-circle",
      path: "/admin/add-book"
    },
    {
      title: "Edit Inventory",
      desc: "Change book prices, titles, or update genre relevance scores.",
      icon: "fa-pen-to-square",
      path: "/admin/edit-inventory"
    },
    {
      title: "Manage Genres",
      desc: "Add new categories or delete unused genres from the list.",
      icon: "fa-tags",
      path: "/admin/manage-genres"
    },
    {
      title: "User Permissions",
      desc: "View users like Ashrith and manage admin access.",
      icon: "fa-users-gear",
      path: "/admin/users"
    }
  ];

  return (
    <div className="main-operation-container min-h-screen transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 mt-4 px-4">
          <h1 className={`text-xl font-bold ${isDark ? 'text-[#D4AF37]' : 'text-gray-900'}`}>
            Store Operations
          </h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-[#D4AF37]/50' : 'text-gray-500'}`}>
            Welcome back, Admin. Manage your books and database relationships.
          </p>
        </header>

        <ul className="list-none px-4 divide-y divide-[#D4AF37]/15 border-t border-b border-[#D4AF37]/15">
          {actions.map((action, index) => (
            <li key={index}>
              <Link
                to={action.path}
                className="group flex items-center gap-4 py-5 px-2 -mx-2 rounded-md transition-all duration-150 hover:bg-[#D4AF37]/5 hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
              >
                <span className="shrink-0 w-11 h-11 p-4 rounded-full border border-[#D4AF37]/40 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                  <i className={`fa-solid ${action.icon} text-[#D4AF37] text-base`}></i>
                </span>
                <span className="min-w-0 pb-4">
                  <h3 className={`font-semibold ${isDark ? 'text-[#F3EAD3]' : 'text-gray-900'}`}>
                    {action.title}
                  </h3>
                  <p className={`text-sm mt-0.5 ${isDark ? 'text-[#F3EAD3]/55' : 'text-gray-500'}`}>
                    {action.desc}
                  </p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Operations;