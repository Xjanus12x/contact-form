import { createContext, PropsWithChildren, useContext } from "react";
import State from "../Models/FormState";

type InputData = {
  label: string;
  id: string;
  name: keyof State;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  handleChange: (field: keyof State, value: string) => void;
};

type InputContextType = {
  input: InputData;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

function useInputContext() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputProvider");
  }
  return context;
}

type InputProps = PropsWithChildren & {
  input: InputData;
};

function Input({ input, children }: InputProps) {
  return (
    <InputContext.Provider value={{ input }}>
      <div className={input.containerClass}>{children}</div>
    </InputContext.Provider>
  );
}

Input.InputLabel = () => {
  const { input } = useInputContext();
  return (
    <label className={input.labelClass} htmlFor={input.id}>
      {input.label}
      <span className="font-extrabold text-primary-green-600"> *</span>
    </label>
  );
};

Input.TextField = () => {
  const { input } = useInputContext();

  return (
    <input
      className={input.inputClass}
      ref={input.ref as React.Ref<HTMLInputElement>}
      type="text"
      id={input.id}
      name={input.name as string}
      onChange={(e) =>
        input.handleChange(input.name as keyof State, e.target.value)
      }
    />
  );
};

Input.Radio = () => {
  const { input } = useInputContext();
  return (
    <input
      className={input.inputClass}
      ref={input.ref as React.Ref<HTMLInputElement>}
      type="radio"
      id={input.id}
      name={input.name as string}
      checked={input.value === input.id}
      value={input.id}
      onChange={(e) =>
        input.handleChange(input.name as keyof State, e.target.value)
      }
    />
  );
};

Input.CheckBox = () => {
  const { input } = useInputContext();
  return (
    <input
      className={input.inputClass}
      ref={input.ref as React.Ref<HTMLInputElement>}
      type="checkbox"
      id={input.id}
      name={input.name as string}
      // checked={!(input.value === undefined || input.value === "")}
      onChange={(e) => {
        input.handleChange(
          input.name as keyof State,
          e.target.checked ? input.id : ""
        );
      }}
    />
  );
};

Input.TextArea = () => {
  const { input } = useInputContext();
  return (
    <textarea
      className={`${input.inputClass}`}
      ref={input.ref as React.Ref<HTMLTextAreaElement>}
      name={input.name}
      id={input.name}
      onChange={(e) =>
        input.handleChange(input.name as keyof State, e.target.value)
      }
    />
  );
};

export default Input;
