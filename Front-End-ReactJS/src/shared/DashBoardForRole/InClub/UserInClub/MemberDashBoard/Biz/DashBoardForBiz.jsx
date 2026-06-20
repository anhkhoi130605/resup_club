import React from 'react';
import './DashBoardForBiz.css';

const stats = [{"label": "Yêu cầu", "value": "22"}, {"label": "Thỏa thuận", "value": "17"}, {"label": "Khách tiềm năng", "value": "38"}, {"label": "Hoàn thành", "value": "14"}];
const activities = [{"title": "Gửi email chăm sóc", "time": "20 phút trước"}, {"title": "Tổ chức demo sản phẩm", "time": "2 giờ trước"}, {"title": "Cập nhật lead mới", "time": "4 giờ trước"}, {"title": "Hoàn thành hợp đồng", "time": "1 ngày trước"}];
const metrics = [{"label": "Cuộc gọi", "value": "26"}, {"label": "Gặp khách hàng", "value": "7"}, {"label": "Tỉ lệ chốt", "value": "45%"}];

export default function DashBoardForBiz() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Biz Member</p>
          <h1>Dashboard Thành viên Kinh doanh</h1>
          <p>Giao diện tổng quan cho thành viên kinh doanh xem nhanh tiến độ và cơ hội.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Cập nhật</button>
          <button className="btn btn-secondary">Đánh giá</button>
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
