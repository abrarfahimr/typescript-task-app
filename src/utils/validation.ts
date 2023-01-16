//Validation

export interface Validatable{
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export function validate(valdatableInput: Validatable) {
  let isValid = true;
   if (valdatableInput.required) {
      isValid = isValid && valdatableInput.value.toString().trim().length !== 0;
    }
    if (valdatableInput.minLength != null && typeof valdatableInput.value === 'string') {
      isValid = isValid && valdatableInput.value.length >= valdatableInput.minLength;
    }
    if (valdatableInput.maxLength != null && typeof valdatableInput.value === 'string') {
      isValid = isValid && valdatableInput.value.length <= valdatableInput.maxLength;
    }

  return isValid;
}