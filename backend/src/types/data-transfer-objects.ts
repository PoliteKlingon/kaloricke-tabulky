export default interface SeedFileStructure {
  userCredentials: UserCredentialsDTO[];
  userDetails: UserDetailsDTO[];
  userGoals: UserGoalsDTO[];
  food: FoodDTO[];
  eaten: EatenDTO[];
  meal: MealDTO[];
  day: DayDTO[];
}

export interface UserCredentialsDTO {
  username: string;
  passwordHash: string;
}

export interface UserDetailsDTO {
  username: string;
  name: string;
  surname: string;
  weight: number;
  height: number;
  year_born: Date;
  sex: number;
  email: string;
  goalsLink: string
}

export interface UserGoalsDTO {
  id: string;
  carbs: number;
  proteins: number;
  fats: number;
  fiber: number;
  salt: number;
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
  foodLink: string;
  quantity: number;
}

export interface MealDTO {
  id: string;
  food: {
    id: string
  }[];
  type: string;
}

export interface DayDTO {
  id: string;
  userLink: string;
  date: Date;
  meals: {
    id: string
  }[];
}