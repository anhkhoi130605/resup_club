import React from 'react';
import './Dashboard.css';

const stats = [
  { label: 'Users', value: '1.2k' },
  { label: 'Events', value: '84' },
  { label: 'Active Projects', value: '28' },
  { label: 'Pending Requests', value: '12' },
];

const activities = [
  { title: 'New member joined', time: '5 phút trước' },
  { title: 'Event “Hackathon Spring” approved', time: '20 phút trước' },
  { title: 'Password change requested', time: '1 giờ trước' },
  { title: 'Feedback received from admin', time: '2 giờ trước' },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Dashboard chung</p>
          <h1>Quản lý ResUp</h1>
          <p>Trang tổng quan dùng chung cho các vai trò. Xem nhanh số liệu, lượt tương tác và hoạt động mới nhất trong hệ thống.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Tạo mới</button>
          <button className="btn btn-secondary">Báo cáo</button>
        </div>
      </section>

      <section className="overview-grid">
        {stats.map((stat) => (
          <article key={stat.label} className="overview-card">
            <h2>{stat.label}</h2>
            <strong>{stat.value}</strong>
            <p>Thông tin cập nhật mới nhất và số liệu tổng quan.</p>
          </article>
        ))}
      </section>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Hiệu suất chung</h2>
          <div className="analytics-metrics">
            <div className="analytics-metric">
              <span>Đăng ký mới</span>
              <strong>144</strong>
            </div>
            <div className="analytics-metric">
              <span>Lượt truy cập</span>
              <strong>8.4k</strong>
            </div>
            <div className="analytics-metric">
              <span>Phản hồi</span>
              <strong>32</strong>
            </div>
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
