## Cors-Origin
Baypass Cors Origin With NodeJs. On this configuration just work with https and not support http.

## Installation
* Install NodeJs
* Install pm2 (if needed) for handle startup
* Install ```openssl``` and ```libssl-dev```

## Generate a self-signed certificate. Open your terminal or git bash and run the following command:
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
Update server.key and server.cert to match the certificate with the certificate your domain.

