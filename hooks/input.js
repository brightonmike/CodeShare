import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};

export const useInputArray = initialValue => {
  const [values, setValues] = useState(initialValue);

  return {
    values,
    setValues,
    reset: () => setValues([]),
    bind: {
      values,
      onChange: value => {
        setValues([...values, ...[value]]);
        console.log(values);
      }
    }
  };
};