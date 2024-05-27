const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userExists = await models.users.findOne({
      where: { email },
      attributes: ["email", "password", "id"],
      raw: true,
    });

    if (!userExists) {
      return res
        .status(400)
        .json({ message: "Sorry, this user does not exist!" });
    }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Password does not match!" });
    }

    // ==================
    const accessToken = jwt.sign(
      {
        id: userExists.id,
        email: userExists.email,
      },
      "12345",
      { expiresIn: "24h" }
    );
    return res.status(200).json({ accessToken });

    // ===================
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = login;
