import { FormEvent, useEffect, useState } from 'react';
import CommunityGroupCard from '../components/CommunityGroupCard';
import CommunityPostCard from '../components/CommunityPostCard';
import api from '../lib/api';
import type { CommunityGroup, CommunityPost } from '../types';

const CommunitiesPage = () => {
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<CommunityGroup | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoadingGroups(true);
        const { data } = await api.get<CommunityGroup[]>('/communities/groups');
        setGroups(data);
        if (!selectedGroup && data.length > 0) {
          setSelectedGroup(data[0]);
        }
      } finally {
        setLoadingGroups(false);
      }
    };

    void fetchGroups();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!selectedGroup) {
        return;
      }
      try {
        setLoadingPosts(true);
        const { data } = await api.get<CommunityPost[]>(`/communities/groups/${selectedGroup.id}/posts`);
        setPosts(data);
      } catch (err: any) {
        setNotice(err?.response?.data?.detail ?? '无法加载帖子');
      } finally {
        setLoadingPosts(false);
      }
    };

    void fetchPosts();
  }, [selectedGroup]);

  const handleJoin = async (group: CommunityGroup) => {
    try {
      await api.post(`/communities/groups/${group.id}/join`);
      setNotice('已加入圈子，可开始发布内容');
      setSelectedGroup(group);
    } catch (err: any) {
      setNotice(err?.response?.data?.detail ?? '加入圈子失败');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGroup) {
      setNotice('请先选择一个圈子');
      return;
    }
    if (!form.title.trim() || !form.content.trim()) {
      setNotice('请填写标题和内容');
      return;
    }
    try {
      await api.post(`/communities/groups/${selectedGroup.id}/posts`, {
        title: form.title,
        content: form.content
      });
      setForm({ title: '', content: '' });
      const { data } = await api.get<CommunityPost[]>(`/communities/groups/${selectedGroup.id}/posts`);
      setPosts(data);
      setNotice('帖子发布成功');
    } catch (err: any) {
      setNotice(err?.response?.data?.detail ?? '帖子发布失败，请稍后再试');
    }
  };

  return (
    <>
      <section className="section">
        <div className="section__header">
          <h2>圈子广场</h2>
          <p className="muted">
            按地域、品种、主题聚集同好，参与话题、线下活动和苗木交换。
          </p>
        </div>
        {notice && <p className="form-error">{notice}</p>}
      </section>

      <section className="section">
        {loadingGroups ? (
          <p className="muted">正在加载圈子…</p>
        ) : (
          <div className="grid grid--3">
            {groups.map((group) => (
              <CommunityGroupCard
                key={group.id}
                group={group}
                selected={selectedGroup?.id === group.id}
                onSelect={setSelectedGroup}
                onJoin={handleJoin}
              />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section__header">
          <h2>热门帖子</h2>
          <p className="muted">围观大家的养护心得与灵感交换。</p>
        </div>
        <div className="grid grid--3">
          {loadingPosts ? (
            <p className="muted">正在加载帖子…</p>
          ) : (
            posts.map((post) => <CommunityPostCard key={post.id} post={post} />)
          )}
          {!loadingPosts && posts.length === 0 && (
            <p className="muted">圈子里还没有帖子，率先分享你的经验吧。</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>发布新帖子</h2>
          <p className="muted">记录你的心得，或发起一次线下小聚。</p>
        </div>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="post-form__fields">
            <input
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="帖子标题"
              aria-label="帖子标题"
            />
            <textarea
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="写下你对植物的观察、心得或提问"
              rows={4}
              aria-label="帖子内容"
            />
          </div>
          <button className="action-button" type="submit">
            发布帖子
          </button>
        </form>
      </section>
    </>
  );
};

export default CommunitiesPage;
