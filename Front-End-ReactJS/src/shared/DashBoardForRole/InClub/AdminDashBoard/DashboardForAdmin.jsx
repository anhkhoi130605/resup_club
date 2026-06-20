import React from 'react';
import './Dashboard.css';

const stats = [
  { label: 'Thành viên', value: '1.8k' },
  { label: 'Sự kiện', value: '24' },
  { label: 'Yêu cầu', value: '19' },
  { label: 'Báo cáo', value: '7' },
];

const activities = [
  { title: 'Phê duyệt chương trình mới', time: '10 phút trước' },
  { title: 'Cập nhật thông báo hệ thống', time: '45 phút trước' },
  { title: 'Xem báo cáo tài trợ', time: '2 giờ trước' },
  { title: 'Đã xử lý phản hồi', time: '5 giờ trước' },
];

const metrics = [
  { label: 'Hoạt động tuần', value: '12' },
  { label: 'Phản hồi mới', value: '32' },
  { label: 'Tỷ lệ hoàn thành', value: '94%' },
];

export default function DashboardForAdmin() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Admin</p>
          <h1>Dashboard Quản trị</h1>
          <p>Giao diện tổng quan dành cho quản trị viên, quản lý hoạt động câu lạc bộ và dữ liệu hệ thống.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Tạo báo cáo</button>
          <button className="btn btn-secondary">Quản lý sự kiện</button>
        </div>
      </section>

      <section className="overview-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="overview-card">
            <h2>{stat.label}</h2>
            <strong>{stat.value}</strong>
            <p>Đánh giá nhanh trạng thái hoạt động và chỉ số quan trọng.</p>
          </article>
        ))}
      </section>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Chỉ số quan trọng</h2>
          <div className="analytics-metrics">
            {metrics.map((item) => (
              <div key={item.label} className="analytics-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recent-section">
        <div className="recent-card">
          <h2>Hoạt động gần đây</h2>
          <div className="recent-list">
            {activities.map((item) => (
              <div key={item.title} className="recent-item">
                <span>{item.title}</span>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
