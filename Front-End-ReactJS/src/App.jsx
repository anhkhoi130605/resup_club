import { useEffect, useState } from 'react';
import { getHello } from './api/api';

function App() {
  const [message, setMessage] = useState('Đang tải...');

  useEffect(() => {
    getHello()
      .then((data) => setMessage(data.message || 'Chưa có dữ liệu'))
      .catch(() => setMessage('Không thể kết nối API'));
  }, []);

  return (
    <div className="app-shell">
      <header>
        <h1>ResUpClub Frontend</h1>
      </header>

      <main>
        <section className="card">
          <h2>Demo kết nối backend</h2>
          <p>{message}</p>
          <p>
            Bạn có thể mở `src/api/api.js` để gọi API thực tế của backend.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
