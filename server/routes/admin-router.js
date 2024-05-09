const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");

// Routes
router.route("/").get(adminController.home);
// Branches
router.route("/branches").get(adminController.branches);
router.route("/branches/:id").get(adminController.branchById);
router.route("/branches/create").post(adminController.branchCreate);
router.route("/branches/update/:id").patch(adminController.branchUpdate);
router.route("/branches/delete/:id").delete(adminController.branchDelete);

// Guests
router.route("/guests").get(adminController.guests);
router.route("/guests/:id").get(adminController.userById);
router.route("/guests/create").post(adminController.guestCreate);
router.route("/guests/update/:id").patch(adminController.userUpdate);
router.route("/guests/delete/:id").delete(adminController.userDelete);
// Staffs 
router.route("/staffs").get(adminController.staffs);
router.route("/staffs/:id").get(adminController.userById);
router.route("/staffs/create").post(adminController.staffCreate);
router.route("/staffs/update/:id").patch(adminController.userUpdate);
router.route("/staffs/delete/:id").delete(adminController.userDelete);
// Rooms
router.route("/rooms").get(adminController.rooms);
router.route("/rooms/:id").get(adminController.roomById);
router.route("/rooms/create").post(adminController.roomCreate);
router.route("/rooms/update/:id").patch(adminController.roomUpdate);
router.route("/rooms/delete/:id").delete(adminController.roomDelete);
// Bookings
router.route("/bookings").get(adminController.bookings);
router.route("/bookings/:id").get(adminController.bookingById);
router.route("/bookings/create").post(adminController.bookingCreate);
router.route("/bookings/update/:id").patch(adminController.bookingUpdate);
router.route("/bookings/delete/:id").delete(adminController.bookingDelete);
// Duties
router.route("/duties").get(adminController.duties);
router.route("/duties/:id").get(adminController.dutyById);
router.route("/duties/create").post(adminController.dutyCreate);
router.route("/duties/update/:id").patch(adminController.dutyUpdate);
router.route("/duties/delete/:id").delete(adminController.dutyDelete);




module.exports = router;
