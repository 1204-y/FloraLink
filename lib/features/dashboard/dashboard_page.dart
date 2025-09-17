import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../../models/models.dart';
import '../../services/mock_repository.dart';
import '../../widgets/gradient_card.dart';
import '../../widgets/info_chip.dart';
import '../../widgets/section_header.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final repository = context.watch<MockRepository>();
    final plants = repository.plants;
    final tasks = repository.tasks;
    final posts = repository.posts.take(3).toList();

    return SafeArea(
      child: CustomScrollView(
        slivers: <Widget>[
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            sliver: SliverList(
              delegate: SliverChildListDelegate(<Widget>[
                const _GreetingHeader(),
                const SizedBox(height: 28),
                _SummaryRow(plantsCount: plants.length, taskCount: tasks.where((task) => !task.isCompleted).length),
                const SizedBox(height: 28),
                _TaskPreview(tasks: tasks.take(3).toList()),
                const SizedBox(height: 28),
                _CommunityHighlight(posts: posts),
                const SizedBox(height: 36),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _GreetingHeader extends StatelessWidget {
  const _GreetingHeader();

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return GradientCard(
      gradient: const LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: <Color>[
          Color(0xFF8FD8B3),
          Color(0xFF6FB597),
          Color(0xFFF7D9E1),
        ],
      ),
      padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text('晚上好，小羊', style: textTheme.headlineSmall?.copyWith(color: Colors.white, fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          Text(
            '今天的花园状态良好，记得看看「杜鹃」的新留言～',
            style: textTheme.bodyLarge?.copyWith(color: Colors.white.withOpacity(0.85)),
          ),
          const SizedBox(height: 18),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: const <Widget>[
              InfoChip(label: '今日浇水：2株', icon: Icons.water_drop_rounded, color: Color(0xFFFFFFFF)),
              InfoChip(label: '最新观测：望江楼公园', icon: Icons.location_on_rounded, color: Color(0xFFFFFFFF)),
            ],
          ),
        ],
      ),
    );
  }
}

class _SummaryRow extends StatelessWidget {
  const _SummaryRow({
    required this.plantsCount,
    required this.taskCount,
  });

  final int plantsCount;
  final int taskCount;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Row(
      children: <Widget>[
        Expanded(
          child: _SummaryCard(
            title: '我的花园',
            value: '$plantsCount 株',
            icon: Icons.eco_rounded,
            background: const LinearGradient(
              colors: <Color>[Color(0xFFECF7F1), Color(0xFFD9EFE4)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            subtitle: '本周新增 2 株收藏',
          ),
        ),
        const SizedBox(width: 18),
        Expanded(
          child: _SummaryCard(
            title: '养护提醒',
            value: '$taskCount 项',
            icon: Icons.check_circle_outline_rounded,
            background: const LinearGradient(
              colors: <Color>[Color(0xFFFDEBED), Color(0xFFF6D7E0)],
              begin: Alignment.topRight,
              end: Alignment.bottomLeft,
            ),
            subtitle: '记得完成今日浇水计划',
          ),
        ),
      ],
    );
  }
}

class _SummaryCard extends StatelessWidget {
  const _SummaryCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.background,
    required this.subtitle,
  });

  final String title;
  final String value;
  final IconData icon;
  final Gradient background;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return GradientCard(
      gradient: background,
      padding: const EdgeInsets.all(22),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Icon(icon, size: 28, color: Colors.black.withOpacity(0.6)),
          const SizedBox(height: 18),
          Text(value, style: textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          Text(title, style: textTheme.titleMedium?.copyWith(color: Colors.black87)),
          const SizedBox(height: 12),
          Text(subtitle, style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
        ],
      ),
    );
  }
}

class _TaskPreview extends StatelessWidget {
  const _TaskPreview({required this.tasks});

  final List<GardenTask> tasks;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const SectionHeader(
          title: '今日养护任务',
          subtitle: '保持规律养护，让植物茁壮成长',
        ),
        const SizedBox(height: 16),
        ...tasks.map((task) => _TaskTile(task: task)).toList(),
        if (tasks.isEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 32),
            child: Center(
              child: Text('暂无任务，享受与花相伴的闲适时光。', style: textTheme.bodyMedium),
            ),
          ),
      ],
    );
  }
}

class _TaskTile extends StatelessWidget {
  const _TaskTile({required this.task});

  final GardenTask task;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final dateFormat = DateFormat('M月d日 HH:mm');
    final bool overdue = task.dueDate.isBefore(DateTime.now()) && !task.isCompleted;
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 8),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Colors.white,
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 16, offset: const Offset(0, 8)),
        ],
      ),
      child: Row(
        children: <Widget>[
          Container(
            width: 46,
            height: 46,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              gradient: const LinearGradient(
                colors: <Color>[Color(0xFFE1F3E8), Color(0xFFDBE7FF)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Icon(task.isCompleted ? Icons.check_circle_rounded : Icons.local_florist_rounded,
                color: task.isCompleted ? const Color(0xFF4CAF50) : const Color(0xFF4E8A83)),
          ),
          const SizedBox(width: 18),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(task.title, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600)),
                const SizedBox(height: 6),
                Text(task.description, style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
                const SizedBox(height: 6),
                Text(
                  task.isCompleted ? '已完成' : '截止 ${dateFormat.format(task.dueDate)}',
                  style: textTheme.bodySmall?.copyWith(color: overdue ? const Color(0xFFE85A4F) : Colors.black45),
                ),
              ],
            ),
          ),
          const SizedBox(width: 18),
          Icon(Icons.chevron_right_rounded, color: Colors.black26),
        ],
      ),
    );
  }
}

class _CommunityHighlight extends StatelessWidget {
  const _CommunityHighlight({required this.posts});

  final List<CommunityPost> posts;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        const SectionHeader(
          title: '花友社区速览',
          subtitle: '探索热门话题，与附近花友互动',
        ),
        const SizedBox(height: 18),
        ...posts.map((post) {
          return Container(
            margin: const EdgeInsets.symmetric(vertical: 10),
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
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
                    Text(DateFormat('M/d HH:mm').format(post.publishedAt),
                        style: textTheme.bodySmall?.copyWith(color: Colors.black38)),
                  ],
                ),
                const SizedBox(height: 14),
                Text(post.title, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600)),
                const SizedBox(height: 10),
                Text(
                  post.content,
                  style: textTheme.bodyMedium?.copyWith(color: Colors.black54),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }
}
