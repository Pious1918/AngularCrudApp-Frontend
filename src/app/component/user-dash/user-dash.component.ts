import { Component, OnInit, inject } from '@angular/core';
import {  Router, RouterLink } from '@angular/router';
import {  userInfo } from '../../newmodel/viewuserInterface';
import { UserDataService } from '../../service/user-data.service';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as userActions from '../../states/UserNg/user.action'
import { selectUser } from '../../states/UserNg/user.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dash',
  standalone: true,
  imports: [AsyncPipe,RouterLink, ReactiveFormsModule, CommonModule ],
  templateUrl: './user-dash.component.html',
  styleUrl: './user-dash.component.css'
})
export class UserDashComponent implements OnInit{
  selectedFile!:File

  // user$!: Observable<userInfo>;


  user$ = this.store.select(selectUser)

  // user$!: Observable<any>;

  noProfileImg: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJm69EJHsFuzuY5rGHvLv0jcO6MACgPyNGrSKe4Fm1yH0SB-Dcpf79OVa4vGi2yIYUrI&usqp=CAU';


  user:userInfo={
    name:'',
    email:'',
    profileImg:''
  }



  constructor(private userservice:UserDataService , private router: Router,
    private http:HttpClient,
    private store:Store
  ){
  
    this.user = this.userservice.getUserDataFromstorage()
  }


  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);

    this.store.select(selectUser).subscribe(user => {
      console.log(user)
    });   
  }




  


  onFileSelected(event:any ,userId:any){
    console.log(event)
    console.log(userId)
    this.selectedFile=<File>event.target.files[0]
  }


  onSubmit(userid:any){
    console.log(userid)
    const formdata = new FormData()
  

    formdata.append("image" , this.selectedFile , this.selectedFile.name)
    
    this.http.post(`http://localhost:3000/upload?userid=${userid}`,formdata,userid )
    .subscribe(res =>{
      console.log("upload success",res)
    
      return res
    }, err=>{
      console.log("Upload error" , err)
    })


  }

// onSubmit(userid: any) {
//   console.log(userid);
//   const formdata = new FormData();

//   formdata.append("image", this.selectedFile, this.selectedFile.name);

//   this.http
//     .post(`http://localhost:3000/upload?userid=${userid}`, formdata, userid)
//     .subscribe(
//       async (res) => {
//         console.log("upload success", res);
//         // Fetch the updated user information after uploading the image
//         const updatedUser = await this.userservice.getUserDataFromstorage();
//         // Update the user object in the component with the updated user information
//         this.user.profileImg = updatedUser.profileImg;
//         // You might need to trigger change detection if necessary
//       },
//       (err) => {
//         console.log("Upload error", err);
//       }
//     );
// }





  onclick(userid:string){
    this.router.navigate([`/edituser/${userid}`])
  }

  
  logOut(){
    localStorage.removeItem('usertoken')
    this.router.navigate([''])
  }
  
  

  

  

  

}
