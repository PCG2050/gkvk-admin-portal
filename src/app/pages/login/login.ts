import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginObj : any = {
  email:'',
  password:''
};
router = inject(Router)
onLogin(){
  if(this.loginObj.email === 'admin' && this.loginObj.password === 'admin'){
    this.router.navigateByUrl('/dashboard')   
  }else{
   alert('Invalid credentials');
  }
}
}
