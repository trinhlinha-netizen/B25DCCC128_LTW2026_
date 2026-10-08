import React from "react";

const StudentItem = ({ student, index, onDelete }) => {
  const { id, name, score, class: className } = student;

  const getStatusBadge = (s) => {
    if (s >= 8) return <span className="badge badge-good">Giỏi</span>;
    if (s < 5) return <span className="badge badge-fail">Trượt</span>;
    return <span className="badge badge-pass">Đạt</span>;
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{`B25DCC${id}`}</td>
      <td>{name}</td>
      <td>{className}</td>
      <td className="score-cell">{`${score.toFixed(1)}`}</td>
      <td>{getStatusBadge(score)}</td>
      <td>
        <button className="btn-delete" onClick={() => onDelete(id)}>
          X
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
