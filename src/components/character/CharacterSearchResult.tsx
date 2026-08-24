import type { NeopleCharacterSearchResult } from "../../types/character";

interface CharacterSearchResultProps {
  characters: NeopleCharacterSearchResult[];
  selectedCharacter: NeopleCharacterSearchResult | null;
  onSelect: (character: NeopleCharacterSearchResult) => void;
}

function formatNumber(value: number) {
  return value.toLocaleString("ko-KR");
}

function getServerLabel(serverId: string) {
  const serverMap: Record<string, string> = {
    cain: "카인",
    diregie: "디레지에",
    siroco: "시로코",
    prey: "프레이",
    casillas: "카시야스",
    hilder: "힐더",
    anton: "안톤",
    bakal: "바칼",
  };

  return serverMap[serverId] ?? serverId;
}

export default function CharacterSearchResult({
  characters,
  selectedCharacter,
  onSelect,
}: CharacterSearchResultProps) {
  if (characters.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-xl border border-[#4a261d] bg-[#120b08] shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#382019] bg-[#160d09] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#d99b22] shadow-[0_0_12px_rgba(217,155,34,0.55)]" />

          <div>
            <h2 className="text-base font-semibold text-[#f0dfd1]">
              조회 결과
            </h2>

            <p className="mt-1 text-xs text-[#856d61]">
              등록할 캐릭터를 선택해주세요.
            </p>
          </div>
        </div>

        <span className="rounded-full border border-[#4b2d22] bg-[#1b110d] px-3 py-1 text-xs font-medium text-[#b9937e]">
          {characters.length}건
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[minmax(150px,1.4fr)_64px_90px_110px_minmax(130px,1fr)_110px_76px] items-center gap-3 border-b border-[#302019] bg-[#0e0907] px-6 py-3 text-xs font-semibold text-[#8f7467]">
        <div>캐릭터</div>
        <div>레벨</div>
        <div>서버</div>
        <div>직업</div>
        <div>전직</div>
        <div className="text-right">명성</div>
        <div className="text-right">선택</div>
      </div>

      {/* Character Rows */}
      <div className="divide-y divide-[#2d1b15]">
        {characters.map((character) => {
          const selected =
            selectedCharacter?.characterId === character.characterId;

          return (
            <div
              key={character.characterId}
              className={`group grid grid-cols-[minmax(150px,1.4fr)_64px_90px_110px_minmax(130px,1fr)_110px_76px] items-center gap-3 px-6 py-4 transition ${
                selected
                  ? "bg-[#2a1611] shadow-[inset_3px_0_0_#e34a33]"
                  : "bg-[#120b08] hover:bg-[#18100c]"
              }`}
            >
              {/* Character */}
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold ${
                      selected
                        ? "border-[#b84130] bg-[#341a14] text-[#f07860]"
                        : "border-[#3e281f] bg-[#18100c] text-[#8e6f60]"
                    }`}
                  >
                    {character.characterName.slice(0, 1)}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-semibold leading-6 ${
                        selected
                          ? "text-[#f3e2d5]"
                          : "text-[#ddc9ba]"
                      }`}
                    >
                      {character.characterName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Level */}
              <div className="whitespace-nowrap text-sm text-[#c2a99a]">
                Lv.{character.level}
              </div>

              {/* Server */}
              <div>
                <span className="inline-flex rounded-md border border-[#443027] bg-[#1b120e] px-2.5 py-1 text-xs text-[#b58e78]">
                  {getServerLabel(character.serverId)}
                </span>
              </div>

              {/* Job */}
              <div className="truncate text-sm text-[#ad9182]">
                {character.jobName}
              </div>

              {/* Job Grow */}
              <div className="truncate text-sm font-medium text-[#e2cbbc]">
                {character.jobGrowName}
              </div>

              {/* Fame */}
              <div className="text-right">
                <p className="font-mono text-base font-semibold tabular-nums text-[#e0a943]">
                  {formatNumber(character.fame)}
                </p>

                <p className="mt-0.5 text-[10px] text-[#6e564b]">
                  명성
                </p>
              </div>

              {/* Select */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSelect(character)}
                  className={`min-w-[76px] rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                    selected
                      ? "border-[#693127] bg-[#321913] text-[#e7816c]"
                      : "border-[#523126] bg-[#1d120e] text-[#b89481] hover:border-[#b54131] hover:bg-[#301812] hover:text-[#f0c0ad]"
                  }`}
                >
                  {selected ? "선택됨" : "선택"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
