import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(private authService: AuthService) {}

  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorMessage = error.message; // Mostrar el mensaje de error al usuario
      });
  }
}
