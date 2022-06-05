-- CreateTable
CREATE TABLE "UserCredentials" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserGoals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carbs" REAL NOT NULL,
    "proteins" REAL NOT NULL,
    "fats" REAL NOT NULL,
    "fiber" REAL NOT NULL,
    "salt" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "UserDetails" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "credentialsLink" TEXT NOT NULL,
    "goalsLink" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "height" REAL NOT NULL,
    "year_born" DATETIME NOT NULL,
    "sex" REAL NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "UserDetails_credentialsLink_fkey" FOREIGN KEY ("credentialsLink") REFERENCES "UserCredentials" ("username") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserDetails_goalsLink_fkey" FOREIGN KEY ("goalsLink") REFERENCES "UserGoals" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "foodLink" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    CONSTRAINT "Eaten_foodLink_fkey" FOREIGN KEY ("foodLink") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userLink" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Day_userLink_fkey" FOREIGN KEY ("userLink") REFERENCES "UserDetails" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EatenToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EatenToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Eaten" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EatenToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DayToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DayToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "Day" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DayToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_credentialsLink_key" ON "UserDetails"("credentialsLink");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_goalsLink_key" ON "UserDetails"("goalsLink");

-- CreateIndex
CREATE UNIQUE INDEX "_EatenToMeal_AB_unique" ON "_EatenToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_EatenToMeal_B_index" ON "_EatenToMeal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayToMeal_AB_unique" ON "_DayToMeal"("A", "B");

-- CreateIndex
CREATE INDEX "_DayToMeal_B_index" ON "_DayToMeal"("B");
