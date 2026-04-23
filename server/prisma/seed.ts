import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { set } from "zod"

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash("12345678", 10)

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
    },
  })

 const questionsData = [
  {
    title: "How does React state work?",
    body: "Can someone explain useState in simple terms?",
    tags: ["react", "frontend"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "What is Prisma ORM?",
    body: "How is Prisma different from traditional ORMs?",
    tags: ["prisma", "database"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to implement authentication in Node.js?",
    body: "Best way to implement JWT authentication?",
    tags: ["nodejs", "backend"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "Why is my API returning 404?",
    body: "My Express route is not working properly.",
    tags: ["express", "api"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to optimize SQL queries?",
    body: "Query is too slow, how to improve performance?",
    tags: ["sql", "database"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "What is JWT and how does it work?",
    body: "Need a simple explanation with example.",
    tags: ["jwt", "auth"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to use Tailwind CSS effectively?",
    body: "Best practices for writing clean Tailwind code?",
    tags: ["tailwind", "css"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "REST vs GraphQL?",
    body: "Which one should I choose and why?",
    tags: ["api", "graphql"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to implement infinite scroll?",
    body: "Looking for best approach in React.",
    tags: ["react", "pagination"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "Best backend architecture?",
    body: "How to structure scalable backend?",
    tags: ["backend", "architecture"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },

  // --- 30 more below ---

  {
    title: "How to handle errors in Express?",
    body: "Global error handling best practices?",
    tags: ["express", "backend"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "What is middleware in Node.js?",
    body: "How does middleware actually work?",
    tags: ["nodejs"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to deploy a Node.js app?",
    body: "Best platforms for deployment?",
    tags: ["deployment", "nodejs"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to connect Prisma with PostgreSQL?",
    body: "Facing issues while connecting DB.",
    tags: ["prisma", "postgres"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to design database schema?",
    body: "Best practices for relational DB design?",
    tags: ["database"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "What is indexing in DB?",
    body: "How does indexing improve performance?",
    tags: ["database"],
    userId: user.id,
    isSolved: true,
    anonymous: true,
  },
  {
    title: "How to secure REST APIs?",
    body: "What are common vulnerabilities?",
    tags: ["security", "api"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to use useEffect properly?",
    body: "Confused with dependencies array.",
    tags: ["react"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to manage global state in React?",
    body: "Redux vs Context API?",
    tags: ["react"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "What is TypeScript?",
    body: "Why should I use TS instead of JS?",
    tags: ["typescript"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },

  {
    title: "How to debug Node.js apps?",
    body: "Best debugging tools?",
    tags: ["nodejs"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to structure React project?",
    body: "Folder structure best practices?",
    tags: ["react"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "What is event loop in Node?",
    body: "Explain with simple example.",
    tags: ["nodejs"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to use Axios?",
    body: "How to handle API calls efficiently?",
    tags: ["axios"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to implement file upload?",
    body: "Using multer in Node.js?",
    tags: ["nodejs"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "What is CORS?",
    body: "Why do we get CORS errors?",
    tags: ["api"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to use environment variables?",
    body: "Best practices with dotenv?",
    tags: ["nodejs"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to optimize React performance?",
    body: "Memoization and lazy loading?",
    tags: ["react"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "What is SSR in React?",
    body: "Difference between CSR and SSR?",
    tags: ["react"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "How to use Docker with Node?",
    body: "Basic setup for backend app.",
    tags: ["docker"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },

  {
    title: "What is microservices architecture?",
    body: "When should we use it?",
    tags: ["architecture"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to scale Node.js app?",
    body: "Handling high traffic?",
    tags: ["backend"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "What is caching?",
    body: "Redis vs in-memory caching?",
    tags: ["cache"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "How to implement rate limiting?",
    body: "Protect APIs from abuse.",
    tags: ["security"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "How to log errors in production?",
    body: "Best logging tools?",
    tags: ["logging"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to write clean code?",
    body: "Any coding standards to follow?",
    tags: ["coding"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "What is CI/CD?",
    body: "How to automate deployments?",
    tags: ["devops"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
  {
    title: "How to use Git properly?",
    body: "Branching strategy?",
    tags: ["git"],
    userId: user.id,
    isSolved: false,
    anonymous: true,
  },
  {
    title: "How to fix memory leaks?",
    body: "Common causes in Node apps?",
    tags: ["nodejs"],
    userId: user.id,
    isSolved: false,
    anonymous: false,
  },
  {
    title: "What is WebSocket?",
    body: "Difference from HTTP?",
    tags: ["websocket"],
    userId: user.id,
    isSolved: true,
    anonymous: false,
  },
];


const questionsWithTimestamps = questionsData.map((q, index) => ({
  ...q,
  createdAt: new Date(Date.now() + index * 9000), // +1 second gap
}));

await prisma.question.createMany({
  data: questionsWithTimestamps,
});

  console.log("✅ Questions Seeded Successfully")
}


main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })