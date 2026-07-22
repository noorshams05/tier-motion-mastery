import p1 from "@/assets/photos/21c8ccfe-5800-4b3c-8f6c-ff750b6bff17.jpg.asset.json";
import p2 from "@/assets/photos/2cda5e06-e8e9-4a85-823f-553db1f05d7a.jpg.asset.json";
import p3 from "@/assets/photos/3ba58102-9be3-4553-bcce-eb465bd646c0.jpg.asset.json";
import p4 from "@/assets/photos/60406409-6a7c-4ddf-9d13-ffc41adaa688.jpg.asset.json";
import p5 from "@/assets/photos/65bac265-a5fc-4fa4-8729-996c7d0995f1.jpg.asset.json";
import p6 from "@/assets/photos/8a92487c-609f-4b71-9041-2d8150467f7b.jpg.asset.json";
import p7 from "@/assets/photos/8f7806a1-f603-4d42-8d01-b8e33864d916.jpg.asset.json";
import p8 from "@/assets/photos/a6bacc9c-eb42-4f9d-9e80-d0ba121b9b36.jpg.asset.json";
import p9 from "@/assets/photos/ece4bb8d-7e17-4840-a430-3187e95d900f.jpg.asset.json";
import p10 from "@/assets/photos/ee83274c-1dba-4189-b716-0fb5e5b95727.jpg.asset.json";
import p11 from "@/assets/photos/f9bed242-65e8-4fe0-b5c5-b5eaa88f71f5.jpg.asset.json";
import logoAsset from "@/assets/top-tier-logo.png.asset.json";
import truckAsset from "@/assets/top-tier-truck.png.asset.json";

// Content-mapped photos
export const photos = {
  packing: p1.url,           // perfectly stacked kitchen boxes -> Professional Packing
  loadedHomeDepot: p2.url,   // Home Depot boxes loaded neatly
  furniturePad: p3.url,      // blue moving pads wrapping furniture
  loadedUhaul: p4.url,       // U-Haul boxes stacked in truck
  storage: p5.url,           // storage unit with mattresses/pads
  loadedLowes: p6.url,       // Lowe's boxes packed truck
  interior: p7.url,          // household items loaded
  storageUnit: p8.url,       // storage unit navy pads
  variety: p9.url,           // varied packed boxes
  equipment: p10.url,        // dollies, hand trucks, moving pads
  fullTruck: p11.url,        // fully loaded U-Haul truck
};

export const logoUrl = logoAsset.url;
export const truckBrandedUrl = truckAsset.url;

export const galleryPhotos = [
  photos.packing,
  photos.loadedUhaul,
  photos.storageUnit,
  photos.loadedHomeDepot,
  photos.furniturePad,
  photos.loadedLowes,
  photos.variety,
  photos.interior,
  photos.storage,
  photos.equipment,
  photos.fullTruck,
];
