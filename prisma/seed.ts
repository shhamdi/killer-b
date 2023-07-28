import { hash } from "bcrypt"

import { db } from "../src/server/db"

async function main() {
  const password = await hash("password123", 12)
  const user = await db.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  })
  console.log({ user })
}
main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
