
# Note Taking

### Setup

firebase
- create firebase project
- enable google in firebase auth sign-in method
- generate service account

#### Run locally
- clone repository 
    ```
    https://github.com/Gerry-Mie/notes
    ```
- setup env - rename the .env.example to .env and add the required environment variables
- convert service  account to base64
    ```shell
    base64 -i ./google-service-account.json
    ```
  copy the output and add to .env `GOOGLE_SERVICE_ACCOUNT` 
- start the app
    ```shell
    npm run start:dev
    ```
#### Use deployed version
- API
    ```
    https://notes-api.gerrymie.site/api
    ```
  swagger ui
  ```
    https://notes-api.gerrymie.site/swagger
    ```
- UI
    ```
    https://note-taking-433415.web.app
    ```
  
### Test API
- access token - 
  Go to [Web UI](https://note-taking-433415.web.app) and sign-in with your google account and copy the token
- Use HTTP client to test the API or use the [Swagger UI](https://notes-api.gerrymie.site/swagger)


if you are using the local api you need to clone the UI and run it to get the access token
