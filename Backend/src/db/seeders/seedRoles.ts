import pool from "../index";

async function seedRoles() {
  try {
    await pool.query(`
      INSERT INTO roles (name)
      VALUES
      ('student'),
      ('instructor'),
      ('admin')
      ON CONFLICT (name) DO NOTHING;
    `);

    console.log("Roles seeded successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

seedRoles();