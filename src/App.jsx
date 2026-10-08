import React, { useState } from 'react';
import StudentTable from './components/StudentTable';
import './App.css';

const initialStudents = [
  { id: 101, name: 'Nguyễn Văn An', score: 8.5, class: 'D25CQCN01-B' },
  { id: 102, name: 'Trần Thị Bình', score: 4.0, class: 'D25CQCN02-B' },
  { id: 103, name: 'Lê Hoàng Cường', score: 7.0, class: 'D25CQCC01-B' },
  { id: 104, name: 'Phạm Minh Đức', score: 9.2, class: 'D25CQCC01-B' },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filterType, setFilterType] = useState('ALL');
  const [formData, setFormData] = useState({ name: '', score: '', studentClass: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { name, score, studentClass } = formData;

    if (!name.trim() || score === '' || !studentClass.trim()) {
      setError('Vui lòng nhập đầy đủ dữ liệu!');
      return;
    }

    const numericScore = parseFloat(score);


    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setError(`Điểm số không hợp lệ! Vui lòng nhập điểm từ 0 đến 10.`);
      return;
    }

    const newStudent = {
      id: Date.now().toString().slice(-4),
      name: name.trim(),
      score: numericScore,
      class: studentClass.trim(),
    };

    setStudents([...students, newStudent]);
    setFormData({ name: '', score: '', studentClass: '' });
    setError('');
  };

  const handleDeleteStudent = (id) => {
    const updatedList = students.filter((item) => item.id !== id);
    setStudents(updatedList);
  };

  const filteredStudents = students.filter((student) => {
    const { score } = student;
    if (filterType === 'GOOD') return score >= 8;
    if (filterType === 'FAIL') return score < 5;
    return true;
  });

  const totalStudents = students.length;
  const averageScore =
    totalStudents > 0
      ? (students.reduce((sum, item) => sum + item.score, 0) / totalStudents).toFixed(2)
      : 0;

  return (
    <div className="container">
      <h1>Quản lý điểm sinh viên</h1>

      <div className="stats-box">
        <p>{`Tổng số sinh viên: ${totalStudents}`}</p>
        <p>{`Điểm trung bình toàn lớp: ${averageScore}`}</p>
      </div>

      <div className="card">
        {error && <div className="error-alert">{error}</div>}
        <form onSubmit={handleAddStudent} className="student-form">
          <input
            type="text"
            name="name"
            placeholder="Nhập họ và tên..."
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            step="0.1"
            name="score"
            placeholder="Điểm số..."
            value={formData.score}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="studentClass"
            placeholder="Nhập lớp..."
            value={formData.studentClass}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn-add">Thêm</button>
        </form>
      </div>

      <div className="filter-bar">
        <span>Bộ lọc danh sách: </span>
        <button
          className={filterType === 'ALL' ? 'active' : ''}
          onClick={() => setFilterType('ALL')}
        >
          Tất cả ({students.length})
        </button>
        <button
          className={filterType === 'GOOD' ? 'active' : ''}
          onClick={() => setFilterType('GOOD')}
        >
          Sinh viên Giỏi({students.filter((s) => s.score >= 8).length})
        </button>
        <button
          className={filterType === 'FAIL' ? 'active' : ''}
          onClick={() => setFilterType('FAIL')}
        >
          Sinh viên Trượt môn({students.filter((s) => s.score < 5).length})
        </button>
      </div>

      <StudentTable
        students={filteredStudents}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default App;