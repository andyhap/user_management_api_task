## How to Use

#create file. env
First, make sure to create a .env file in the root project and fill it with the following format:

```bash
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=(your db name)
DB_PASS=(your db password)
DB_PORT+(your cb port)
CLOUDINARY_NAME=(your cloudinary name)
CLOUDINARY_KEY=(your cloudinary key)
CLOUDINARY_SECRET=(your caludinary secret)
JWT_SECRET=(jwt secret)
```


- Cloudinary credentials can be obtained from: https://cloudinary.com/
- JWT secret can be generated from: https://www.jwt.io/

# Running user_management_api
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


# Testing Using Postman
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
Authorization: Bearer <jwt_token_kamu>
```


# Documentation with Swagger
After running, open your browser and go to the local host link:

```bash
http://localhost:5000/api-docs. Dengan begitu
```

setelah dibuka. akan muncul tampilan dokumentasi interaktif dengan Swagger UI.


