import { useState, type FormEvent } from "react";

interface CharacterSearchFormProps {
  loading: boolean;
  onSearch: (serverId: string, characterName: string) => void;
}

const SERVERS = [
  { value: "cain", label: "카인" },
  { value: "diregie", label: "디레지에" },
  { value: "siroco", label: "시로코" },
  { value: "prey", label: "프레이" },
  { value: "casillas", label: "카시야스" },
  { value: "hilder", label: "힐더" },
  { value: "anton", label: "안톤" },
  { value: "bakal", label: "바칼" },
];

export default function CharacterSearchForm({
  loading,
  onSearch,
}: CharacterSearchFormProps) {
  const [serverId, setServerId] = useState("siroco");
  const [characterName, setCharacterName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = characterName.trim();

    if (!trimmedName) {
      return;
    }

    onSearch(serverId, trimmedName);
  };

  return (
    <section className="overflow-hidden rounded-xl border border-[#4a261d] bg-[#120b08] shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
      <div className="border-b border-[#382019] bg-[#160d09] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#e3402f] shadow-[0_0_12px_rgba(227,64,47,0.7)]" />

          <div>
            <h2 className="text-base font-semibold text-[#f0dfd1]">
              캐릭터 조회
            </h2>

            <p className="mt-1 text-xs text-[#856d61]">
              네오플 OpenAPI에서 캐릭터 정보를 조회합니다.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6">
        <div className="grid grid-cols-[220px_1fr_auto] items-end gap-4">
          {/* 서버 */}
          <div>
            <label
              htmlFor="serverId"
              className="mb-2 block text-xs font-medium text-[#a88979]"
            >
              서버
            </label>

            <select
              id="serverId"
              value={serverId}
              onChange={(event) => setServerId(event.target.value)}
              disabled={loading}
              className="h-12 w-full rounded-lg border border-[#45291f] bg-[#0b0705] px-4 text-sm text-[#ead9cb] outline-none transition
                         hover:border-[#633628]
                         focus:border-[#c54930]
                         focus:ring-2 focus:ring-[#c54930]/15
                         disabled:cursor-not-allowed disabled:opacity-50"
            >
              {SERVERS.map((server) => (
                <option key={server.value} value={server.value}>
                  {server.label}
                </option>
              ))}
            </select>
          </div>

          {/* 캐릭터명 */}
          <div>
            <label
              htmlFor="characterName"
              className="mb-2 block text-xs font-medium text-[#a88979]"
            >
              캐릭터명
            </label>

            <input
              id="characterName"
              type="text"
              value={characterName}
              onChange={(event) => setCharacterName(event.target.value)}
              disabled={loading}
              placeholder="캐릭터명을 입력하세요"
              autoComplete="off"
              className="h-12 w-full rounded-lg border border-[#45291f] bg-[#0b0705] px-4 text-sm text-[#f2e5da] outline-none transition
                         placeholder:text-[#5d4a41]
                         hover:border-[#633628]
                         focus:border-[#c54930]
                         focus:ring-2 focus:ring-[#c54930]/15
                         disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* 조회 버튼 */}
          <button
            type="submit"
            disabled={loading || !characterName.trim()}
            className="flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-lg border border-[#f05438]/60
                       bg-gradient-to-b from-[#e94a32] to-[#b92b21]
                       px-6 text-sm font-semibold text-[#fff5ee]
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

            {loading ? "조회 중..." : "캐릭터 조회"}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-[#68544b]">
          <span className="inline-block h-1 w-1 rounded-full bg-[#9d4a36]" />
          조회 결과에서 캐릭터를 선택한 뒤 장비점수를 입력하여 등록합니다.
        </div>
      </form>
    </section>
  );
}