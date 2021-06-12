import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user = new BehaviorSubject<User | null>(null);

    constructor(private auth: AngularFireAuth) {}

    get isLoggedIn(): Observable<boolean> {
        return this.user.pipe(
            map(value => value !== null)
        );
    }

    emailSignIn(email: string, password: string): Promise<void> {
        return this.auth.signInWithEmailAndPassword(email, password).then(
            credential => this.saveUserData(credential)
        );
    }

    emailSignup(email: string, password: string): Promise<void> {
        return this.auth.createUserWithEmailAndPassword(email, password).then(
            credential => this.saveUserData(credential)
        );
    }

    googleSignIn(): Promise<void> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(provider).then(
            credential => this.saveUserData(credential)
        );
    }

    signOut(): Promise<void> {
        this.deleteUserData();
        return this.auth.signOut();
    }

    private saveUserData(credentials: UserCredential): void {
        if (credentials.user?.uid && credentials.user.displayName) {
            this.user.next({
                uid: credentials.user.uid,
                displayName: credentials.user.displayName
            });
        }
    }

    private deleteUserData(): void {
        this.user.next(null);
    }
}
