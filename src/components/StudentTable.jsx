import React from 'react';
import StudentItem from './StudentItem';

const StudentTable = ({ students, onDelete }) => {
  if (students.length === 0) {
    return <p className="empty-msg">Không có sinh viên nào trong danh sách phù hợp!</p>;
  }

  return (
    <table className="student-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Id</th>
          <th>Họ và Tên</th>
          <th>Lớp</th>
          <th>Điểm số</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <StudentItem
            key={student.id}
            index={index}
            student={student}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;