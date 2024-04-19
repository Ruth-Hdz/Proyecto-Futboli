import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// TODA LA LOGICA DE INICIO DE SESION CON FIREBASE
  userData: any;

  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // OBSERVER guardar usuario en localStorage (inicio de sesión) y establecer nulo cuando cierra sesión
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user'); // Cambiado de 'null' a remover el elemento 'user' del localStorage cuando no hay usuario
      }
    });
  }

  // Iniciar sesión con correo electrónico y contraseña
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        throw new Error('Inicio de sesión incorrecto. Por favor, verifica.');
      });
  }
  

  // Registro con correo electrónico y contraseña
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
  }

  // Observar el estado del usuario
  observeUserState() {
    this.ngZone.run(() => this.router.navigate(['Admin-Home']));
  }

  // Devuelve verdadero cuando el usuario ha iniciado sesión
  get isLoggedIn(): boolean {
    return !!this.userData;
  }

  // Cerrar sesión
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['Admin']);
    });
  }

}
