import type {
  CharacterSearchResponse,
  CreateCharacterRequest,
  GameCharacter,
} from "../types/character";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL이 설정되어 있지 않습니다.");
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "API 요청 중 오류가 발생했습니다.";

    try {
      const errorBody = await response.json();

      if (errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // JSON 응답이 아닐 경우 기본 메시지 사용
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function searchCharacters(
  serverId: string,
  characterName: string,
): Promise<CharacterSearchResponse> {
  const params = new URLSearchParams({
    serverId,
    characterName,
  });

  const response = await fetch(
    `${API_BASE_URL}/api/characters/search?${params.toString()}`,
  );

  return handleResponse<CharacterSearchResponse>(response);
}

export async function createCharacter(
  request: CreateCharacterRequest,
): Promise<GameCharacter> {
  const response = await fetch(`${API_BASE_URL}/api/characters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  return handleResponse<GameCharacter>(response);
}