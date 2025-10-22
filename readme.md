### How to Use

## create file. env

First, make sure to create a .env file in the root project and fill it with the following format:

```bash
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=(your db name)
DB_PASS=(your db password)
DB_PORT=(your cb port)
CLOUDINARY_NAME=(your cloudinary name)
CLOUDINARY_KEY=(your cloudinary key)
CLOUDINARY_SECRET=(your caludinary secret)
JWT_SECRET=(jwt secret)
```


- Cloudinary credentials can be obtained from: https://cloudinary.com/
- JWT secret can be generated from: https://www.jwt.io/

## Make sure the folder structure matches the image.
<img width="283" height="532" alt="image" src="https://github.com/user-attachments/assets/323825f0-a616-480e-8a90-1c991aaab3ea" />


## Running user_management_api
Next, you can run the user_management_api by typing:

```bash
node index.js
# or
npm start
```

If successful, a message will appear in the terminal:

```bash
✅ Server running at http://localhost:5000
```


## Testing Using Postman
After running and seeing the message "Server running on port 5000" in the terminal, enter the local host link http://localhost:5000/api/(auth or user)/(action for auth or user).

```bash
/api/auth/register	POST	Registrasi user baru
/api/auth/login	POST	Login dan mendapatkan JWT
/api/users	GET	Menampilkan semua user (dengan token)
/api/users/avatar	POST	Upload avatar user
/api/users/:id	PUT	Update user berdasarkan ID
/api/users/:id	DELETE	Hapus user berdasarkan ID
```

catatan:
All /users endpoints require an Authorization header:
```bash
Authorization: Bearer <jwt_token>
```

<img width="1916" height="1026" alt="image" src="https://github.com/user-attachments/assets/a4f94cdc-cf50-445e-9573-af55eb04217b" />



## Documentation with Swagger
After running, open your browser and go to the local host link:

```bash
http://localhost:5000/api-docs
```

After opening it, an interactive documentation display with Swagger UI will appear.

<img width="1859" height="951" alt="image" src="https://github.com/user-attachments/assets/e2f9ed39-3e96-45f9-a66d-dbb55c8883fc" />

Auth:
1. In the auth section, register first.
2. Next, log in and save the generated token.
3. Insert the generated token into the Authorization header.

User:
All user-related features can be executed directly since the token has already been added to the Authorization header.
1. GET – Display all users
2. POST – Upload user avatar
3. PUT – Update user 
4. DELETE – Delete user







