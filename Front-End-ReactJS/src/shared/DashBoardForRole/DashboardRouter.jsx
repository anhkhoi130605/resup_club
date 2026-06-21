import React, { useState, useEffect } from 'react';

// Import các Dashboard của Admin
import DashboardForAdmin from './InClub/AdminDashBoard/DashboardForAdmin';

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
import LeaderDashBoardForMedia from './InClub/UserInClub/LeaderDashBoard/Media/DashBoardForMedia';

export default function DashboardRouter() {
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedClubStatus, setSelectedClubStatus] = useState(''); // InClub, OutClub
  const [selectedInClubRole, setSelectedInClubRole] = useState(''); // Leader, Member
  const [selectedOutClubRole, setSelectedOutClubRole] = useState(''); // Student, Sponsor

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
      return <DashboardForAdmin />;
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
    <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '70px' }}>
      
      {/* Dev Tool: Thanh chuyển đổi nhanh các Role Dashboard để Test */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #ff7a00',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '15px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ fontWeight: 'bold', color: '#ff7a00', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🛠️ DEV TEST ROLE:</span>
        </div>

        {/* Cấp 1: Chọn Role Hệ Thống */}
        <select 
          value={selectedRole} 
          onChange={(e) => setSelectedRole(e.target.value)}
          style={selectStyle}
        >
          <option value="User">Hệ thống: User</option>
          <option value="Admin">Hệ thống: Admin</option>
        </select>

        {selectedRole === 'User' && (
          <>
            {/* Cấp 2: Chọn InClub / OutClub */}
            <select 
              value={selectedClubStatus} 
              onChange={(e) => setSelectedClubStatus(e.target.value)}
              style={selectStyle}
            >
              <option value="OutClub">Trạng thái: Ngoài CLB (OutClub)</option>
              <option value="InClub">Trạng thái: Trong CLB (InClub)</option>
            </select>

            {/* Cấp 3: Nếu là InClub, chọn Bộ phận & Chức vụ nội bộ */}
            {selectedClubStatus === 'InClub' && (
              <>
                <select 
                  value={selectedInClubRole} 
                  onChange={(e) => setSelectedInClubRole(e.target.value)}
                  style={selectStyle}
                >
                  <option value="Member">Chức vụ: Thành viên (Member)</option>
                  <option value="Leader">Chức vụ: Trưởng ban (Leader)</option>
                </select>

                <select 
                  value={selectedDept} 
                  onChange={(e) => setSelectedDept(e.target.value)}
                  style={selectStyle}
                >
                  <option value="Biz">Ban: Kinh doanh (Biz)</option>
                  <option value="Human_Resource">Ban: Nhân sự (HR)</option>
                  <option value="Media">Ban: Truyền thông (Media)</option>
                </select>
              </>
            )}

            {/* Cấp 3: Nếu là OutClub, chọn Học sinh hay Nhà tài trợ */}
            {selectedClubStatus === 'OutClub' && (
              <select 
                value={selectedOutClubRole} 
                onChange={(e) => setSelectedOutClubRole(e.target.value)}
                style={selectStyle}
              >
                <option value="Student">Đối tượng: Sinh viên (Student)</option>
                <option value="Sponsor">Đối tượng: Nhà tài trợ (Sponsor)</option>
              </select>
            )}
          </>
        )}

        <div style={{ 
          fontSize: '13px', 
          color: '#555', 
          marginLeft: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-end',
          gap: '4px'
        }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#34A853',
                display: 'inline-block'
              }}></span>
              <span><strong>{user.email || user.Email}</strong></span>
            </div>
          )}
          <div style={{ fontSize: '11px', color: '#888' }}>
            Đang xem dưới quyền: <strong>{selectedRole}</strong>
            {selectedRole === 'User' && ` > ${selectedClubStatus}`}
            {selectedRole === 'User' && selectedClubStatus === 'InClub' && ` > ${selectedInClubRole} (${selectedDept})`}
            {selectedRole === 'User' && selectedClubStatus === 'OutClub' && ` > ${selectedOutClubRole}`}
          </div>
        </div>
      </div>

      {/* Render Dashboard tương ứng */}
      <div style={{ animation: 'fadeIn 0.5s ease' }}>
        {renderDashboard()}
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
