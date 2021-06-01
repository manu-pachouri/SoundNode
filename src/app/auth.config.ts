import { HttpParams } from '@angular/common/http';
import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";

const redirectUri = 'http://localhost:4200/';
export const authConfig : AuthConfig = {
    issuer: 'https://accounts.spotify.com',
    loginUrl: 'https://accounts.spotify.com/authorize',
    responseType: 'code',
    oidc: false,
    clientId : environment.clientID,
    redirectUri : redirectUri+'auth',
    postLogoutRedirectUri: redirectUri,
    tokenEndpoint : 'https://accounts.spotify.com/api/token',
    strictDiscoveryDocumentValidation : false,
    scope: 'user-read-email user-read-private streaming',
    showDebugInformation: true,
    requestAccessToken: true,
    clearHashAfterLogin: true,
    customQueryParams: {
        'show-dialog':'true'
    },
    disablePKCE: true
}