import ACTIONS from "../Constants/Actions";
import State from "./FormState";

export type SetValueAction = {
  type: typeof ACTIONS.SET_VALUE;
  field: keyof State;
  value: string;
};

export type SetValidityAction = {
  type: typeof ACTIONS.SET_VALIDITY;
  field: keyof State;
  invalid: boolean | undefined;
};

export type SetInvalidSubmitAction = {
  type: typeof ACTIONS.INVALID_SUBMIT;
  field: keyof State;
  value: string;
  invalid: boolean;
};

export type ResetForm = {
  type: typeof ACTIONS.RESET_FORM;
};

type Action =
  | SetValueAction
  | SetValidityAction
  | SetInvalidSubmitAction
  | ResetForm;

export default Action;
