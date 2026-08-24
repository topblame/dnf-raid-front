import type { Adventure } from "../types/adventure";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL이 설정되어 있지 않습니다.");
}

export async function getAdventures(): Promise<Adventure[]> {
  const response = await fetch(`${API_BASE_URL}/api/adventures`);

  if (!response.ok) {
    let message = "모험단 목록을 불러오지 못했습니다.";

    try {
      const errorBody = await response.json();
      if (errorBody.message) {
        message = errorBody.message;
      }
    } catch {
      // JSON 응답이 아니면 기본 메시지를 사용한다.
    }

    throw new Error(message);
  }

  return response.json() as Promise<Adventure[]>;
}
