export class LocalStorageUtils {

    public getUser() {
        return JSON.parse(localStorage.getItem('devio.user'));
    }

    public saveLocalDataUser(response: any) {
        this.saveTokenUser(response.accessToken);
        this.saveUser(response);
    }

    public clearLocalDataUser() {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
    }

    public getUserToken(): string {
        return localStorage.getItem('devio.token');
    }

    public saveTokenUser(token: string) {
        localStorage.setItem('devio.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }

}
