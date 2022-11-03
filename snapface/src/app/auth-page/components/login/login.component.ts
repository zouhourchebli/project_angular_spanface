import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  
  onLogin(): void {
     this.auth.login(),
     this.router.navigateByUrl('/facesnaps');
  }
}

/* 
LoginComponent aura besoin de AuthService et du Router, 
donc injectez-les et créez une méthode  onLogin()  pour réagir aux clics sur le bouton de connexion : */
