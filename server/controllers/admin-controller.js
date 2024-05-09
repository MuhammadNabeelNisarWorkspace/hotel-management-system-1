const Branch = require("../models/branch-model");
const Booking = require("../models/bookings-model");
const Duty = require("../models/duty.-model");
const Room = require("../models/rooms-model");
const User = require("../models/user-model");

const home = (req, res) => {
  try {
    res.send("Dashboard");
  } catch (error) {
    console.log(error);
  }
};
// ---------------------------------------------------------------------
// --------------------------Branch Controll----------------------------
// ---------------------------------------------------------------------
// Fetch All
const branches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json({
      mgs: "Branchs Fetched Successfully!",
      branches,
    });
  } catch (error) {
    console.log(error);
  }
};
// Create
const branchCreate = async (req, res) => {
  try {
    const { branchName, country, city, address } = req.body;
    const branchExist = await Branch.findOne({ branchName });
    if (branchExist) {
      return res.status(400).json({ msg: "Brnach Name Already Exists!" });
    }
    // Else
    const branchCreated = await Branch.create({
      branchName,
      country,
      city,
      address,
    });
    res.status(201).json({
      mgs: "Branch Created Successfully!",
      branch: branchCreated,
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch Branch By ID
const branchById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Branch.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Branch By ID
const branchUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBranchData = req.body;
    const UpdatedBranch = await Branch.updateOne(
      { _id: id },
      {
        $set: updateBranchData,
      }
    );
    return res.status(200).json(UpdatedBranch);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Branch By ID
const branchDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Branch.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Branch Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// ---------------------------------------------------------------------
// --------------------------Guest Controll----------------------------
// ---------------------------------------------------------------------
// Fetch All
const guests = async (req, res) => {
  try {
    const guests = await User.find({ role: "guest" });
    res.status(200).json({
      guests,
    });
  } catch (error) {
    console.log(error);
  }
};
// Create
const guestCreate = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists!" });
    }
    // Else
    const userCreated = await User.create({
      username,
      email,
      password,
      phoneNumber,
      role: "guest",
    });

    res.status(201).json({
      msg: "Registration successfully",
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};
// ---------------------------------------------------------------------
// --------------------------Staff Controll----------------------------
// ---------------------------------------------------------------------
// Fetch All
const staffs = async (req, res) => {
  try {
    const staffs = await User.find({ role: { $nin: ["guest", "admin"] } });
    res.status(200).json({
      msg: "Staffs Fetched Successfully!",
      staffs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Create
const staffCreate = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists!" });
    }
    // Else
    const userCreated = await User.create({
      username,
      email,
      password,
      phoneNumber,
      role,
    });

    res.status(201).json({
      msg: "Registration successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// ----------------------------------------------------------------------------------------
// --------------------------User Control For Guest/Staff/Admin----------------------------
// ----------------------------------------------------------------------------------------

// Fetch User By ID
const userById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Guest/Staff/Admin By ID
const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateGuestData = req.body;
    const UpdatedGuest = await User.updateOne(
      { _id: id },
      {
        $set: updateGuestData,
      }
    );
    return res.status(200).json(UpdatedGuest);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Guest/Staff/Admin By ID
const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ msg: "User Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// ---------------------------------------------------------------------
// --------------------------Room Control-------------------------------
// ---------------------------------------------------------------------
// Fetch All
const rooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({
      mgs: "Rooms Fetched Successfully!",
      rooms,
    });
  } catch (error) {
    console.log(error);
  }
};
// Create
const roomCreate = async (req, res) => {
  try {
    const { type, person, availability, status, price, branchId } = req.body;

    // Create the room
    const room = await Room.create({
      type,
      person,
      availability,
      status,
      price,
      branchId,
    });

    res.status(201).json({
      msg: "Room created successfully!",
      room: room,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// Fetch Rooms By ID
const roomById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Room.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update room By ID
const roomUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateRoomData = req.body;
    const UpdatedRoom = await Room.updateOne(
      { _id: id },
      {
        $set: updateRoomData,
      }
    );
    return res.status(200).json(UpdatedRoom);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Room By ID
const roomDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Room.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Room Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// ---------------------------------------------------------------------
// --------------------------Booking Control-------------------------------
// ---------------------------------------------------------------------
// Fetch All
const bookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({
      mgs: "Bookings Fetched Successfully!",
      bookings,
    });
  } catch (error) {
    console.log(error);
  }
};
const bookingCreate = async (req, res) => {
  try {
    const { roomPrice, foodPrice, laundryPrice, roomId, userId, branchId } =
      req.body;

    // Calculate total amount
    const totalAmmount = roomPrice + (foodPrice || 0) + (laundryPrice || 0);

    const booking = await Booking.create({
      roomId,
      userId,
      branchId,
      roomPrice,
      foodPrice,
      laundryPrice,
      totalAmmount, // Update totalAmmount field
    });

    res.status(201).json({
      msg: "Booking created successfully!",
      booking: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// Fetch Booking By ID
const bookingById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Booking.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Booking By ID
const bookingUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateBookingData = req.body;
    const UpdatedBooking = await Booking.updateOne(
      { _id: id },
      {
        $set: updateBookingData,
      }
    );
    return res.status(200).json(UpdatedBooking);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Booking By ID
const bookingDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Booking.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Booking Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// ---------------------------------------------------------------------
// --------------------------Duty Control-------------------------------
// ---------------------------------------------------------------------
// Fetch All
const duties = async (req, res) => {
  try {
    const duties = await Duty.find();
    res.status(200).json({
      mgs: "Duties Fetched Successfully!",
      duties,
    });
  } catch (error) {
    console.log(error);
  }
};
// Create
const dutyCreate = async (req, res) => {
  try {
    const { staffId, roomId, task } = req.body;

    const duty = await Duty.create({
      staffId,
      roomId,
      task,
    });

    res.status(201).json({
      msg: "Duty created successfully!",
      duty: duty,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

// Fetch Duty By ID
const dutyById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Duty.findOne({ _id: id });
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Update Duty By ID
const dutyUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDutyData = req.body;
    const UpdatedDuty = await Duty.updateOne(
      { _id: id },
      {
        $set: updateDutyData,
      }
    );
    return res.status(200).json(UpdatedDuty);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Delete Duty By ID
const dutyDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Duty.deleteOne({ _id: id });
    return res.status(200).json({ msg: "Booking Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = {
  home,
  rooms,
  bookings,
  //   Branch
  branches,
  branchCreate,
  branchById,
  branchUpdate,
  branchDelete,
  //    Guests
  guests,
  guestCreate,
  //    Staffs
  staffs,
  staffCreate,
  //   Guest/Staff/Admin
  userById,
  userUpdate,
  userDelete,
  //   Rooms
  rooms,
  roomCreate,
  roomById,
  roomUpdate,
  roomDelete,
  //   Bookings
  bookings,
  bookingCreate,
  bookingById,
  bookingUpdate,
  bookingDelete,
  //   duties
  duties,
  dutyCreate,
  dutyById,
  dutyUpdate,
  dutyDelete,
};
