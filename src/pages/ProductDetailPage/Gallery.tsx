const BASE_URL = 'http://localhost:8081';

type Props = {
  mainImage: string;
  galleryImages: string[];
};

export default function Gallery({ mainImage, galleryImages }: Props) {
  return (
    <div className="w-[740px] flex flex-col gap-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-[12px]">
        <img className="w-full h-[415px] object-cover" src={BASE_URL + mainImage} alt="" />
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4 overflow-hidden">
        {galleryImages.map((image) => (
          <img
            src={BASE_URL + image}
            alt=""
            className="w-full aspect-square object-cover rounded-[12px]"
          />
        ))}
      </div>
    </div>
  );
}
