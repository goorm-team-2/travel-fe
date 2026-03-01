import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '../../api/productApi';
import IncludesExcludes from './IncludesExcludes';
import ProductSummaryCard from './ProductSummaryCard';
import SafeBadge from './SateBadge';
import Gallery from './Gallery';
import StickyContentTabs from './StickyContentTabs';
import PointsSection from './PointsSection';
import DetailSection from './DetailSection';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const { isLoggedIn } = useContext(AuthContext);
  const tabs = [
    { id: 'points', label: '상품개요' },
    { id: 'detail', label: '상세일정' },
    { id: 'notice', label: '유의사항' },
  ];

  useEffect(() => {
    if (!id) return;

    const numericId = Number(id);
    if (Number.isNaN(numericId)) return;

    productApi.getProductDetail(numericId).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <div>loading...</div>;

  return (
    <div className="w-full bg-background px-10 py-6 flex flex-col gap-5">
      {/* Hero Section */}
      <section className="w-[1200px] flex gap-6 mx-auto">
        <Gallery mainImage={product.mainImage} galleryImages={product.galleryImages} />
        {/* Info */}
        <div className="flex flex-col gap-6">
          <ProductSummaryCard
            name={product.name}
            rating={product.rating}
            reviewCount={product.reviewCount}
            departureAirport={product.departureAirport}
            duration={product.duration}
            minDeparture={product.minDeparture}
            price={product.price}
            isFavorite={false} // TODO: 백엔드 수정 되면 product.isFavorite으로 수정
          />
          <SafeBadge />
        </div>
      </section>

      <StickyContentTabs tabs={tabs} />

      <div className="flex gap-12 w-[1200px] mx-auto">
        <div className="flex flex-col gap-8">
          <PointsSection highlights={product.highlights} />
          <DetailSection itinerary={product.itinerary} />
          <IncludesExcludes includes={product.includes} excludes={product.excludes} />
        </div>
        <button
        onClick={() => {
          // 로그인 체크 로직 추가
          if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/auth?tab=login');
            return;
          }
          // 로그인 된 경우에만 스크롤 상단 이동 및 경로 이동 실행
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          navigate(`/inquiry/${product.id}`);
        }}
        className="sticky top-20 bg-primary w-full h-20 text-white font-medium text-[16px] rounded-[12px]"
        >
          문의 및 예약하기
        </button>   
      </div>
    </div>
  );
}
