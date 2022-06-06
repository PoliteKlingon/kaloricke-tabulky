export default interface SeedFileStructure {
  userCredentials: UserCredentialsDTO[];
  userDetails: UserDetailsDTO[];
  userGoals: UserGoalsDTO[];
  food: FoodDTO[];
  eaten: EatenDTO[];
  meal: MealDTO[];
}

export interface UserCredentialsDTO {
  uuid: string;
  userId: string;
  passwordHash: string;
}

export interface UserDetailsDTO {
  uuid: string;
  username: string;
  name: string;
  surname: string;
  weight: number;
  height: number;
  year_born: Date;
  sex: number;
  email: string;
}

export interface UserGoalsDTO {
  id: string;
  userId: string;
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
  foodId: string;
  quantity: number;
}

export interface MealDTO {
  id: string;
  userId: string;
  food: {
    id: string
  }[];
  type: string;
  date: Date;
}