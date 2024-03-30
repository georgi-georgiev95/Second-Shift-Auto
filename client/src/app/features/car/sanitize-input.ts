import { Car, PhotoUrl } from "src/app/types/car.interface";

export function sanitizeInput(carObj: Car) {
    Object.keys(carObj).forEach((key) => {
        if(typeof carObj[key] === 'string') {
          carObj[key] = carObj[key].trim();
        } else if(key == 'additionalImages') {
          carObj[key].forEach((item: PhotoUrl) => {
            item.url = item.url.trim();
          })
        }
    })
}