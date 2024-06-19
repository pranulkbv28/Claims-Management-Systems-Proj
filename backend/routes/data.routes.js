import { Router } from "express";
import {
  newClaim,
  updateClaim,
  getClaim,
  deleteClaim,
} from "../controllers/!controllersExport.js";
import protectedRoute from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/new", protectedRoute, newClaim);
// router.get("/new", (req, res) => {
//   res.send("This is /api/data/new");
// });
router.patch("/existing/:id", protectedRoute, updateClaim);
router.get("/view/:id", protectedRoute, getClaim);
router.delete("/delete/:id", protectedRoute, deleteClaim);

export default router;
