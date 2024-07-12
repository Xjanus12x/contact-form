export type InitialFieldState = {
  value: string | undefined;
  invalid?: boolean | undefined;
};

type State = {
  firstName: InitialFieldState;
  lastName: InitialFieldState;
  emailAddress: InitialFieldState;
  queryType: InitialFieldState;
  message: InitialFieldState;
  consent: InitialFieldState;
};

export default State;
