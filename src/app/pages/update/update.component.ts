import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  miForm:FormGroup = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    userName: ['',[Validators.required]],
    name: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });
  id: any;
  usersUpdate: any;
  constructor(private servic: AuthService,private fb:FormBuilder){}

  ngOnInit(): void {
    const iduser = localStorage.getItem('iduser');
    this.id = iduser
    this.infouser(iduser)
  }

  infouser(iduser: string | null){
    var searchWord = 'id';
    this.servic.getAuth(iduser, searchWord).subscribe((users:User | undefined) => {
      console.log(users)
      if (users) {
        this.usersUpdate = users;
        this.miForm.patchValue(users);
      }
    } )
  }

  update(){
    this.servic.update(this.miForm.value, this.id).subscribe((list: any) => {
      console.log(list)
    } )
  }
}
