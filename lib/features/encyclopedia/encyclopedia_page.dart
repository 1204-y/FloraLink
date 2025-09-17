import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/models.dart';
import '../../services/mock_repository.dart';
import '../../widgets/info_chip.dart';
import '../../widgets/section_header.dart';

class EncyclopediaPage extends StatelessWidget {
  const EncyclopediaPage({super.key});

  @override
  Widget build(BuildContext context) {
    final repository = context.watch<MockRepository>();
    final entries = repository.encyclopedia;

    return SafeArea(
      child: CustomScrollView(
        slivers: <Widget>[
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            sliver: SliverList(
              delegate: SliverChildListDelegate(<Widget>[
                const SectionHeader(
                  title: '植物百科',
                  subtitle: '以轻松方式认识植物，让花园规划更有灵感',
                ),
                const SizedBox(height: 20),
                Wrap(
                  spacing: 18,
                  runSpacing: 18,
                  children: entries.map((entry) => _EncyclopediaCard(entry: entry)).toList(),
                ),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _EncyclopediaCard extends StatelessWidget {
  const _EncyclopediaCard({required this.entry});

  final EncyclopediaEntry entry;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    return Container(
      width: 280,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(22),
        color: Colors.white,
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 18, offset: const Offset(0, 10)),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(entry.commonName, style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                    const SizedBox(height: 4),
                    Text(entry.scientificName, style: textTheme.bodySmall?.copyWith(color: Colors.black45)),
                  ],
                ),
              ),
              const Icon(Icons.bookmark_border_rounded, color: Colors.black26),
            ],
          ),
          const SizedBox(height: 14),
          Text(entry.description, style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: <Widget>[
              InfoChip(label: entry.category, icon: Icons.local_florist_rounded, color: const Color(0xFF6FB597)),
              InfoChip(label: entry.careLevel, icon: Icons.star_border_rounded, color: const Color(0xFFE58C9B)),
              InfoChip(label: entry.lightRequirement, icon: Icons.wb_sunny_outlined, color: const Color(0xFF4E9F8A)),
              InfoChip(label: entry.wateringFrequency, icon: Icons.water_drop_outlined, color: const Color(0xFF6FB597)),
            ],
          ),
        ],
      ),
    );
  }
}
