const FormGroup = ({ label, placeholder, type = "text" }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>

      <input
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroup;