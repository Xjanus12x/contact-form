import State, { InitialFieldState } from "../Models/FormState";

const initialFieldState: InitialFieldState = {
  value: undefined,
  invalid: undefined,
};

const initialState: State = {
  firstName: initialFieldState,
  lastName: initialFieldState,
  emailAddress: initialFieldState,
  queryType: initialFieldState,
  message: initialFieldState,
  consent: initialFieldState,
};

export default initialState;
