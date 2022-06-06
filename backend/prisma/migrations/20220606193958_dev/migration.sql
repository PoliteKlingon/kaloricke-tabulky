-- CreateTable
CREATE TABLE "UserCredentials" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserGoals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "carbs" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "fats" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "salt" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "year_born" DATETIME NOT NULL,
    "sex" REAL NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "UserDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "UserCredentials" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "UserGoals" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "calories" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "carbs" REAL NOT NULL,
    "fats" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "salt" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Eaten" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "foodId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "Eaten_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserDetails" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EatenToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EatenToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Eaten" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EatenToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials_userId_key" ON "UserCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_userId_key" ON "UserGoals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_EatenToMeal_AB_unique" ON "_EatenToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_EatenToMeal_B_index" ON "_EatenToMeal"("B");
