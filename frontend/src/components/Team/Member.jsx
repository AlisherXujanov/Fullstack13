import React from "react";
import PropTypes from "prop-types";

function Member({ image, alt, name, title, onClick }) {
  return (
    <div className="member-wrapper" onClick={onClick}>
      <img src={image} alt={alt} className="member-image" />
      <h3>{name}</h3>
      <p>{title}</p>
    </div>
  );
}

// Проверяем, чтобы все нужные свойства были переданы
Member.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Member;