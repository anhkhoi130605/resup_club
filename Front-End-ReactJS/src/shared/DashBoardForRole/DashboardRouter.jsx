import React, { useState, useEffect } from 'react';

// Import các Dashboard của Admin
import DashboardForAdmin from './InClub/AdminDashBoard/DashboardForAdmin';
import UserManagement from './InClub/AdminDashBoard/UserManagement';
import RecruitmentManagement from './InClub/AdminDashBoard/Recruitment/RecruitmentManagement';
import MemberManagement from './InClub/AdminDashBoard/Members/MemberManagement';
import EventManagement from './InClub/AdminDashBoard/Events/EventManagement';
import FinancialManagement from './InClub/AdminDashBoard/Finance/FinancialManagement';
import SpeakerManagement from './InClub/AdminDashBoard/Speakers/SpeakerManagement';
import SponsorManagement from './InClub/AdminDashBoard/Sponsors/SponsorManagement';

// Import các Dashboard của OutClub
import DashBoardForStudent from './OutClub/Student/DashBoardForStudent';
import DashBoardForSponSor from './OutClub/SponSor/DashBoardForSponSor';

// Import các Dashboard của InClub (Member)
import MemberDashBoardForBiz from './InClub/UserInClub/MemberDashBoard/Biz/DashBoardForBiz';
import MemberDashBoardForHR from './InClub/UserInClub/MemberDashBoard/Human_Resource/DashBoardForHR';
import MemberDashBoardForMedia from './InClub/UserInClub/MemberDashBoard/Media/DashBoardForMedia';

// Import các Dashboard của InClub (Leader)
import LeaderDashBoardForBiz from './InClub/UserInClub/LeaderDashBoard/Biz/DashBoardForBiz';
import LeaderDashBoardForHR from './InClub/UserInClub/LeaderDashBoard/Human_Resource/DashBoardForHR';
// Import các Dashboard của InClub (Leader)
import LeaderDashBoardForMedia from './InClub/UserInClub/LeaderDashBoard/Media/DashBoardForMedia';
import Sidebar from '../components/Sidebar/Sidebar';

export default function DashboardRouter() {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedClubStatus, setSelectedClubStatus] = useState(''); // InClub, OutClub
  const [selectedInClubRole, setSelectedInClubRole] = useState(''); // Leader, Member
  const [selectedOutClubRole, setSelectedOutClubRole] = useState(''); // Student, Sponsor
  const [activeItem, setActiveItem] = useState('overview');

  // Đọc user từ localStorage khi mount
  useEffect(() => {
    const savedUserStr = localStorage.getItem('user');
    if (savedUserStr) {
      try {
        const savedUser = JSON.parse(savedUserStr);
        setUser(savedUser);

        // Khởi tạo các trạng thái từ user thật trong DB
        setSelectedRole(savedUser.role || savedUser.Role || 'User');

        const clubStatus = savedUser.memberInOrOutClub === 'InClub' || savedUser.memberInOrOutClub === 0 ? 'InClub' : 'OutClub';
        setSelectedClubStatus(clubStatus);

        setSelectedDept(savedUser.department || 'Biz');
        setSelectedInClubRole(savedUser.roleInClub || 'Member');
        setSelectedOutClubRole(savedUser.roleOutClub || 'Student');
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    } else {
      // Giá trị mặc định nếu chưa đăng nhập hoặc chạy test trực tiếp
      setSelectedRole('User');
      setSelectedClubStatus('OutClub');
      setSelectedOutClubRole('Student');
    }
  }, []);

  // Xác định Dashboard nào cần được render
  const renderDashboard = () => {
    // 1. Nếu là Admin
    if (selectedRole === 'Admin') {
      switch (activeItem) {
        case 'users':
          return <UserManagement />;
        case 'recruitment':
          return <RecruitmentManagement />;
        case 'members':
          return <MemberManagement />;
        case 'events':
          return <EventManagement />;
        case 'finance':
          return <FinancialManagement />;
        case 'speakers':
          return <SpeakerManagement />;
        case 'sponsors':
          return <SponsorManagement />;
        default:
          return <DashboardForAdmin />;
      }
    }

    // 2. Nếu là User
    if (selectedClubStatus === 'InClub') {
      // Thành viên trong câu lạc bộ
      if (selectedInClubRole === 'Leader') {
        // Leader
        switch (selectedDept) {
          case 'Biz':
            return <LeaderDashBoardForBiz />;
          case 'Human_Resource':
            return <LeaderDashBoardForHR />;
          case 'Media':
            return <LeaderDashBoardForMedia />;
          default:
            return <LeaderDashBoardForBiz />;
        }
      } else {
        // Member thường
        switch (selectedDept) {
          case 'Biz':
            return <MemberDashBoardForBiz />;
          case 'Human_Resource':
            return <MemberDashBoardForHR />;
          case 'Media':
            return <MemberDashBoardForMedia />;
          default:
            return <MemberDashBoardForBiz />;
        }
      }
    } else {
      // Người dùng ngoài câu lạc bộ
      if (selectedOutClubRole === 'Sponsor') {
        return <DashBoardForSponSor />;
      }
      return <DashBoardForStudent />;
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Layout Area side-by-side: Sidebar & Content Panel */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* SIDEBAR NAVIGATION */}
        <Sidebar
          role={selectedRole}
          setRole={setSelectedRole}
          clubStatus={selectedClubStatus}
          setClubStatus={setSelectedClubStatus}
          inClubRole={selectedInClubRole}
          setInClubRole={setSelectedInClubRole}
          outClubRole={selectedOutClubRole}
          setOutClubRole={setSelectedOutClubRole}
          dept={selectedDept}
          setDept={setSelectedDept}
          user={user}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        {/* DYNAMIC DASHBOARD PAGE */}
        <div style={{ flex: 1, minWidth: 0, animation: 'fadeIn 0.5s ease' }}>
          {renderDashboard()}
        </div>

      </div>
    </div>
  );
}

const selectStyle = {
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  fontSize: '13px',
  color: '#333',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
  fontFamily: 'Inter, sans-serif'
};
