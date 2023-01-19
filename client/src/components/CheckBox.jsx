import React, { useRef } from "react";

const CheckBox = ({ text, checked, value, onChangeStatus, id, register }) => {
  const checkboxRef = useRef(null);

  // const checkboxRegister=register("labels",{required:true});
  // const imageRegister = register("image", { required: true });

  const selectCheckBox = () => {
    // checkboxRef.current.click();
  };

  return (
    <div className="mad-container">
      <div className="round">
        <input
          value={value}
          ref={checkboxRef}
          type="checkbox"
          checked={checked}
          onChange={onChangeStatus}
          id={id}
          {...register()}
        />
        <label htmlFor={id}></label>
      </div>
      <p onClick={onChangeStatus} className="mad">
        {text}
      </p>
    </div>
  );
};

export default CheckBox;
