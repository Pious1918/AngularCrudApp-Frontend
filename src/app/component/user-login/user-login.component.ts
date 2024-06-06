import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserDataService } from '../../service/user-data.service';
import { UserLogin } from '../../newmodel/viewuserInterface';
import { Store } from '@ngrx/store';

import * as userActions from '../../states/UserNg/user.action'
import { selectUser, selectUserError } from '../../states/UserNg/user.selector';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [RouterLink,
            ReactiveFormsModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {





  passworderror : string =''
  

  loginForm!:FormGroup

  constructor(private userservice:UserDataService ,
     private router:Router , 
     private store:Store<any>)
     
     
     {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })

  }

  user$ = this.store.select(selectUser)
  error$ = this.store.select(selectUserError)

  onSubmit(){


    const userData:UserLogin=this.loginForm.value
    console.log("user data is ",userData)
    this.store.dispatch(userActions.login({formData:userData}))

    // this.user$.subscribe(data=>{
    //   if(data){
    //     this.router.navigate(['/userdash'])
    //   }
    // }, err=>{
    //   console.log("error registering new user" , err.error.message)

    // })


    this.user$.subscribe((user)=>{
      if(user){
        this.router.navigate(['/userdash'])
      }
      
      // else{
      //   this.router.navigate([''])
        
      // }
    })


    this.error$.subscribe((res)=>{
      
      console.log("dsfsd",res)
      this.router.navigate([''])
    })


  }




}
