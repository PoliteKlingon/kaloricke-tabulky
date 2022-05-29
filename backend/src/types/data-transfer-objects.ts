export default interface SeedFileStructure {
    userCredentials: UserCredentialsDTO[];
}

export interface UserCredentialsDTO {
    id: string;
    username: string;
    passwordHash: string;
}

