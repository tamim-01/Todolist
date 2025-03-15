import {
  getUserByIdService,
  createUserService,
  updateUserDataByIdService,
  validateUserLoginService,
} from "../../services/users/service.js";
import { hash, validateHash } from "../../core/utils/encryption/index.js";
const getUSerByIdController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserByIdService(userId);
    if (user === null) {
      res.status(404).json({
        message: `user with id=${userId} not exist`,
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const createUserController = async (req, res) => {
  try {
    const { username, password, role, avatar } = req.validatedBody;
    const createResult = await createUserService(
      username,
      password,
      role,
      avatar
    );
    if (createResult === null) {
      res.status(424).json({
        message: `user with name ${username} not created!!`,
      });
    } else {
      res.status(201).json({
        message: `user with Name : ${username} is created`,
      });
      console.log(`user with Name : ${username} is created`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateUserDataByIdController = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateList = req.validatedBody;
    const columns = Object.keys(updateList);
    let allUpdatesSuccessful = true;

    for (const column of columns) {
      if (column == "password") {
        const encryptedPassword = await hash(updateList[column]);

        const updateResult = await updateUserDataByIdService(
          userId,
          column,
          encryptedPassword
        );

        if (updateResult === null) {
          allUpdatesSuccessful = false;
          break;
        }
      } else {
        const updateResult = await updateUserDataByIdService(
          userId,
          column,
          updateList[column]
        );

        if (updateResult === null) {
          allUpdatesSuccessful = false;
          break;
        }
      }
    }

    if (allUpdatesSuccessful) {
      res.status(200).json({
        message: `user with id=${userId} has been updated successfully.`,
      });
      console.log(`user with id=${userId} has been updated successfully.`);
    } else {
      res.status(400).json({
        message: `Failed to update user with id=${userId}.`,
      });
      console.log(`Failed to update user with id=${userId}.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
const loginUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate user credentials and generate JWT
    const jwt = await validateUserLoginService(username, password);

    // Set JWT token in an HTTP-only cookie
    res.cookie("token", jwt, {
      httpOnly: true, // Prevent client-side access
      secure: false, // Allow sending over HTTP (since SSL is not set up)
      maxAge: 3600 * 1000, // 1 hour (in milliseconds)
      sameSite: "strict", // Prevent CSRF attacks
      path: "/", // Cookie is accessible across the entire site
    });

    // Respond with success message
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};
const logoutUserController = (req, res) => {
  try {
    // Clear the HTTP-only cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: "strict",
      path: "/",
    });

    // Respond with success message
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};
export {
  getUSerByIdController,
  createUserController,
  updateUserDataByIdController,
  loginUserController,
  logoutUserController,
};
