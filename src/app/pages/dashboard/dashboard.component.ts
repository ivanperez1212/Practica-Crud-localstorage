import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare const bootstrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalInfo', { static: true }) modalInfo?: ElementRef<HTMLDivElement>;
  modalinfo: any;
  listUsers: any;
  selectUser: any;

  constructor(private service: AuthService, private modalService: NgbModal) {} 

  ngOnInit(): void {
    this.infoUser();
    this.modalinfo = new bootstrap.Modal(this.modalInfo?.nativeElement);
  }

  infoUser() {
    this.service.getAllUser().subscribe((users: User | undefined) => {
      if (users) {
        this.listUsers = users;
        console.log(this.listUsers);
      }
    });
  }

  openConfirmModal(idUser: number) {
    // Definir el modal de confirmación y pasarle el id del usuario
    const confirmModal = this.modalService.open(ConfirmModalComponent, { centered: true });
    confirmModal.componentInstance.idUser = idUser;
  
    // Si el usuario confirmó la eliminación, llamar a la función delete con el id del usuario y true
    confirmModal.result.then((result: string) => {
      if (result === 'confirm') {
        this.delete(idUser, true);
      }
    }, () => {
      // Si el usuario canceló el modal, no hacer nada
    });
  }

  delete(idUser: number, confirmado: boolean) {
    if (confirmado) {
      this.service.delete(idUser).subscribe((res: any) => {
        console.log(res);

        // Actualizar la lista de usuarios después de eliminar uno
        this.infoUser();
      });
    }
  }

  moreInformation(user:any){
  this.modalinfo.show();
  console.log(user)
  this.selectUser = user;
  }
}

@Component({
  selector: 'confirm-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-basic-title">Eliminar usuario</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="close()">
        <span aria-hidden="true"></span>
      </button>
    </div>
    <div class="modal-body">
      ¿Estás seguro de que quieres eliminar este usuario?
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="close()">Cancelar</button>
      <button type="button" class="btn btn-danger" (click)="confirm()">Eliminar</button>
    </div>
  `
})

export class ConfirmModalComponent {
  idUser: number | undefined;
  constructor(public activeModal: NgbActiveModal) {}
  close() {
    this.activeModal.dismiss('cancel');
  }
  confirm() {
    this.activeModal.close('confirm');
  }
}
