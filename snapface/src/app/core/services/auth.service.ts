import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private  token!: string;

    login(): void {
        this.token = 'MyFakeToken';
    }

    getToken(): string {
        return this.token;
    }
}


/* 
La méthode  intercept()  sera appelée pour chaque requête et recevra cette requête comme argument, 
en plus d'un objet appelé  next  que vous découvrirez dans un instant.

Avant d'implémenter cette méthode, préparez le service qui renverra le token. Dans le dossier  services  , 
créez un service  auth.service.ts  qui contient un  token  privé sous forme de  string  , et une méthode  getToken()  qui la renvoie  */