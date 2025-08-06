// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../AdminComponents/Layout'

// const AdminLayout = () => {
//   return (
//     <div className="admin-layout">
//      <Sidebar/>
//       <div className="admin-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../AdminComponents/Layout'
import Header from "../AdminComponents/AdminHeader"



const AdminLayout = ({  }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar receives state to open/close */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main layout section */}
      <div className="flex-1 flex flex-col overflow-hidden" >
        <Header
          title="Dashboard"
          setSidebarOpen={setSidebarOpen}
          showPrintButton={false} // optional
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {<Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
