import "./App.css";
import Input from "./Components/Input";
import radioIcon from "../public/assets/images/icon-radio-selected.svg";
import { useReducer, useRef, useState } from "react";
import initialState from "./Constants/FormInitialState";
import ACTIONS from "./Constants/Actions";
import Action, {
  SetInvalidSubmitAction,
  SetValidityAction,
  SetValueAction,
} from "./Models/Actions";
import State from "./Models/FormState";
import DialogBox from "./Components/DialogBox";
import checkBoxIcon from "../public/assets/images/icon-checkbox-check.svg";
// Users should be able to:
// - Complete the form and see a success toast message upon successful submission
// - Receive form validation messages if:
//   - A required field has been missed
//   - The email address is not formatted correctly
// - Complete the form only using their keyboard
// - Have inputs, error messages, and the success message announced on their screen reader
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function reducer(state: State, action: Action) {
  switch (action.type) {
    case ACTIONS.SET_VALUE: {
      const { field, value } = action as SetValueAction;
      const updatedField = { ...state[field], value };
      return { ...state, [field]: updatedField };
    }
    case ACTIONS.SET_VALIDITY: {
      const { field, invalid } = action as SetValidityAction;
      const updatedField = { ...state[field], invalid };
      return { ...state, [field]: updatedField };
    }

    case ACTIONS.INVALID_SUBMIT: {
      const { field, invalid, value } = action as SetInvalidSubmitAction;
      const updatedField = { ...state[field], invalid, value };
      return { ...state, [field]: updatedField };
    }
    case ACTIONS.RESET_FORM: {
      return initialState;
    }
    default:
      return state;
  }
}

