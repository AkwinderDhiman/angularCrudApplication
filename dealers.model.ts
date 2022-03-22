export class Dealers {
    id: number = 0;
    name: String = "  ";
    totalBudget: Number = 0;
    remainingBudget: Number = 0;
    owner!: {
        firstName: String;
        lastName: String;
    } 
    location!: {
        latitude: Number;
        longitude: Number;
    } 
  amountOfCars!: Number ;
}