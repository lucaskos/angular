import { Router } from '@angular/router';
import { AppRoutingModule } from '../../../router/app-routing.module';
import { UserService } from '../../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // reset login status
  }

  register() {
    this.loading = true;
    this.userService.register(this.model)
      .subscribe(
        data => {
          this.router.navigate(['films']);
        },
        error => {
          this.loading = false;
        });
  }
}
