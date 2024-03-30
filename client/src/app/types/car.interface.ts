enum EngineType {
  Petrol = "Petrol",
  Diesel = "Diesel",
  Electric = "Electric",
  Hyybrid = "Hybrid",
}

enum GearBox {
  Manual = "Manual",
  Automatic = "Automatic",
}

enum Category {
  Hatchback = "Hatchback",
  Sedan = "Sedan",
  SUV = "SUV",
  Wagon = "Wagon",
  Coupe = "Coupe",
}

interface additionalImages {
  url: string;
}

export interface Car {
  _id?: string;
  make: string;
  model: string;
  price: string;
  year: string;
  engineType: EngineType;
  power: string;
  gearbox: GearBox; 
  category: Category;
  mileage: string;
  color: string;
  description: string;
  image: string;
  location: string;
  additionalImages: additionalImages[];
  owner?: string;
  buyer?: string[];
  error?: string;
  [key: string]: any;
}

export interface PhotoUrl {
  url: string;
}