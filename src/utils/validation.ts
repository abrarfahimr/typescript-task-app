//Validation

export interface Validatable{
  value: string;
  required?: boolean;
  minlength?: number;
  maxlength?: number;
}

export function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minlength !== null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minlength!;
  }
  if (validatableInput.maxlength !== null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxlength!;
  }

  return isValid;
}