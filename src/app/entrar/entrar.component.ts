import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin= new UsuarioLogin();


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas:AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0);

    environment.token='';
    environment.id=0;

  }

Entrar() {
    this.authService.Entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp;
      environment.token=this.usuarioLogin.token      
      environment.nome=this.usuarioLogin.nome
      environment.foto=this.usuarioLogin.foto
      environment.id=this.usuarioLogin.id
      environment.tipo=this.usuarioLogin.tipo

      this.router.navigate(['/home']);
    }, erro => {
        if(erro.status!=200){
      this.alertas.showAlertDanger('Houve um erro ao entrar, verifique o e-mail e a senha');
        }
    });
    
  }

}