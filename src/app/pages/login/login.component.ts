import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  miForm:FormGroup = this.fb.group({
  email: ['',[Validators.required,Validators.email]],
  password: ['',[Validators.required,Validators.minLength(3)]]
});

constructor(private fb:FormBuilder, private service: AuthService, private router: Router) {}

login(){ 
  var palabraBuscar = "email"
  this.service.getAuth(this.miForm.value,palabraBuscar).subscribe((res:any) => {
    if (res && res.email === this.miForm.value.email && res.password === this.miForm.value.password) {
      console.log(res.id)
      localStorage.setItem('iduser', res.id.toString());
      Swal.fire('Success',"Bienvenido")
       
      this.router.navigate(['/dashboard']);
    
    } else {
      Swal.fire('Error',"los datos estan incorrectos");
    }
  })
  
}
}
