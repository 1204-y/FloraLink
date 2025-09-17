import { useCallback, useEffect, useState } from 'react';
import api from '../lib/api';
import type { AssistantMessage, AssistantResponsePayload } from '../types';

export const useAssistant = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<AssistantMessage[]>('/assistant');
      setMessages(data);
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.detail ?? '无法获取聊天记录');
    } finally {
      setLoading(false);
    }
  }, []);

  const ask = useCallback(
    async (question: string, context?: string) => {
      try {
        setLoading(true);
        const { data } = await api.post<AssistantResponsePayload>('/assistant', {
          question,
          context,
        });
        setMessages((prev) => [data.message, ...prev]);
        setSuggestions(data.suggestions);
        setError(null);
        return data.message;
      } catch (err: any) {
        setError(err?.response?.data?.detail ?? '提问失败，请稍后再试');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    void fetchHistory();
  }, [fetchHistory]);

  return { messages, suggestions, loading, error, ask, refresh: fetchHistory };
};

export default useAssistant;
