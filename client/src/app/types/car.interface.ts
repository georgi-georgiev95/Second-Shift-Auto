enum EngineType {
  Petrol,
  Diesel,
  Electric,
  Hybrid,
}

enum GearBox {
  Manual,
  Automatic,
}

enum Category {
  Hatchback,
  Sedan,
  SUV,
  Wagon,
  Coupe,
}

interface additionalImages {
  url: string;
}

export interface Car {
  _id?: string;
  make: string;
  model: string;
  price: number;
  year: number;
  engineType: EngineType;
  power: number;
  gearbox: GearBox;
  category: Category;
  mileage: number;
  color: string;
  description: string;
  image: string;
  location: string;
  additionalImages: additionalImages[];
  owner?: string;
  error?: string;
}
