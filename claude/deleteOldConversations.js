/**
 * 클로드 AI 홈페이지의 오래된 대화를 삭제하는 스크립트입니다.
 * @createdAt 2024-09-14 00:46:00 (KST)
 */

(async () => {
  // 설정
  const API_BASE_URL = 'https://claude.ai/api';
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // API 엔드포인트 URL 생성 함수
  const createApiUrl = (path) => `${API_BASE_URL}${path}`;

  // API 요청 함수
  const fetchApi = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }
    return response.json();
  };

  // 조직 ID 가져오기
  const getOrganizationId = async () => {
    const data = await fetchApi(createApiUrl('/organizations'));
    return data[0]?.uuid;
  };

  // 대화 목록 가져오기
  const getConversations = async (orgId) => {
    return fetchApi(createApiUrl(`/organizations/${orgId}/chat_conversations`));
  };

  // 대화 삭제하기
  const deleteConversation = async (orgId, conversationId) => {
    const response = await fetch(createApiUrl(`/organizations/${orgId}/chat_conversations/${conversationId}`), { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }
    // DELETE 요청은 일반적으로 응답 본문이 없으므로, 상태 코드만 확인합니다.
    return response.status === 204; // 204 No Content는 성공적인 삭제를 나타냅니다.
  };
  
  // 메인 함수
  const main = async () => {
    try {
      const orgId = await getOrganizationId();
      if (!orgId) {
        throw new Error('조직을 찾을 수 없습니다.');
      }

      const conversations = await getConversations(orgId);
      const yesterday = Date.now() - ONE_DAY_MS;

      const oldConversations = conversations.filter(chat => new Date(chat.updated_at) < yesterday);

      for (const chat of oldConversations) {
        await deleteConversation(orgId, chat.uuid);
        console.log(`삭제된 대화: ${chat.uuid}`);
      }

      console.log(`총 ${oldConversations.length}개의 오래된 대화가 삭제되었습니다.`);
    } catch (error) {
      console.error('오류 발생:', error.message);
    }
  };

  // 실행
  main();
})();