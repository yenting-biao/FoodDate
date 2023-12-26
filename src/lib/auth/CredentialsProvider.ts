import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { authSchema } from "@/validators/auth";

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    username: { label: "Userame", type: "text", optional: true },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
      username?: string;
      password: string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      console.log("Wrong credentials. Try again.");
      return null;
    }
    const { email, username, password } = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.userId,
        username: usersTable.username,
        email: usersTable.ntuEmail,
        hashedPassword: usersTable.hashedPassword,
      })
      .from(usersTable)
      .where(eq(usersTable.ntuEmail, validatedCredentials.email.toLowerCase()))
      .execute();
    if (!existedUser) {
      // Sign up
      if (!username) {
        console.log("Name is required.");
        return null;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const [createdUser] = await db
        .insert(usersTable)
        .values({
          username,
          ntuEmail: email.toLowerCase(),
          hashedPassword,
        })
        .returning();
        return {
          email: createdUser.ntuEmail,
          username: createdUser.username,
          id: createdUser.userId
        };
    }

    // Sign in

    const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
    if (!isValid) {
      console.log("Wrong password. Try again.");
      return null;
    }
    return {
      email: existedUser.email,
      name: existedUser.username,
      id: existedUser.id,
    };
  },
});