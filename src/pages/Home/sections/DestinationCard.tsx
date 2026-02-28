import { useNavigate } from 'react-router-dom';
import type { FeaturedProduct } from '../../../types/product';

export default function DestinationCard({ item }: { item: FeaturedProduct }) {
  const navigate = useNavigate();

  console.log('featured imageUrl:', item.imageUrl);

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/products/${item.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/products/${item.id}`);
      }}
      className="relative h-[349.33px] w-[262px] cursor-pointer overflow-hidden rounded-[8px] bg-slate-100"
      style={{
        boxShadow: '0px 2px 4px -2px rgba(0,0,0,0.10), 0px 4px 6px -1px rgba(0,0,0,0.10)',
      }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          const img = e.currentTarget;
          const tried = img.dataset.tried ?? '';

          if (img.src.endsWith('.jpg') && !tried.includes('jpeg')) {
            img.dataset.tried = tried + 'jpeg,';
            img.src = img.src.replace(/\.jpg$/, '.jpeg');
            return;
          }

          if ((img.src.endsWith('.jpg') || img.src.endsWith('.jpeg')) && !tried.includes('png')) {
            img.dataset.tried = tried + 'png,';
            img.src = img.src.replace(/\.(jpg|jpeg)$/, '.png');
            return;
          }

          img.src = '/images/placeholder.jpg';
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-[20px] font-bold leading-[28px] text-white">{item.title}</h3>
        <p className="mt-1 text-[14px] leading-[20px] text-white/80">{item.priceText}</p>
      </div>
    </article>
  );
}
