const models = require("../models");
const bcrypt = require("bcrypt");

async function signup(req, res) {
    console.log(req.body);
  const { userName, email, contactInfo, password } = req.body;

  try {
    const emailExist = await models.users.findOne({
      where: { email },
      attributes: ["email"],
      raw: true,
    });

    if (emailExist) {
      return res.status(400).json({ error: "This user already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    await models.users.create({
      userName,
      email,
      contactInfo,
      password: hashedPassword,
    });

    return res.status(200).json({ success: "Signup successful!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = signup;
