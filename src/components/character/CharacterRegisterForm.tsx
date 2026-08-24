import { useState, type FormEvent } from "react";
import type {
  CreateCharacterRequest,
  NeopleCharacterSearchResult,
} from "../../types/character";

interface CharacterRegisterFormProps {
  character: NeopleCharacterSearchResult;
  loading: boolean;
  onRegister: (request: CreateCharacterRequest) => Promise<void>;
}

function optionalNumber(value: string): number | null {
  if (!value.trim()) {
    return null;
  }

  return Number(value.replaceAll(",", ""));
}

function formatInputNumber(value: string) {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) {
    return "";
  }

  return Number(numbers).toLocaleString("ko-KR");
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

export default function CharacterRegisterForm({
  character,
  loading,
  onRegister,
}: CharacterRegisterFormProps) {
  const [equipmentScore, setEquipmentScore] = useState("");
  const [dundamDamage, setDundamDamage] = useState("");
  const [buffScore, setBuffScore] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const equipmentScoreValue = Number(
      equipmentScore.replaceAll(",", ""),
    );

    if (!equipmentScoreValue || equipmentScoreValue <= 0) {
      return;
    }

    await onRegister({
      serverId: character.serverId,
      characterId: character.characterId,
      equipmentScore: equipmentScoreValue,
      dundamDamage: optionalNumber(dundamDamage),
      buffScore: optionalNumber(buffScore),
      memo: memo.trim() || null,
    });
  };

  return (
    <section className="overflow-hidden rounded-xl border border-[#4a261d] bg-[#120b08] shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
      {/* Header */}
      <div className="border-b border-[#382019] bg-[#160d09] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#e3402f] shadow-[0_0_12px_rgba(227,64,47,0.7)]" />

          <div>
            <h2 className="text-base font-semibold text-[#f0dfd1]">
              캐릭터 등록
            </h2>

            <p className="mt-1 text-xs text-[#856d61]">
              선택한 캐릭터의 레이드 관리 정보를 입력합니다.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* 선택 캐릭터 정보 */}
        <div className="rounded-xl border border-[#3f281f] bg-[#0d0806] p-5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#723326] bg-[#2b1611] text-xl font-bold text-[#ef735d] shadow-[0_0_18px_rgba(214,66,46,0.12)]">
                {character.characterName.slice(0, 1)}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="truncate text-xl font-bold text-[#f3e4d8]">
                    {character.characterName}
                  </h3>

                  <span className="rounded-md border border-[#4b3026] bg-[#1b110d] px-2.5 py-1 text-xs text-[#b48e79]">
                    {getServerLabel(character.serverId)}
                  </span>

                  <span className="text-xs text-[#80675b]">
                    Lv.{character.level}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-[#8e7366]">
                    {character.jobName}
                  </span>

                  <span className="text-[#4f3b33]">/</span>

                  <span className="font-medium text-[#d5b8a7]">
                    {character.jobGrowName}
                  </span>
                </div>
              </div>
            </div>

            {/* 명성 */}
            <div className="shrink-0 border-l border-[#35221b] pl-8 text-right">
              <p className="text-xs text-[#776057]">명성</p>

              <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#dfa740]">
                {character.fame.toLocaleString("ko-KR")}
              </p>
            </div>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          {/* 장비점수 */}
          <div>
            <label
              htmlFor="equipmentScore"
              className="mb-2 flex items-center gap-1 text-xs font-medium text-[#a88979]"
            >
              장비점수
              <span className="text-[#e3543d]">*</span>
            </label>

            <div className="relative">
              <input
                id="equipmentScore"
                value={equipmentScore}
                onChange={(event) =>
                  setEquipmentScore(
                    formatInputNumber(event.target.value),
                  )
                }
                disabled={loading}
                inputMode="numeric"
                autoComplete="off"
                placeholder="530,000"
                className="h-12 w-full rounded-lg border border-[#633326] bg-[#0b0705] px-4 pr-16 font-mono text-base font-semibold tabular-nums text-[#f0d6c5] outline-none transition
                           placeholder:font-normal placeholder:text-[#5d4941]
                           hover:border-[#7a3d2d]
                           focus:border-[#dc4934]
                           focus:ring-2 focus:ring-[#dc4934]/15
                           disabled:cursor-not-allowed disabled:opacity-50"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#684f45]">
                필수
              </span>
            </div>
          </div>

          {/* 던담딜 */}
          <div>
            <label
              htmlFor="dundamDamage"
              className="mb-2 block text-xs font-medium text-[#a88979]"
            >
              던담딜
            </label>

            <input
              id="dundamDamage"
              value={dundamDamage}
              onChange={(event) =>
                setDundamDamage(
                  formatInputNumber(event.target.value),
                )
              }
              disabled={loading}
              inputMode="numeric"
              autoComplete="off"
              placeholder="선택 입력"
              className="h-12 w-full rounded-lg border border-[#45291f] bg-[#0b0705] px-4 font-mono text-base tabular-nums text-[#e7d2c4] outline-none transition
                         placeholder:font-sans placeholder:text-sm placeholder:text-[#5d4941]
                         hover:border-[#633628]
                         focus:border-[#c54930]
                         focus:ring-2 focus:ring-[#c54930]/15
                         disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* 버프점수 */}
          <div>
            <label
              htmlFor="buffScore"
              className="mb-2 block text-xs font-medium text-[#a88979]"
            >
              버프점수
            </label>

            <input
              id="buffScore"
              value={buffScore}
              onChange={(event) =>
                setBuffScore(
                  formatInputNumber(event.target.value),
                )
              }
              disabled={loading}
              inputMode="numeric"
              autoComplete="off"
              placeholder="선택 입력"
              className="h-12 w-full rounded-lg border border-[#45291f] bg-[#0b0705] px-4 font-mono text-base tabular-nums text-[#e7d2c4] outline-none transition
                         placeholder:font-sans placeholder:text-sm placeholder:text-[#5d4941]
                         hover:border-[#633628]
                         focus:border-[#c54930]
                         focus:ring-2 focus:ring-[#c54930]/15
                         disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* 메모 */}
        <div className="mt-4">
          <label
            htmlFor="memo"
            className="mb-2 block text-xs font-medium text-[#a88979]"
          >
            메모
          </label>

          <textarea
            id="memo"
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            disabled={loading}
            rows={3}
            placeholder="캐릭터 관련 메모를 입력하세요."
            className="w-full resize-none rounded-lg border border-[#45291f] bg-[#0b0705] px-4 py-3 text-sm leading-6 text-[#e7d2c4] outline-none transition
                       placeholder:text-[#5d4941]
                       hover:border-[#633628]
                       focus:border-[#c54930]
                       focus:ring-2 focus:ring-[#c54930]/15
                       disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Bottom */}
        <div className="mt-6 flex items-center justify-between border-t border-[#302019] pt-5">
          <p className="text-xs text-[#665149]">
            장비점수는 반드시 입력해야 합니다.
          </p>

          <button
            type="submit"
            disabled={
              loading ||
              !equipmentScore.replaceAll(",", "").trim()
            }
            className="flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-lg border border-[#f05438]/60
                       bg-gradient-to-b from-[#e94a32] to-[#b92b21]
                       px-7 text-sm font-semibold text-[#fff5ee]
                       shadow-[0_6px_22px_rgba(205,54,37,0.22)]
                       transition
                       hover:from-[#f2553a] hover:to-[#ca3226]
                       hover:shadow-[0_8px_28px_rgba(205,54,37,0.32)]
                       disabled:cursor-not-allowed disabled:border-[#503128]
                       disabled:from-[#3a2520] disabled:to-[#2a1b17]
                       disabled:text-[#776159] disabled:shadow-none"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#fff5ee]/30 border-t-[#fff5ee]" />
            )}

            {loading ? "등록 중..." : "캐릭터 등록"}
          </button>
        </div>
      </form>
    </section>
  );
}