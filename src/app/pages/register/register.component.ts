import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  miForm:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    userName: ['',[Validators.required]],
    name: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,private service:AuthService, private router: Router ) { }

  register(){
    console.log(this.miForm.value) 
    this.service.post(this.miForm.value).subscribe((list: any) => {
      console.log(list);
      this.router.navigateByUrl('/login')
    });
     }
}
