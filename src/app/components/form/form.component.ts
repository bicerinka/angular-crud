import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']

})
export class FormComponent implements OnInit {
    messageSuccess: boolean;
    myFirstReactiveForm: FormGroup;
    city = [
        ['Краснодар', 'Кропоткин', 'Славянск'],
        ['Ростов', 'Шахты', 'Батайск'],
        ['Ставрополь', 'Пятигорск', 'Кисловодск']
    ];
    currentCity: number;
    region = [
        'Краснодарский край',
        'Ростовская область',
        'Ставропольский край'
    ];

    constructor(private fb: FormBuilder, private comment: CommentService) { }

    ngOnInit() {
        this.initForm();
    }

    onSubmit(): void {
        const controls = this.myFirstReactiveForm.controls;
        const value = this.myFirstReactiveForm.value;
        if (this.myFirstReactiveForm.invalid) {
            this.messageSuccess = false;
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
            return;
        }

        this.comment.addComment({
            lastname: value.lastname,
            firstname: value.firstname,
            surname: value.surname,
            region: this.region[value.region],
            city: value.city,
            phone: value.phone,
            email: value.email,
            comment: value.comment,
            hide: true,
        });
        this.messageSuccess = true;
    }

    isControlInvalid(controlName: string): boolean {
        const control = this.myFirstReactiveForm.controls[controlName];
        const result = control.invalid && control.touched;

        return result;
    }

    onChange(e) {
        this.currentCity = e !== '' ? e + 1 : 0;
    }

    private initForm(): void {
        this.myFirstReactiveForm = this.fb.group({
            lastname: ['', [
                Validators.required
            ]],
            firstname: ['', [
                Validators.required
            ]],
            surname: '',
            region: '',
            city: '',
            phone: ['', [
                Validators.pattern(/\d{10}/),
            ]],
            email: ['', [
                Validators.email
            ]],
            comment: ['', [
                Validators.required
            ]],
        });
    }
}
