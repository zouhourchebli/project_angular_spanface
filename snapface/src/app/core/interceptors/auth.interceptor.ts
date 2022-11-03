import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    // De retour dans votre intercepteur, injectez le service que vous venez de créer, et implémentez la méthode  intercept  comme suit :

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = new HttpHeaders()
          .append('Authorization', `Bearer ${this.auth.getToken()}`);
        const modifiedReq = req.clone({ headers });
        return next.handle(modifiedReq);
    }
}


/* Dans la méthode :

Sécurisez vos requêtes:

Dans vos applications, vous aurez très souvent besoin d'accomplir certaines tâches pour chaque requête HTTP envoyée par votre application.
 L'authentification, le logging, la gestion d'erreur – tout ça serait très lourd à implémenter manuellement pour chaque méthode de service.

Heureusement, l'équipe Angular a pensé à ce besoin, et a créé les intercepteurs. Comme leur nom l'indique, 
les intercepteurs interceptent toutes les requêtes envoyées (ainsi que les réponses reçues) par votre application, et vous permettent d'accomplir les tâches nécessaires.


vous créez des  headers  utilisables par Angular avec  new HttpHeaders() et vous utilisez leur méthode  append()  
pour y ajouter un header  Authorization  qui contient  Bearer TOKEN   – c'est souvent la forme requise pour ce type de header ;

vous créez une nouvelle requête en clonant la précédente et en y ajoutant les  headers  que vous venez de créer – 
les requêtes sont des objets immuables (qu'on ne peut pas modifier), donc on créera toujours une nouvelle requête qui contient les modifications requises ;

vous retournez  next.handle()  en y passant la nouvelle requête – c'est ce qui permet à la requête de continuer son chemin. */