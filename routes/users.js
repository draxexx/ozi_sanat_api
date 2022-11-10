const express = require("express");
const router = express.Router();

const { user } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await user.findAll();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

// gets single busStop
// router.get("/:id", async (req, res, next) => {
//   try {
//     const busStops = await BusStop.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "name"],
//     });
//     return res.json(busStops);
//   } catch (error) {
//     next(error);
//   }
// });

// create new busStop
// router.post("/", async (req, res, next) => {
//   const id = generateId(4);
//   try {
//     const createdBusStop = await BusStop.create({
//       id: id,
//       name: req.body.name,
//     });
//     const busStop = await BusStop.findOne({
//       where: {
//         id: createdBusStop.id,
//       },
//     });
//     return res.status(201).json(busStop);
//   } catch (error) {
//     next(error);
//   }
// });

// update the busStop
// router.post("/:id", async (req, res, next) => {
//   try {
//     await BusStop.update(
//       {
//         name: req.body.name,
//         updatedAt: new Date(),
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     const busStop = await BusStop.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     return res.status(200).json(busStop);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
