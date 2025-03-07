import express from "express";
import { 
  searchFlights, 
  getFlightDetails, 
  selectFlight, 
  filterFlights 
} from "../controllers/flightController.js";
import { validate } from "../middlewares/validate.js";
import { 
  flightSearchValidationSchema, 
  flightDetailsValidationSchema, 
  flightSelectionValidationSchema, 
  flightFilterValidationSchema 
} from "../validations/flightValidation.js";

const router = express.Router();

router.get("/search", validate(flightSearchValidationSchema), searchFlights);
router.get("/:flight_id", validate(flightDetailsValidationSchema), getFlightDetails);
router.post("/select", validate(flightSelectionValidationSchema), selectFlight);
router.get("/filter", validate(flightFilterValidationSchema), filterFlights);

export default router;
