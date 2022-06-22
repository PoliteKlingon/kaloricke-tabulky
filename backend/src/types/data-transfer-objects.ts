export default interface SeedFileStructure {
  userCredentials: UserCredentialsDTO[];
  userDetails: UserDetailsDTO[];
  userGoals: UserGoalsDTO[];
  food: FoodDTO[];
  eaten: EatenDTO[];
  user: UserDTO[];
  session: SessionDTO[];
  diaryEntry: DiaryEntryDTO[];
}

export interface UserDTO {
  id: string;
}

export interface UserCredentialsDTO {
  email: string;
  userId: string;
  passwordHash: string;
}

export interface UserDetailsDTO {
  username: string;
  name: string;
  surname: string;
  weight: number;
  height: number;
  birthdate: Date;
  sex: number;
  email: string;
  userId: string;
}

export interface UserGoalsDTO {
  id: string;
  userId: string;
  carbs: number;
  proteins: number;
  fats: number;
  fiber: number;
  salt: number;
  calories: number;
}

export interface FoodDTO {
  id: string;
  name: string;
  description: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  salt: number;
}

export interface EatenDTO {
  id: string;
  foodId: string;
  quantity: number;
}

export interface SessionDTO {
  id: string;
  userId: string;
}

export interface DiaryEntryDTO {
  id: string;
  userId: string;
  foodId: string;
  date: Date;
  grams: number;
  mealType: string;
}
