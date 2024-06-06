import { createAction, props } from "@ngrx/store";
import {  UserLogin, userInfo } from "../../newmodel/viewuserInterface";


export const login = createAction('[user component] Login', props<{formData:UserLogin}>())

export const loginsuccess  = createAction('[user] Login Success' , props<{user:userInfo}>() )

export const loginfailure = createAction('[user] Login Failure', props<{error : any}>())


export const uploadImage = createAction('[user] upload image' , props<{userId : string , image:File}>())

export const uploadImageSuccess = createAction(
    '[User] Upload Image Success',
    props<{ profileImg: string }>()
  );
  
  export const uploadImageFailure = createAction(
    '[User] Upload Image Failure',
    props<{ error: any }>()
  );

// user.actions.ts

export const userProfile = createAction('[User] User Profile Loaded', 
props<{ profile: userInfo }>());


// export const updateUser = createAction('[User] Update User', props<{ updatedUser: userInfo }>());



// export const updateUserSuccess = createAction('[User] Update User Success', props<{ updatedUser: userInfo }>());


// export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: any }>());


 
export const getUserData = createAction(
  '[User home component] Get user Data'
)


//today commented
// export const updateUser = createAction(
//   '[User] Update User', props<{ user: userInfo }>());




 
export const updateuser = createAction(
  '[User] update user',
  props<{user:userInfo , userid:string}>()
)


export const updateUserSuccess = createAction(
  '[User] update user successs',
  props<{user : userInfo}>()
)

export const updateUserFailure = createAction(
  '[User] update user failure',
  props<{error : any}>()
)

