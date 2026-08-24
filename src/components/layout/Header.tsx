export default function Header() {
  return (
    <header className="border-b border-[#5a211b] bg-[#140b08]">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#ef3b2d] text-lg font-bold text-white shadow-[0_0_16px_rgba(239,59,45,0.35)]">
            D
          </div>

          <div>
            <h1 className="text-lg font-semibold text-[#e1a93b]">
              모험단 등록
            </h1>

            <p className="mt-0.5 text-xs tracking-[0.08em] text-[#8d7467]">
              DNF · Neople OpenAPI → DB
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}