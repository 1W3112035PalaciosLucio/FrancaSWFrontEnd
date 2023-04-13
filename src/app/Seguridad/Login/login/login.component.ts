import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/Models/Seguridad/Login';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visible: boolean = true;
  changeType: boolean = true;
  public loginForm!: FormGroup
  private Subscription = new Subscription();
  log = {} as Login;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: LoginService,
    private spinner: NgxSpinnerService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  login() {
    this.spinner.show();
    const login: Login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('contrasenia')?.value,
      roles: [],
      token: "",
      activo: false,
      nombre: "",
      apellido: "",
      message: "",
      ok: false,
      error: "",
      stateCode: 1
    };

    this.Subscription.add(
      this.api.postLogin(login).subscribe(next => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: `Bienvenido`,
          confirmButtonColor: '#2c5672',
          text: 'Login correcto...',
          timer: 5000
        }).then(x => {
          if (this.api.checkUseHasRole(['Adm'])) {
            this.router.navigate(["/admin/inicioAdmin"]);
          } else {
            Swal.fire({
              title: "¡Cuidado!",
              text: "Solicite al adminsitrador que se le asigne un rol"
            })
            this.router.navigate(["/cliente/inicioCliente"]);
          }
        });
      }, error => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ups, algo salió mal!',
          confirmButtonColor: '#2c5672',
          text: error.error.error,
        });
      })
    );
  }
  viewpass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
