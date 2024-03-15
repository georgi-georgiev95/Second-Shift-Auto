import { FormGroup, ValidatorFn } from "@angular/forms";


export function matchPasswordValidator(passCtrlOne: string, passCtrlTwo: string): ValidatorFn {
    return (control) => {
        const group = control as FormGroup;
        const passOneControl = group.get(passCtrlOne);
        const passTwoControl = group.get(passCtrlTwo);

        return passOneControl?.value === passTwoControl?.value ? null : { 'matchPasswordsValidator': true };
    }
}