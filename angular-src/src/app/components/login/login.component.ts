import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  type_name: any;
  usertype: any = [
    { name: "User-Type", value: 0 },
    { name: "Admin", value: 1 },
    { name: "Candidate", value: 2 }
  ];

  constructor(
    private flashMessgae: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  public self = this;

  public ngOnInit() {
    $(document).ready(function () {

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
        $('.formBox').removeClass('level-reg-revers');
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
    })
  }

  Filter(value: any) {
    this.type_name = value;
  }

  onLoginSubmit() {
    
    const user = {
      username: this.username,
      password: this.password,
      type: this.type_name
    }

    this.authService.authenticationUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.users);
        localStorage.setItem("userType", user.type);
        console.log(data.user);
        this.flashMessgae.show("You are now logged In.", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }
      else {
        this.flashMessgae.show(data.messages, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });

  }
}