import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    name: String;
    username: String;
    email: String;
    password: String;
    type: String;

    userType: any = [{ name: "Select_One" }, { name: "Candidate" }];
    selectedType: any;

    constructor(
        private validateService: ValidateService,
        private flashMessgae: FlashMessagesService,
        private authService: AuthService,
        private router: Router) { }

    Set(value: any) {
        this.selectedType = value;
        this.type = this.selectedType;
    }

    ngOnInit() {
        $(document).ready(function () {

            $('.formBox').toggleClass('level-login').toggleClass('level-reg');
            if (!$('.formBox').hasClass('level-reg')) {
                $('.formBox').addClass('level-reg-revers');
            }
            var inP = $('.input-field');

            inP.on('blur', function () {
                if (!this.value) {
                    $(this).parent('.f_row').removeClass('focus');
                } else {
                    $(this).parent('.f_row').addClass('focus');
                }
            }).on('focus', function () {
                $(this).parent('.f_row').addClass('focus');
                $('.btn').removeClass('active');
                $('.f_row').removeClass('shake');
            });

            $('.resetTag').click(function (e) {
                e.preventDefault();
                $('.formBox').addClass('level-forget').removeClass('level-reg');
            });

            $('.back').click(function (e) {
                e.preventDefault();
                $('.formBox').removeClass('level-forget').addClass('level-login');
            });

            $('.regTag').click(function (e) {
                e.preventDefault();

                if (!$('.formBox').hasClass('level-reg')) {
                    $('.formBox').addClass('level-reg-revers');
                }
            });

            $('.btn').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault();

                    var finp = $(this).parent('form').find('input');

                    if (!finp.val() == 0) {
                        $(this).addClass('active');
                      }

                    setTimeout(function () {

                        inP.val('');

                        $('.f_row').removeClass('shake focus');
                        $('.btn').removeClass('active');

                    }, 2000);

                    if (inP.val() == 0) {
                        inP.parent('.f_row').addClass('shake');
                    }
                });
            });
        });
    }

    onRegisterSubmit(form: NgForm) {

        this.type = this.selectedType;
        const user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password,
            type: this.type
        }

        // Required fields

        if (!this.validateService.validateRegister(user)) {
            this.flashMessgae.show("Please fill in all fields", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }

        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessgae.show("Please Enter valid Email address", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }

        //  Register User
        this.authService.registerUser(user).subscribe(data => {
            if (data.success) {
                alert("register");
                this.flashMessgae.show("You are now registered and can log In.", { cssClass: 'alert-success', timeout: 3000 });
                this.router.navigate(['/login']);
            }
            else {
                this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
                this.router.navigate(['/register']);
            }
        });
    }
}