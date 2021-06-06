import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";

const redirectUri = 'http://localhost:4200/';
const scopes = `ugc-image-upload user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read user-library-modify user-library-read user-read-email user-read-private
`;
export const authConfig : AuthConfig = {
    issuer: 'https://accounts.spotify.com',
    loginUrl: 'https://accounts.spotify.com/authorize',
    responseType: 'code',
    oidc: false,
    clientId : environment.clientID,
    redirectUri : redirectUri+'auth',
    postLogoutRedirectUri: redirectUri,
    scope: scopes,
    showDebugInformation: true,
    requestAccessToken: true,
    disablePKCE: true,
    tokenEndpoint: 'https://accounts.spotify.com/api/token'
}