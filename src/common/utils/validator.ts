export enum ValidationRule {
    Name = 'Name',
    Login = 'login',
    Email = 'email',
    Password = 'password',
    Phone = 'Phone',
}

export default function validateForm(rule: ValidationRule, formValue: string) {
    switch (rule) {
        case ValidationRule.Name: {
            if (!/^[A-ZА-Я][a-zа-я]+$/.test(formValue)) {
                return 'Некорректно введено Имя или Фамилия';
            }
            break;
        }
        case ValidationRule.Login:
            if (formValue.length < 3 || formValue.length > 20) {
                return 'Длина должна быть от 3 до 20 символов';
            }

            if (!/^[a-zA-Z0-9._]+$/.test(formValue)) {
                return 'Некорректный логин';
            }
            break;
        case ValidationRule.Password: 
            if (formValue.length < 8 || formValue.length > 40) {
                return 'Длина должна быть от 8 до 40 символов';
            }
            if (!/\d/.test(formValue)) {
				return 'Должна быть хотя бы одна цифра';
			}
			if (!/[A-ZА-Я]/.test(formValue)) {
				return 'Должна быть хотя бы одна заглавная буква';
			}
            break;
        case ValidationRule.Phone:
            if (!/^\+?\d{10,15}$/.test(formValue)) {
                return 'Некорректный номер телефона';
            }
            break;
        case ValidationRule.Email:
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValue)) {
                return 'Некорректный E-mail';
            }
            break
    }

    return '';
}