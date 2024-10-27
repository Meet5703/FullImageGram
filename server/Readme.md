### Initialization Of ImageGram Backend

#### Required packages

- "bcrypt": "^5.1.1",
- "cloudinary": "^1.41.3",
- "dotenv": "^16.4.5",
- "express": "^4.21.1",
- "jsonwebtoken": "^9.0.2",
- "mongoose": "^8.7.2",
- "multer": "^1.4.5-lts.1",
- "multer-storage-cloudinary": "^4.0.0",
- "swagger-jsdoc": "^6.2.8",
- "swagger-ui-express": "^5.0.1",
- "cookie-parser": "^1.4.7",

###### User Routes Added With Controllers ,Repository and Services

---

##### This Codes are created in three layered structure with MVC Architecture.

- 1st Layer Of Repository Codes Where we will write all logics around database codes like save, create, update,delete etc...

- In 2nd Layer Of services we will write all codes of buissness logic which will executes while data goes from server to database for example setcookies, get data from server and manupulate it before send it to repository manupilation like data hashing ,token generation, verification etc...

- In 3rd Layer Of Controller we recive data from client to server and send response to client so it basically a kind of connection between client and server and after collecting data it sends data to services

##### User Repository

```javascript
import User from "../models/User.js";

export const createUserRepo = async ({ name, email, password }) => {
  const user = await User.create({ name, email, password });
  return user;
};

export const getUserByIdRepo = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const getUserByEmailRepo = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const getAllUsersRepo = async (limit, offset) => {
  const totalPagesCalc = Math.ceil(
    (await User.countDocuments()) / Number(limit)
  );
  const users = await User.find().skip(offset).limit(limit);
  return { totalPages: totalPagesCalc, users };
};

export const updateUserByIdRepo = async ({ id, userObject }) => {
  const user = await User.findByIdAndUpdate(id, userObject, { new: true });
  return user;
};
export const deleteUserByIdRepo = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};
```

###### User Services

```javascript
import {
  createUserRepo,
  deleteUserByIdRepo,
  getAllUsersRepo,
  getUserByEmailRepo,
  getUserByIdRepo,
  updateUserByIdRepo,
} from "../repository/User.js";
import { generateToken } from "../utils/JWT.js";
import bcrypt from "bcrypt";
export const signInService = async ({ email, password }, res) => {
  const user = await getUserByEmailRepo(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const tokenObject = { id: user._id, email: user.email, role: user.role };
  const token = await generateToken({ payload: tokenObject });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return { token, user };
};
export const createUserService = async (user) => {
  const existingUser = await getUserByEmailRepo(user.email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const userData = await createUserRepo(user);
  return userData;
};

export const getUserByIdService = async (id) => {
  const user = await getUserByIdRepo(id);
  return user;
};

export const getAllUsersService = async (limit, offset) => {
  const users = await getAllUsersRepo(limit, offset);
  return users;
};

export const updateUserByIdService = async ({ id, userObject }) => {
  const user = await updateUserByIdRepo({ id, userObject });
  return user;
};

export const deleteUserByIdService = async (id) => {
  const user = await deleteUserByIdRepo(id);
  return user;
};
```

###### User Controller

```javascript
import User from "../models/User.js";
import { getAllUsersService, signInService } from "../services/User.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return res
      .status(201)
      .json({ message: "User created successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await signInService({ email, password }, res);
    return res
      .status(200)
      .json({ message: "User signed in successfully", data: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const user = await getAllUsersService(limit, offset);
    return res
      .status(200)
      .json({ message: "Users fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userObject = req.body;
    const user = await User.findByIdAndUpdate(id, userObject, { new: true });
    return res
      .status(200)
      .json({ message: "User updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "User deleted successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
```

##### User Routes

###### Route End Point /api/v1/any routes from below

```javascript
import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  signIn,
  updateUserById,
} from "../../controllers/User.js";
import { authenticate } from "../../middlewares/authentication.js";

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", signIn);

router.get("/", getAllUsers);

router.get("/:id", authenticate, getUserById);

router.put("/:id", authenticate, updateUserById);

router.delete("/:id", authenticate, deleteUserById);

export default router;
```

#### Authentication

In Authentication We are Using JsonWebToken(JWT) we will recive jwt token inside cookie and that cookie will work as an authentication that gives permission to user for do actions like edit, delete etc.. cookie will created at logintime that ensures user has correct creditionals and user is verified
here is some snippets of Auth

##### Auth

- middleware

```javascript
import { verifyToken } from "../utils/JWT.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = verifyToken(token);
    console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid Token" });
  }
};
```

- JWT

```javascript
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/variables.js";

export const generateToken = ({ payload }) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};
```
