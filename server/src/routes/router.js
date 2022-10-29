import { Router, json } from "express";
import controller from "../controller/controller.js";

const router = Router()

router.get("/getNearestCenter", json(), controller.getNearestCenter)

export default router