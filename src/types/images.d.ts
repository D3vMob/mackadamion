import type { StaticImageData } from 'next/image';

declare module "*.png" {
  const content: StaticImageData;
  export default content;
}
declare module "*.jpg" {
  const content: StaticImageData;
  export default content;
}