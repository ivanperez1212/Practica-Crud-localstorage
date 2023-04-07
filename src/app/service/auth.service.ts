import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable, of } from 'rxjs';
import { JsonPipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
 
  getAuth(users: any,searchWord:string): Observable<User | undefined> {
    const tablaUser = JSON.parse(localStorage.getItem("users") || "[]");
    const user = tablaUser.find((res: any) => {
      if (typeof users !== 'object') {
        users = JSON.parse(users);
        return res[searchWord] === users;
      } else{//este es el de login
        return res[searchWord] == users[searchWord]
      }
    });
    return of(user);
  }

  getAllUser(){
    const tablaUser = JSON.parse(localStorage.getItem("users") || "[]");
    return of(tablaUser);
  }

  post(users:User): Observable <any>{
    var idUser =  JSON.parse(localStorage.getItem("iduser") || "[]");
    if(idUser == null){
      idUser = 1
    }
   var tableUser = JSON.parse(localStorage.getItem("users") || "[]");
   if(!Array.isArray(tableUser)){
    tableUser = [];
   }
 
  var objUsers = {
    id : (idUser > 1) ? idUser : (tableUser.length + 1),
    email: users.email,
    name: users.name,
    userName: users.userName,
    password: users.password
};
   tableUser.push(objUsers);
   var list = localStorage.setItem("users",JSON.stringify(tableUser))
   return of(list)
  }

  update(users: User, newUser: User):Observable<User | undefined> {
    console.log(newUser)
     var tablaUser = JSON.parse(localStorage.getItem("users") || "[]");
     let index = tablaUser.findIndex((res: { id: any; }) => res.id === newUser.id);
     
      newUser.email = users.email
      newUser.password = users.password
      newUser.name = users.name
      newUser.userName = users.userName
    
      if(index == -1){
       index = 0
      }
      tablaUser[index] = newUser;
      localStorage.setItem('users', JSON.stringify(tablaUser));
   
     return of(newUser) 
    }

  delete(idUser: number){
    var tablaUser = JSON.parse(localStorage.getItem("users") || "[]");
     let index = tablaUser.findIndex((res: { id: any; }) => res.id === idUser);
      if(index == -1){
       index = 0
      }
      tablaUser[index] = idUser;
      localStorage.setItem('users', JSON.stringify(tablaUser));
   
     return of(idUser) 
  }
}
