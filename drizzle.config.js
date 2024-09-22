/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://AI-Course-Generator_owner:d7ZxiHCYe5lQ@ep-still-glitter-a5t59clo.us-east-2.aws.neon.tech/AI-Course-Generator?sslmode=require",
    }
  };