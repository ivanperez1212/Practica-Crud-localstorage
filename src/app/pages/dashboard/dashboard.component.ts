import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';
declare const bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

@ViewChild('modalInfo', { static: true }) modalInfo?: ElementRef<HTMLDivElement> ;
modalinfo: any;
listUsers: any;

constructor(private service: AuthService){}

ngOnInit(): void {
 this.infoUser()
 this.modalinfo = new bootstrap.Modal(this.modalInfo?.nativeElement);
}

infoUser(){
  this.service.getAllUser().subscribe((users:User | undefined) => {
    if (users) {
      this.listUsers = users;
      console.log(this.listUsers)
    }
  });
}

delete(idUser:number){
  this.modalinfo.show();
  this.service.delete(idUser).subscribe((res:any) => {
    console.log(res)
  });
}
}
