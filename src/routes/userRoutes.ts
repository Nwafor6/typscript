import {signUp, verifyAccount} from "../controllers/user";
import app from "../app";
import { Router } from "express";

const router = Router()

router.post("/signup", signUp);
router.post("/activate-account", verifyAccount);


export default router;