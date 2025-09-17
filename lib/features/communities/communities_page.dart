import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../../models/models.dart';
import '../../services/mock_repository.dart';
import '../../widgets/info_chip.dart';
import '../../widgets/section_header.dart';

class CommunitiesPage extends StatelessWidget {
  const CommunitiesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final repository = context.watch<MockRepository>();
    final groups = repository.groups;
    final posts = repository.posts;

    return SafeArea(
      child: CustomScrollView(
        slivers: <Widget>[
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            sliver: SliverList(
              delegate: SliverChildListDelegate(<Widget>[
                const SectionHeader(
                  title: '花友社区',
                  subtitle: '加入附近圈子，分享每一次惊喜的花开',
                ),
                const SizedBox(height: 20),
                SizedBox(
                  height: 180,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: groups.length,
                    separatorBuilder: (_, __) => const SizedBox(width: 16),
                    itemBuilder: (context, index) => _GroupCard(group: groups[index]),
                  ),
                ),
                const SizedBox(height: 28),
                const SectionHeader(title: '最新帖子'),
                const SizedBox(height: 16),
                ...posts.map((post) => _PostCard(post: post)),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _GroupCard extends StatelessWidget {
  const _GroupCard({required this.group});

  final CommunityGroup group;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Container(
      width: 240,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: const LinearGradient(
          colors: <Color>[Color(0xFFEAF5F0), Color(0xFFFBEFF3)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.07), blurRadius: 18, offset: const Offset(0, 10)),
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Expanded(
                child: Text(group.name, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
              ),
              const Icon(Icons.chevron_right_rounded, color: Colors.black38),
            ],
          ),
          const SizedBox(height: 12),
          Text(group.description, style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
          const Spacer(),
          Row(
            children: <Widget>[
              InfoChip(
                label: '${group.memberCount} 人',
                icon: Icons.people_alt_rounded,
                color: const Color(0xFF6FB597),
              ),
              const SizedBox(width: 12),
              if (group.isLocal)
                const InfoChip(
                  label: '本地圈',
                  icon: Icons.location_on_rounded,
                  color: Color(0xFFE58C9B),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

class _PostCard extends StatelessWidget {
  const _PostCard({required this.post});

  final CommunityPost post;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final dateFormat = DateFormat('M月d日 HH:mm');
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(22),
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 18, offset: const Offset(0, 10)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              CircleAvatar(
                backgroundColor: const Color(0xFFE8F6EC),
                child: Text(post.author.isNotEmpty ? post.author[0] : '?', style: textTheme.titleMedium),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(post.author, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600)),
                    Text(post.groupName ?? '花友圈', style: textTheme.bodySmall?.copyWith(color: Colors.black45)),
                  ],
                ),
              ),
              Text(dateFormat.format(post.publishedAt), style: textTheme.bodySmall?.copyWith(color: Colors.black38)),
            ],
          ),
          const SizedBox(height: 14),
          Text(post.title, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          Text(post.content, style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
          const SizedBox(height: 16),
          Row(
            children: const <Widget>[
              InfoChip(label: '点赞 128', icon: Icons.favorite_border_rounded, color: Color(0xFFE58C9B)),
              SizedBox(width: 12),
              InfoChip(label: '评论 24', icon: Icons.chat_bubble_outline_rounded, color: Color(0xFF6FB597)),
            ],
          ),
        ],
      ),
    );
  }
}
