## Getting Started

**First of all, install all required packages:**

```bash
npm i
```

**Second, setup the db**

Copy the `.example.env` file, rename it to `.env`, then open it up.
You will see `DATABASE_URL` variable.
Now you must fill it with local or hosted postgres db url.

After that, run `npx prisma generate`.
This will generate a library in `src/generated/prisma`.

**That's all ig, Now you can run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.