import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.auth.getToken()) {
            return true;
        } else {
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
}


/* Si le token existe, la méthode  canActivate()  retourne  true  , et la navigation continue. Inversement, 
si le token n'existe pas,  canActivate()  lance la redirection et retourne  false  , empêchant la navigation directe. */