import { useState } from "react";
import {
  createCharacter,
  searchCharacters,
} from "../api/characterApi";
import CharacterRegisterForm from "../components/character/CharacterRegisterForm";
import CharacterSearchForm from "../components/character/CharacterSearchForm";
import CharacterSearchResult from "../components/character/CharacterSearchResult";
import type {
  CreateCharacterRequest,
  NeopleCharacterSearchResult,
} from "../types/character";

type Message =
  | {
      type: "success" | "error";
      text: string;
    }
  | null;

export default function CharacterPage() {
  const [characters, setCharacters] = useState<
    NeopleCharacterSearchResult[]
  >([]);

  const [selectedCharacter, setSelectedCharacter] =
    useState<NeopleCharacterSearchResult | null>(null);

  const [searchLoading, setSearchLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  const handleSearch = async (
    serverId: string,
    characterName: string,
  ) => {
    try {
      setSearchLoading(true);
      setMessage(null);
      setSelectedCharacter(null);

      const response = await searchCharacters(
        serverId,
        characterName,
      );

      setCharacters(response.rows);
      setSearched(true);
    } catch (error) {
      setCharacters([]);
      setSearched(true);

      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "캐릭터 검색 중 오류가 발생했습니다.",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRegister = async (
    request: CreateCharacterRequest,
  ) => {
    try {
      setRegisterLoading(true);
      setMessage(null);

      const createdCharacter = await createCharacter(request);

      setMessage({
        type: "success",
        text: `${createdCharacter.characterName} 캐릭터를 등록했습니다.`,
      });

      setSelectedCharacter(null);
      setCharacters([]);
      setSearched(false);

      // TODO:
      // 추후 캐릭터 / 모험단 목록 조회 API 구현 후
      // 등록 성공 시 여기에서 목록을 다시 조회한다.
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "캐릭터 등록 중 오류가 발생했습니다.",
      });
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div>
      <header className="mb-7">
        <h1 className="text-2xl font-bold tracking-tight text-[#f0dfd1]">
          캐릭터 조회
        </h1>
        <p className="mt-2 text-sm text-[#987a69]">
          서버와 캐릭터명으로 검색한 뒤 레이드 관리 정보를 입력하여 등록합니다.
        </p>
      </header>

      <div className="space-y-5">
      {/* 성공 / 실패 메시지 */}
      {message && (
        <div
          className={`rounded-lg border px-5 py-4 text-sm ${
            message.type === "success"
              ? "border-emerald-900 bg-emerald-950/40 text-emerald-300"
              : "border-red-900 bg-red-950/40 text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 캐릭터 검색 */}
      <CharacterSearchForm
        loading={searchLoading}
        onSearch={handleSearch}
      />

      {!searched && (
        <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-[#3f281f] bg-[#0d0806] px-8 text-center">
          <div>
            <p className="text-sm font-medium text-[#b18e79]">
              캐릭터를 조회하면 검색 결과가 이곳에 표시됩니다.
            </p>
            <p className="mt-2 text-xs text-[#6f574c]">
              캐릭터를 선택한 뒤 레이드 관리 정보를 입력하여 등록할 수 있습니다.
            </p>
          </div>
        </div>
      )}

      {/* 검색 결과 없음 */}
      {searched && characters.length === 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-10 text-center text-zinc-500">
          검색된 캐릭터가 없습니다.
        </div>
      )}

      {/* 캐릭터 검색 결과 */}
      <CharacterSearchResult
        characters={characters}
        selectedCharacter={selectedCharacter}
        onSelect={setSelectedCharacter}
      />

      {/* 선택 캐릭터 등록 */}
      {selectedCharacter && (
        <CharacterRegisterForm
          key={selectedCharacter.characterId}
          character={selectedCharacter}
          loading={registerLoading}
          onRegister={handleRegister}
        />
      )}
      </div>
    </div>
  );
}
