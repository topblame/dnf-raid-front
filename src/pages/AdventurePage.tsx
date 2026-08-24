import { useCallback, useEffect, useState } from "react";
import { getAdventures } from "../api/adventureApi";
import type { Adventure } from "../types/adventure";

const SERVER_LABELS: Record<string, string> = {
  cain: "카인",
  diregie: "디레지에",
  siroco: "시로코",
  prey: "프레이",
  casillas: "카시야스",
  hilder: "힐더",
  anton: "안톤",
  bakal: "바칼",
};

function formatNumber(value: number | null) {
  return value === null ? "-" : value.toLocaleString("ko-KR");
}

export default function AdventurePage() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAdventures = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setAdventures(await getAdventures());
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "모험단 목록을 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAdventures();
  }, [loadAdventures]);

  return (
    <div>
      <header className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#f0dfd1]">
            저장된 모험단
          </h1>
          <p className="mt-2 text-sm text-[#987a69]">
            등록된 캐릭터를 모험단 단위로 확인하고 관리합니다.
          </p>
        </div>

        {!loading && (
          <button
            type="button"
            onClick={() => void loadAdventures()}
            className="rounded-lg border border-[#4a2b21] bg-[#160d09] px-4 py-2 text-xs font-semibold text-[#c6a08a] transition hover:border-[#754031] hover:text-[#f0dfd1]"
          >
            새로고침
          </button>
        )}
      </header>

      {loading && (
        <section className="flex min-h-[220px] items-center justify-center rounded-xl border border-[#3f281f] bg-[#0d0806]">
          <div className="flex items-center gap-3 text-sm text-[#987a69]">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#e23a2f]/25 border-t-[#e23a2f]" />
            모험단 목록을 불러오는 중입니다.
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="rounded-xl border border-red-900 bg-red-950/30 px-6 py-8 text-center">
          <p className="text-sm text-red-300">{error}</p>
          <button
            type="button"
            onClick={() => void loadAdventures()}
            className="mt-4 rounded-lg border border-red-800 px-4 py-2 text-xs font-semibold text-red-200 hover:bg-red-950/60"
          >
            다시 시도
          </button>
        </section>
      )}

      {!loading && !error && adventures.length === 0 && (
        <section className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-[#3f281f] bg-[#0d0806] px-8 text-center">
          <div>
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-[#3f281f] bg-[#160d09] text-lg text-[#8d6e5e]">
              ▤
            </div>
            <p className="text-sm font-medium text-[#b18e79]">
              저장된 모험단이 없습니다.
            </p>
            <p className="mt-2 text-xs text-[#6f574c]">
              캐릭터 조회 화면에서 캐릭터를 등록하면 모험단별로 표시됩니다.
            </p>
          </div>
        </section>
      )}

      {!loading && !error && adventures.length > 0 && (
        <div className="space-y-5">
          {adventures.map((adventure) => (
            <section
              key={adventure.id}
              className="overflow-hidden rounded-xl border border-[#4a261d] bg-[#120b08] shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
            >
              <header className="flex items-center justify-between border-b border-[#382019] bg-[#160d09] px-6 py-4">
                <div>
                  <h2 className="font-semibold text-[#f0dfd1]">
                    {adventure.adventureName}
                  </h2>
                  {adventure.memo && (
                    <p className="mt-1 text-xs text-[#80675b]">{adventure.memo}</p>
                  )}
                </div>
                <span className="rounded-full border border-[#4b2d22] bg-[#1b110d] px-3 py-1 text-xs font-semibold text-[#d6a341]">
                  {adventure.characters.length}캐릭터
                </span>
              </header>

              <div className="grid grid-cols-[minmax(150px,1.3fr)_90px_minmax(130px,1fr)_130px_120px] gap-4 border-b border-[#302019] bg-[#0e0907] px-6 py-3 text-xs font-semibold text-[#8f7467]">
                <span>캐릭터</span>
                <span>서버</span>
                <span>직업</span>
                <span className="text-right">명성</span>
                <span className="text-right">장비점수</span>
              </div>

              {adventure.characters.length === 0 ? (
                <p className="px-6 py-8 text-center text-sm text-[#6f574c]">
                  등록된 캐릭터가 없습니다.
                </p>
              ) : (
                <div className="divide-y divide-[#2d1b15]">
                  {adventure.characters.map((character) => (
                    <div
                      key={character.id}
                      className="grid grid-cols-[minmax(150px,1.3fr)_90px_minmax(130px,1fr)_130px_120px] items-center gap-4 px-6 py-4 transition-colors hover:bg-[#18100c]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#e6d2c3]">
                          {character.characterName}
                        </p>
                        {character.memo && (
                          <p className="mt-1 truncate text-[11px] text-[#725a50]">
                            {character.memo}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-[#b9937e]">
                        {SERVER_LABELS[character.serverId] ?? character.serverId}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-[#d5b8a7]">
                          {character.jobName}
                        </p>
                        {character.jobGroup && (
                          <p className="mt-1 truncate text-[11px] text-[#725a50]">
                            {character.jobGroup}
                          </p>
                        )}
                      </div>
                      <span className="text-right font-mono text-sm tabular-nums text-[#bda291]">
                        {formatNumber(character.fame)}
                      </span>
                      <span className="text-right font-mono text-sm font-bold tabular-nums text-[#e0a943]">
                        {formatNumber(character.equipmentScore)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
