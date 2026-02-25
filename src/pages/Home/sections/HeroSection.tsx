import SearchBar from './SearchBar';

export default function HeroSection() {
  return (
    <section className="w-full pt-[24px] py-[64px]">
      <div className="relative mx-auto h-[552px] w-[1200px] overflow-hidden rounded-[24px]">
        <img src="/hero.png" alt="hero" className="h-full w-full object-cover object-top" />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.60) 100%)',
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-[472px] w-[1120px] flex-col items-center px-[24px] pt-[140px]">
            <div className="flex flex-col items-center pb-[16px]">
              <h2
                className="text-center font-bold text-white"
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: 60,
                  lineHeight: '60px',
                  letterSpacing: '-1.5px',
                }}
              >
                어디로 떠나고 싶으신가요?
              </h2>

              <p
                className="mt-3 text-center text-white"
                style={{
                  fontFamily: 'Pretendard',
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: '28px',
                }}
              >
                꿈꾸던 여행지를 지금 바로 검색해보세요
              </p>
            </div>

            <div className="mt-[28px]">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
