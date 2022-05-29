export default interface SeedFileStructure {
  userCredentials: UserCredentialsDTO[];
  userDetails: UserDetailsDTO[];
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
  desired_carbs: number;
  desired_proteins: number;
  desired_fats: number;
  desired_fiber: number;
}

