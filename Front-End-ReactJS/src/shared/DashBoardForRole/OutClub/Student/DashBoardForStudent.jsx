import React from 'react';
import './DashBoardForStudent.css';

const stats = [{"label": "Sự kiện", "value": "9"}, {"label": "Tham gia", "value": "76"}, {"label": "Yêu cầu", "value": "16"}, {"label": "Học bổng", "value": "3"}];
const activities = [{"title": "Đăng ký sự kiện mới", "time": "5 phút trước"}, {"title": "Nhận thông báo học bổng", "time": "1 giờ trước"}, {"title": "Gửi phản hồi", "time": "4 giờ trước"}, {"title": "Hoàn thành báo cáo", "time": "1 ngày trước"}];
const metrics = [{"label": "Sự kiện sắp tới", "value": "2"}, {"label": "Điểm năng lực", "value": "88"}, {"label": "Thông báo mới", "value": "5"}];

export default function DashBoardForStudent() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Student</p>
          <h1>Dashboard Sinh viên</h1>
          <p>Giao diện tổng quan dành cho sinh viên ngoài câu lạc bộ, giúp nắm bắt hoạt động và cơ hội nhanh chóng.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Đăng ký</button>
          <button className="btn btn-secondary">Xem lịch</button>
        </div>
      </section>

      <section className="overview-grid">
        {stats.map((item) => (
          <article key={item.label} className="overview-card">
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Chỉ số chính</h2>
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
