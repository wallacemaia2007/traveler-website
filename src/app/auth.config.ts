import { AuthConfig } from "angular-oauth2-oidc";

export const auth: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin,
    clientId: '1031679896539-7fvumvj49ffo554j5btjkdophmid0idh.apps.googleusercontent.com',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
}