function App() {
  const [form, setForm] = useReducer(reducer, initialState);
  const { firstName, lastName, emailAddress, queryType, message, consent } =
    form;

  const userNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailAddressRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const [isDone, setIsDone] = useState(false);

  function handleChange(field: keyof State, value: string) {
    let invalid = false;
    setForm({
      type: ACTIONS.SET_VALUE,
      field,
      value,
    });
    if (field === "emailAddress") invalid = !emailPattern.test(value);
    else invalid = value === "";
    setForm({
      type: ACTIONS.SET_VALIDITY,
      field,
      invalid,
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let isAllValid = true;
    for (const [key, object] of Object.entries(form)) {
      const { invalid, value } = object;
      if (invalid || value === undefined || value === "") {
        isAllValid = false;
        const field = key as keyof State;
        setForm({
          type: ACTIONS.INVALID_SUBMIT,
          field,
          invalid: true,
          value: "",
        });
      }
    }
    if (isAllValid) {
      userNameRef.current!.value = "";
      lastNameRef.current!.value = "";
      emailAddressRef.current!.value = "";
      messageRef.current!.value = "";
      consentRef.current!.checked = false;
      setIsDone(true);
      setForm({ type: ACTIONS.RESET_FORM });
    }
  }

  return (
    <main>
      {<DialogBox isDone={isDone} setIsDone={setIsDone} />}
      <div className="bg-primary-green-200 min-h-[100dvh] p-5 sm:grid sm:place-content-center sm:justify-stretch">
        <form
          className="p-6 space-y-5 bg-white rounded-xl sm:grid sm:grid-cols-2 sm:gap-3 sm:items-start sm:p-10 place-self-center sm:container sm:max-w-screen-md"
          onSubmit={handleFormSubmit}
        >
          <header className="sm:col-span-2">
            <h1 className="text-3xl font-bold ">Contact Us</h1>
          </header>
          <Input
            input={{
              label: "First Name",
              id: "firstName",
              name: "firstName",
              containerClass: "grid gap-2",
              labelClass: "text-sm",
              inputClass: `border px-6 py-2 sm:py-2.5 rounded-md  cursor-pointer outline-2 ${
                firstName.invalid || firstName.value === ""
                  ? "border-primary-red focus-visible:outline-primary-red hover:border-primary-red"
                  : "border-neutral-grey-500 focus-visible:outline-primary-green-600 hover:border-primary-green-600"
              }`,
              ref: userNameRef,
              handleChange: handleChange,
            }}
          >
            <Input.InputLabel />
            <Input.TextField />

            {firstName.value === "" && firstName.invalid && (
              <p className="text-sm font-semibold text-primary-red">
                This field is required.
              </p>
            )}
          </Input>
          <Input
            input={{
              label: "Last Name",
              id: "lastName",
              name: "lastName",
              containerClass: "grid gap-2",
              labelClass: "text-sm",
              inputClass: `border px-6 py-2 sm:py-2.5 rounded-md  cursor-pointer outline-2  ${
                lastName.invalid || lastName.value === ""
                  ? "border-primary-red focus-visible:outline-primary-red hover:border-primary-red"
                  : "border-neutral-grey-500 focus-visible:outline-primary-green-600 hover:border-primary-green-600"
              }`,
              ref: lastNameRef,
              handleChange: handleChange,
            }}
          >
            <Input.InputLabel />
            <Input.TextField />

            {lastName.value === "" && lastName.invalid && (
              <p className="text-sm font-semibold text-primary-red">
                This field is required.
              </p>
            )}
          </Input>
          <Input
            input={{
              label: "Email Address",
              id: "emailAddress",

              name: "emailAddress",
              containerClass: "grid gap-2 sm:col-span-2",
              labelClass: "text-sm",
              inputClass: `border px-6 py-2 sm:py-2.5 rounded-md  cursor-pointer outline-2  ${
                emailAddress.invalid || emailAddress.value === ""
                  ? "border-primary-red focus-visible:outline-primary-red hover:border-primary-red"
                  : "border-neutral-grey-500 focus-visible:outline-primary-green-600 hover:border-primary-green-600"
              }`,
              ref: emailAddressRef,
              handleChange: handleChange,
            }}
          >
            <Input.InputLabel />
            <Input.TextField />
            {emailAddress.invalid && emailAddress.value && (
              <p className="text-sm font-semibold text-primary-red">
                Please enter a valid email address.
              </p>
            )}
            {emailAddress.value === "" && emailAddress.invalid && (
              <p className="text-sm font-semibold text-primary-red">
                This field is required.
              </p>
            )}
          </Input>
          <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2 sm:gap-4">
            <label className="text-sm sm:col-span-2">
              Query Type
              <span className="font-extrabold text-primary-green-600"> *</span>
            </label>

            <Input
              input={{
                label: "General Enquiry",
                id: "generalEnquiry",

                name: "queryType",
                containerClass: `flex items-center border border-neutral-grey-500 px-6 py-2 sm:py-2.5 rounded-md gap-3 hover:border-primary-green-600 cursor-pointer relative hover:before:absolute hover:before:inset-0 ${
                  queryType.value === "generalEnquiry"
                    ? "bg-primary-green-200"
                    : ""
                }`,
                labelClass: "text-lg",
                inputClass:
                  "size-5 outline-2 focus-visible:outline-primary-green-600",
                value: queryType.value,
                handleChange: handleChange,
              }}
            >
              <span className="relative flex">
                <Input.Radio />
                {queryType.value === "generalEnquiry" && (
                  <img className="absolute top-0" src={radioIcon} alt="" />
                )}
              </span>
              <Input.InputLabel />
            </Input>

            <Input
              input={{
                label: "Support Request",
                id: "supportRequest",

                name: "queryType",
                containerClass: `flex items-center border border-neutral-grey-500 px-6 py-2 rounded-md gap-3 hover:border-primary-green-600 cursor-pointer relative hover:before:absolute hover:before:inset-0 sm:py-2.5 ${
                  queryType.value === "supportRequest"
                    ? "bg-primary-green-200"
                    : ""
                }`,
                labelClass: "text-lg",
                inputClass:
                  "size-5 outline-2 focus-visible:outline-primary-green-600",
                value: queryType.value,
                handleChange: handleChange,
              }}
            >
              <span className="relative flex">
                <Input.Radio />
                {queryType.value === "supportRequest" && (
                  <img className="absolute top-0" src={radioIcon} alt="" />
                )}
              </span>
              <Input.InputLabel />
            </Input>
            {queryType.value === "" && (
              <p className="text-sm font-semibold text-primary-red">
                Please select a query type.
              </p>
            )}
          </div>

          <Input
            input={{
              label: "Message",
              id: "message",
              name: "message",
              containerClass: "grid gap-2 sm:col-span-2",
              labelClass: "text-sm cursor-pointer",
              inputClass: `p-4 border rounded-lg cursor-pointer sm:min-h-32 outline-2 resize-none ${
                message.invalid || message.value === ""
                  ? "border-primary-red focus-visible:outline-primary-red hover:border-primary-red"
                  : "border-neutral-grey-500 focus-visible:outline-primary-green-600 hover:border-primary-green-600"
              }`,
              ref: messageRef,
              handleChange: handleChange,
            }}
          >
            <Input.InputLabel />
            <Input.TextArea />
            {message.invalid && message.value && (
              <p className="text-sm font-semibold text-primary-red">
                Message musbe atleast 3 characters above.
              </p>
            )}
            {message.value === "" && message.invalid && (
              <p className="text-sm font-semibold text-primary-red">
                This field is required.
              </p>
            )}
          </Input>

          <div className="sm:col-span-2">
            <Input
              input={{
                label: "I consent to being contacted by the team",
                id: "consent",
                name: "consent",
                containerClass: "flex items-center gap-4",
                labelClass: "text-sm cursor-pointer",
                inputClass:
                  "size-4 cursor-pointer outline-2 focus-visible:outline-primary-green-600",
                ref: consentRef,
                handleChange: handleChange,
              }}
            >
              <span className="relative flex">
                <Input.CheckBox />
                {consent.value === "consent" && (
                  <img
                    className="absolute inset-0 z-50 cursor-pointer"
                    src={checkBoxIcon}
                    alt="Checked icon"
                    aria-hidden
                    onClick={() => {
                      handleChange("consent", "");
                      consentRef.current!.checked = false;
                    }}
                  />
                )}
              </span>

              <Input.InputLabel />
            </Input>
            {consent.invalid && (
              <p className="mt-1 text-sm font-semibold text-primary-red">
                To submit this form, please consent to being contacted
              </p>
            )}
          </div>
          <button
            className={`min-w-full py-4 text-white rounded-md sm:col-span-2 sm:py-3 hover:bg-green-600 ${
              isDone ? "bg-primary-green-200" : "bg-primary-green-600"
            }`}
            disabled={isDone}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
