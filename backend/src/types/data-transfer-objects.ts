export default interface SeedFileStructure {
  userCredentials: UserCredentialsDTO[];
  userDetails: UserDetailsDTO[];
  userGoals: UserGoalsDTO[];
  food: FoodDTO[];
  eaten: EatenDTO[];
  meal: MealDTO[];
  user:UserDTO[];
}

export interface UserDTO{
  id : string;
  // credentials: UserCredentialsDTO;
  // details : UserDetailsDTO;
  // goals : UserGoalsDTO;
}

export interface UserCredentialsDTO {
  email: string;
  userId: string;
  passwordHash: string;
}

export interface UserDetailsDTO {
  id: string;
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

export interface MealDTO {
  id: string;
  userId: string;
  food: {
    id: string
  }[];
  type: string;
  date: Date;
}